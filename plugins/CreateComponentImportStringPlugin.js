// plugins/CreateComponentImportStringPlugin.js
const LZString = require("lz-string");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const templateConfig = require("../template.config");

const getUUID = () =>
    (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (Number(c) ^ (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16),
    );

function getComponentConfig(components, filePath) {
    const parts = filePath.split(/[/\\]/);
    const componentName = parts[parts.length - 1];
    const category = parts[parts.length - 2];

    if (category && components[category] && components[category][componentName]) {
        return components[category][componentName];
    }

    return { w: 1, h: 2 };
}

class CreateComponentImportStringPlugin {
    apply(compiler) {
        compiler.hooks.assetEmitted.tap('CreateComponentImportStringPlugin', (file, { outputPath, content }) => {
            if (!file.endsWith('.component.js')) {
                return;
            }

            const componentPath = file.replace('.component.js', '');
            const config = getComponentConfig(templateConfig.components, componentPath);

            // Create the metadata structure
            const metadata = {
                w: config.w,
                h: config.h,
                i: config.i || getUUID(),
                component: {
                    script: content.toString() // Use the uncompressed script
                }
            };

            // Convert the metadata to a Base64-encoded LZString
            const compressedMetadata = LZString.compressToBase64(JSON.stringify(metadata));

            // Write the compressed metadata to a file
            const metadataFile = path.join(outputPath, `${file.replace(".js", ".import.txt")}`);
            fs.writeFileSync(metadataFile, compressedMetadata);
        });
    }
}

module.exports = CreateComponentImportStringPlugin;