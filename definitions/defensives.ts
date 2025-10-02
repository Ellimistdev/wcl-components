import { Defensives } from "./types";

export const defensives: Defensives =
{
    "DeathKnight": {
        "48707": {
            "name": "Anti-Magic Shell",
            "duration": 5000,
            "cooldown": 60000
        },
        "48743": {
            "name": "Death Pact",
            "duration": 15000,
            "cooldown": 120000
        },
        "48792": {
            "name": "Icebound Fortitude",
            "duration": 8000,
            "cooldown": 180000
        },
        "49039": {
            "name": "Lichborne",
            "duration": 10000,
            "cooldown": 120000
        },
        // This is rotational for bdk and makes the chart unreadable :(
        // "49998": {
        //     "name": "Death Strike",
        //     "duration": 0,
        //     "cooldown": 0
        // },
        "219809": {
            "name": "Tombstone",
            "duration": 8000,
            "cooldown": 60000
        },
        "327574": {
            "name": "Sacrificial Pact",
            "duration": 0,
            "cooldown": 120000
        }
    },
    "DemonHunter": {
        "196555": {
            "name": "Netherwalk",
            "duration": 6000,
            "cooldown": 180000
        },
        "196718": {
            "name": "Netherwalk",
            "duration": 6000,
            "cooldown": 180000
        },
        "198589": {
            "name": "Blur", // cast
            "duration": 10000,
            "cooldown": 60000
        },
        "212800": {
            "name": "Blur", // buff
            "duration": 10000,
            "cooldown": 60000
        }
    },
    "Druid": {
        "5487": {
            "name": "Bear Form",
            "duration": 0,
            "cooldown": 0
        },
        "22812": {
            "name": "Barkskin",
            "duration": 8000,
            "cooldown": 60000
        },
        "22842": {
            "name": "Frenzied Regeneration",
            "duration": 3000,
            "cooldown": 1000
        },
        "61336": {
            "name": "Survival Instincts",
            "duration": 6000,
            "cooldown": 180000
        },
        "108238": {
            "name": "Renewal",
            "duration": 0,
            "cooldown": 90000
        },
        "124974": {
            "name": "Nature's Vigil",
            "duration": 15000,
            "cooldown": 90000
        },
        "319454": {
            "name": "Heart of the Wild",
            "duration": 45000,
            "cooldown": 300000
        }
    },
    "Evoker": {
        "355913": {
            "name": "Emerald Blossom",
            "duration": 1500,
            "cooldown": 30000
        },
        "360827": {
            "name": "Blistering Scales", // targeted
            "duration": 0,
            "cooldown": 30000
        },
        "360995": {
            "name": "Verdant Embrace",
            "duration": 0,
            "cooldown": 24000
        },
        "363916": {
            "name": "Obsidian Scales",
            "duration": 12000,
            "cooldown": 90000
        },
        "370888": {
            "name": "Twin Guardian/Rescue",
            "duration": 5000,
            "cooldown": 60000
        },
        "370960": {
            "name": "Emerald Communion",
            "duration": 5000,
            "cooldown": 180000
        },
        "374227": {
            "name": "Zephyr",
            "duration": 8000,
            "cooldown": 120000
        },
        "374348": {
            "name": "Renewing Blaze",
            "duration": 8000,
            "cooldown": 90000
        }
    },
    "Hunter": {
        "109304": {
            "name": "Exhilaration",
            "duration": 0,
            "cooldown": 120000
        },
        "186265": {
            "name": "Aspect of the Turtle",
            "duration": 8000,
            "cooldown": 180000
        },
        "264735": {
            "name": "Survival of the Fittest",
            "duration": 6000,
            "cooldown": 180000
        },
        "272679": {
            "name": "Fortitude of the Bear - Cast",
            "duration": 10000,
            "cooldown": 120000
        },
        "388035": {
            "name": "Fortitude of the Bear", // Buff
            "duration": 10000,
            "cooldown": 120000
        },
        "392956": {
            "name": "Fortitude of the Bear", // idk?
            "duration": 10000,
            "cooldown": 120000
        }
    },
    "Mage": {
        "11426": {
            "name": "Ice Barrier",
            "duration": 60000,
            "cooldown": 25000
        },
        "45438": {
            "name": "Ice Block",
            "duration": 10000,
            "cooldown": 240000
        },
        "414658": {
            "name": "Ice Cold", // cast
            "duration": 6000,
            "cooldown": 240000
        },
        "414659": {
            "name": "Ice Cold", // buff
            "duration": 6000,
            "cooldown": 240000
        },
        "55342": {
            "name": "Mirror Image",
            "duration": 40000,
            "cooldown": 120000
        },
        "113862": {
            "name": "Greater Invisibility", // DR
            "duration": 3000,
            "cooldown": 120000
        },
        "110959": {
            "name": "Greater Invisibility", // cast
            "duration": 3000,
            "cooldown": 120000
        },
        "110960": {
            "name": "Greater Invisibility", // invis
            "duration": 3000,
            "cooldown": 120000
        },
        "235219": {
            "name": "Cold Snap",
            "duration": 0,
            "cooldown": 300000
        },
        "235313": {
            "name": "Blazing Barrier",
            "duration": 60000,
            "cooldown": 25000
        },
        "235450": {
            "name": "Prismatic Barrier",
            "duration": 60000,
            "cooldown": 25000
        },
        "342245": {
            "name": "Alter Time", // cast
            "duration": 20000,
            "cooldown": 60000
        },
        "342246": {
            "name": "Alter Time", // buff
            "duration": 20000,
            "cooldown": 60000
        },
        "342247": {
            "name": "Alter Time", // recall
            "duration": 20000,
            "cooldown": 60000
        }
    },
    "Monk": {
        "115203": {
            "name": "Fortifying Brew - Cast",
            "duration": 15000,
            "cooldown": 360000
        },
        "120954": {
            "name": "Fortifying Brew - Buff",
            "duration": 15000,
            "cooldown": 360000
        },
        // Rotational for MW Monk
        // "116670": {
        //     "name": "Vivify",
        //     "duration": 0,
        //     "cooldown": 0
        // },
        "122278": {
            "name": "Dampen Harm",
            "duration": 10000,
            "cooldown": 120000
        },
        "122470": {
            "name": "Touch of Karma",
            "duration": 10000,
            "cooldown": 90000
        },
        "122783": {
            "name": "Diffuse Magic",
            "duration": 6000,
            "cooldown": 90000
        }
    },
    "Paladin": {
        "498": {
            "name": "Divine Protection",
            "duration": 8000,
            "cooldown": 60000
        },
        "633": {
            "name": "Lay on Hands",
            "duration": 0,
            "cooldown": 600000
        },
        "642": {
            "name": "Divine Shield",
            "duration": 8000,
            "cooldown": 300000
        },
        "1022": {
            "name": "Blessing of Protection",
            "duration": 10000,
            "cooldown": 1500
        },
        // Rotational for Prot Paladin
        // "53600": {
        //     "name": "Shield of the Righteous",
        //     "duration": 4500,
        //     "cooldown": 1000
        // },
        "31850": {
            "name": "Ardent Defender",
            "duration": 8000,
            "cooldown": 120000
        },
        "184662": {
            "name": "Shield of Vengeance",
            "duration": 10000,
            "cooldown": 90000
        },
        "205191": {
            "name": "Eye for an Eye",
            "duration": 10000,
            "cooldown": 60000
        },
        "212641": {
            "name": "Guardian of Ancient Kings",
            "duration": 8000,
            "cooldown": 300000
        },
        "215661": {
            "name": "Justicar's Vengeance",
            "duration": 0,
            "cooldown": 0
        },
        "387174": {
            "name": "Eye of Tyr",
            "duration": 6000,
            "cooldown": 60000
        },
        "403876": {
            "name": "Divine Protection",
            "duration": 8000,
            "cooldown": 60000
        }
    },
    "Priest": {
        "586": {
            "name": "Fade",
            "duration": 10000,
            "cooldown": 30000
        },
        "19236": {
            "name": "Desperate Prayer",
            "duration": 10000,
            "cooldown": 90000
        },
        "47585": {
            "name": "Dispersion",
            "duration": 6000,
            "cooldown": 120000
        },
        "108968": {
            "name": "Void Shift",
            "duration": 0,
            "cooldown": 300000
        }
    },
    "Rogue": {
        "1966": {
            "name": "Feint",
            "duration": 6000,
            "cooldown": 15000
        },
        "5277": {
            "name": "Evasion",
            "duration": 10000,
            "cooldown": 120000
        },
        "31224": {
            "name": "Cloak of Shadows",
            "duration": 5000,
            "cooldown": 120000
        },
        "185311": {
            "name": "Crimson Vial",
            "duration": 4000,
            "cooldown": 30000
        }
    },
    "Shaman": {
        // Rotational for Resto Shaman
        // "974": {
        //     "name": "Earth Shield",
        //     "duration": 600000,
        //     "cooldown": 0
        // },
        "108270": {
            "name": "Stone Bulwark Totem - Cast",
            "duration": 12000,
            "cooldown": 120000
        },
        // "462844": {
        //     "name": "Stone Bulwark Totem - Buff",
        //     "duration": 30000,  // 30 seconds for the ongoing effect
        //     "cooldown": 120000
        // },
        // "114893": {
        //     "name": "Stone Bulwark Totem - Initial Shield",
        //     "duration": 15000,  // 15 seconds for initial shield
        //     "cooldown": 120000
        // },
        "108271": {
            "name": "Astral Shift",
            "duration": 12000,
            "cooldown": 120000
        },
        "108281": {
            "name": "Ancestral Guidance",
            "duration": 60000,
            "cooldown": 300000
        },
        "198103": {
            "name": "Earth Elemental",
            "duration": 60000,
            "cooldown": 300000
        }
    },
    "Warlock": {
        "6789": {
            "name": "Mortal Coil",
            "duration": 3000,
            "cooldown": 45000
        },
        "104773": {
            "name": "Unending Resolve",
            "duration": 8000,
            "cooldown": 180000
        },
        "108416": {
            "name": "Dark Pact",
            "duration": 20000,
            "cooldown": 60000
        },
        "234153": {
            "name": "Drain Life",
            "duration": 5000,
            "cooldown": 0
        },
        "452930": {
            "name": "Demonic Healthstone",
            "duration": 0,
            "cooldown": 0
        }
    },
    "Warrior": {
        "23920": {
            "name": "Spell Reflection",
            "duration": 5000,
            "cooldown": 1000
        },
        "34428": {
            "name": "Victory Rush",
            "duration": 0,
            "cooldown": 0
        },
        "118038": {
            "name": "Die by the Sword",
            "duration": 8000,
            "cooldown": 120000
        },
        "184364": {
            "name": "Enraged Regeneration",
            "duration": 8000,
            "cooldown": 120000
        },
        "190456": {
            "name": "Ignore Pain",
            "duration": 12000,
            "cooldown": 1000
        },
        "202168": {
            "name": "Impending Victory",
            "duration": 0,
            "cooldown": 25000
        },
        "383762": {
            "name": "Bitter Immunity",
            "duration": 0,
            "cooldown": 180000
        },
        "386208": {
            "name": "Defensive Stance",
            "duration": 0,
            "cooldown": 3000
        }
    },
    "Everyone": {
        "6262": {
            "name": "Healthstone",
            "duration": 0,
            "cooldown": 0,
            "color": "#5AD81C",
            "verticalAlign": "top",
            "textAlign": "left",
            "labelOffsetY": 1 // can't be 0
        },
        "370511": {
            "name": "Refreshing Healing Potion - Cast",
            "duration": 0,
            "cooldown": 300000,
            "color": "#E795A3",
            "verticalAlign": "top",
            "textAlign": "left",
            "labelOffsetY": 1
        },
        "415569": {
            "name": "Dreamwalker's Healing Potion - Cast",
            "duration": 0,
            "cooldown": 300000,
            "color": "#E795A3",
            "verticalAlign": "top",
            "textAlign": "left",
            "labelOffsetY": 1
        },
        "431416": {
            "name": "Algari Healing Potion - Cast",
            "duration": 0,
            "cooldown": 300000,
            "color": "#E795A3",
            "verticalAlign": "top",
            "textAlign": "left",
            "labelOffsetY": 1
        },
        "1238009": {
            "name": "Invigorating Healing Potion - Cast",
            "duration": 0,
            "cooldown": 300000,
            "color": "#E795A3",
            "verticalAlign": "top",
            "textAlign": "left",
            "labelOffsetY": 1
        },
    }
}
