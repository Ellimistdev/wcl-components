const LZString = require("lz-string");
const fs = require("fs");
const path = require("path");

class CreateExportStringPlugin {
    apply(compiler) {
        compiler.hooks.assetEmitted.tap('CreateExportStringPlugin', (file, { outputPath, content }) => {
            if (!file.endsWith('.component.js')) {
                return;
            }

            // Convert to base64
            const exportString = LZString.compressToBase64(content.toString());

            // Write the export string file
            const exportFile = path.join(outputPath, `${file.replace(".js", ".lzstring.txt")}`);
            fs.writeFileSync(exportFile, exportString);
        });
    }
}

module.exports = CreateExportStringPlugin;