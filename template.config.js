/**@type {import("definitions/template").TemplateConfig} config*/
module.exports = {
    plugins: {
        clearSource: {
            compress: true
        },
        exportString: true,
        componentImportString: true,
        autoTest: {
            active: true,
            loginMethod: "WCL",
            components: {
                common: {
                    DamagePerInterval: "https://www.warcraftlogs.com/reports/Nr9ZjP8vtAQkD4w3#fight=29&view=components",
                    DefensivesUsed: "https://www.warcraftlogs.com/reports/4dvfXaD7crHbwN1t?fight=24&view=components",
                    DefensivesUsedTable: "https://www.warcraftlogs.com/reports/4dvfXaD7crHbwN1t?fight=24&view=components",
                    DefensivesTimeline: "https://www.warcraftlogs.com/reports/Nr9ZjP8vtAQkD4w3#fight=29&view=components"
                },
                classSpecific: {
                    GiantSlayerValue: "https://www.warcraftlogs.com/reports/Nr9ZjP8vtAQkD4w3#fight=29&view=components",
                    AlterTimeHeals: "https://www.warcraftlogs.com/reports/Nr9ZjP8vtAQkD4w3#fight=29&view=components"
                },
                encounterSpecific: {
                    VolcanicHeartPlot: "https://www.warcraftlogs.com/reports/g8V9vCj7tKGMQwan?fight=26&view=components",
                    TwilightMassacrePlot: "https://www.warcraftlogs.com/reports/cBwzFpRdrZH4xbga?fight=34&view=components"
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
        common: {
            DefensivesUsed: {
                h: 3,
                w: 1
            },
        },
        classSpecific: {
            GiantSlayerValue: {
                h: 1,
                w: 2
            },
        },
        encounterSpecific: {
            VolcanicHeartPlot: {
                h: 3,
                w: 1
            },
            TwilightMassacrePlot: {
                h: 3,
                w: 1
            }
        }
    },
    watch: true
}
