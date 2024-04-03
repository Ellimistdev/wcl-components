/**@type {import("definitions/template").TemplateConfig} config*/
module.exports = {
    plugins: {
        clearSource: {
            compress: true
        },
        exportString: true,
        autoTest: {
            active: true,
            loginMethod: "USA",
            components: {
                classSpecific: {
                    GiantSlayerValue: "https://www.warcraftlogs.com/reports/cNtPvy17QJb9wrX4#fight=15&view=components&source=194",
                    AlterTimeHeals: "https://www.warcraftlogs.com/reports/mRGZtWpdfYvng78a#fight=15&view=components&source=4"
                },
            }
        },
        bannerPlugin: {
            active: true,
            options: {
                banner: "Created using the WCL-TS-Components Template https://github.com/JoschiGrey/WCL-TS-Components",
                include: /-*\.js/
            }
        }
    },
    components: {
        AlterTimeHeals: {
            h: 3,
            w: 1
        },
        GiantSlayerValue: {
            h: 1,
            w: 2
        }
    },
    watch: true
}