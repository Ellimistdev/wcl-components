import type { EncounterData } from '../types';

export const DimensiusEncounter: EncounterData = {
    name: "Dimensius, the All-Devouring",
    encounterId: 3135,
    
    entities: {
        // Main Boss - Dimensius across all phases
        dimensius_p1: {
            id: 241517,
            name: "Dimensius",
            type: 'main_boss',
            phases: [1],
            abilities: {
                damage: {
                    antimatter: {
                        id: 1243702,
                        name: "Antimatter",
                        description: "Spheres of Antimatter form at the location of Shattered Space and remain stable for 10 sec, then trigger an annihilation reaction that inflicts 134916776 Cosmic damage to all players.",
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#9d4edd',
                            text: 'Soaking Antimatter'
                        }
                    },
                    cosmicRadiation: {
                        id: 1228368,
                        name: "Cosmic Radiation",
                        description: "Dimensius radiates intense energy, inflicting 2108075 Cosmic damage to all players every 2 sec.",
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        },
                        display: {
                            color: '#7209b7',
                            text: 'Radiation'
                        }
                    },
                    darkEnergy: {
                        id: 1231002,
                        name: "Dark Energy",
                        description: "Unfathomable cosmic energy that inflicts 1967536 Cosmic damage to players standing within every 1 sec, increases all damage they take by 200%, and reduces their movement speed by 50%.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#240046',
                            text: 'Dark Energy'
                        }
                    },
                    darkMatter: {
                        id: 1230999,
                        name: "Dark Matter",
                        description: "Dimensius sweeps his enormous hand over all players and blasts them with dark matter, inflicting 9275528 Shadow damage to players within 4 yards on impact.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#757abeff',
                            text: 'Dark Matter'
                        }
                    },
                    devour: {
                        id: 1243373,
                        name: "Devour",
                        description: "Upon reaching 100 energy, Dimensius attempts to devour all players, inflicting 5621532 Shadow damage every 1 sec for 5 sec.",
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'secondary',
                            category: 'raid'
                        },
                        display: {
                            color: '#c77dfe',
                            text: 'Devour'
                        }
                    },
                    fistsOfVoidlord: {
                        id: 1227665,
                        name: "Fists of the Voidlord",
                        description: "Dimensius' melee attacks disrupt the very fabric of space, forcing his target into melee range if they can't be reached and inflicting 8432299 Shadow damage to players within 15 yards of his target.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'tank'
                        },
                        display: {
                            color: '#5a189a',
                            text: 'Fists'
                        }
                    },
                    massiveSmash: {
                        id: 1249206,
                        name: "Massive Smash",
                        description: "Dimensius smashes his current target with devastating force, inflicting 37102113 Physical damage and 25296896 Cosmic damage to players within 20 yards and applying Mortal Fragility.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'tank'
                        },
                        display: {
                            color: '#e0aaff',
                            text: 'Massive Smash'
                        }
                    },
                    reverseGravity: {
                        id: 1243581,
                        name: "Reverse Gravity",
                        description: "Dimensius targets random players then reverses their gravity after 5 sec, inflicting 3372919 Shadow damage to players within 6 yards and sending them Airborne.",
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#f38559ff',
                            text: 'Reverse Gravity'
                        }
                    },
                    shatteredSpace: {
                        id: 1243694,
                        name: "Shattered Space",
                        description: "Dimensius reaches down with both hands and tears at the very fabric of space, inflicting 42161493 Cosmic damage to players within 10 yards of each hand and 10961988 Cosmic damage to all other players.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#975a88ff',
                            text: 'Shattered Space'
                        }
                    }
                },
                buffs: {
                    anomalousForce: {
                        id: 1250614,
                        name: "Anomalous Force",
                        description: "Dimensius tightens his hold on Airborne players. They can only be pulled down by a number of players with Excess Mass equal to or greater than Dimensius' current Anomalous Force.",
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    },
                    cosmicRadiationBuff: {
                        id: 1228367,
                        name: "Cosmic Radiation",
                        description: "Dimensius radiates intense energy, inflicting 2108075 Cosmic damage to all players every 2 sec.",
                        usageHints: {
                            plotImportance: 'secondary'
                        }
                    },
                    growingHunger: {
                        id: 1229674,
                        name: "Growing Hunger",
                        description: "Dimensius' hunger grows with each cast of Devour, increasing the amount of Collective Gravity needed to survive.",
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    }
                },
                casts: {
                    darkMatterCast: {
                        id: 1230979,
                        name: "Dark Matter Cast",
                        description: "Dimensius sweeps his enormous hand over all players and blasts them with dark matter, inflicting 9275528 Shadow damage to players within 4 yards on impact.",
                        castTime: 2000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'secondary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#8488beff',
                            text: 'Dark Matter Cast'
                        }
                    },
                    devourCast: {
                        id: 1229038,
                        name: "Devour Cast",
                        description: "Upon reaching 100 energy, Dimensius attempts to devour all players, inflicting 5621532 Shadow damage every 1 sec for 5 sec.",
                        castTime: 2000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#c77dff',
                            text: 'Devour'
                        }
                    },
                    eventHorizon: {
                        id: 1234898,
                        name: "Event Horizon",
                        description: "As his health is depleted, Dimensius begins to collapse in on himself.",
                        castTime: 4000,
                        usageHints: {
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#7209b7',
                            text: 'Event Horizon'
                        }
                    },
                    massiveSmashCast: {
                        id: 1230087,
                        name: "Massive Smash Cast",
                        description: "Dimensius smashes his current target with devastating force, inflicting 37102113 Physical damage and 25296896 Cosmic damage to players within 20 yards and applying Mortal Fragility.",
                        castTime: 4000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'tank'
                        },
                        display: {
                            color: '#e0aaff',
                            text: 'Massive Smash'
                        }
                    }
                }
            }
        },
        
        dimensius_p2: {
            id: 234478,
            name: "Dimensius",
            type: 'main_boss',
            phases: [2],
            abilities: {
                damage: {
                    cosmicRadiation: {
                        id: 1237775,
                        name: "Cosmic Radiation",
                        description: "Dimensius radiates intense energy, inflicting 5 Cosmic damage to all players every 2 sec.",
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        },
                        display: {
                            color: '#7209b7',
                            text: 'Radiation'
                        }
                    },
                    crushingGravity: {
                        id: 1234248,
                        name: "Crushing Gravity",
                        description: "After 5 sec intense gravity pushes down around the target, inflicting 6745839 Cosmic damage and applying Crushed to all players within 2 yards.",
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#240046',
                            text: 'Crushing Gravity'
                        }
                    },
                    gammaBurst: {
                        id: 1237325,
                        name: "Gamma Burst",
                        description: "Dimensius tears through space with an immense stream of radiation that inflicts 11 Cosmic damage every 1 sec to all players and pushes them away over 4 sec.",
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#9d4edd',
                            text: 'Gamma Burst'
                        }
                    },
                    inverseGravity: {
                        id: 1234249,
                        name: "Inverse Gravity",
                        description: "After 5 sec intense gravity pushes outward from the target, inflicting 1686460 Cosmic damage and violently knocking away players within 6 yards.",
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#c77dff',
                            text: 'Inverse Gravity'
                        }
                    },
                    oblivion: {
                        id: 1249077,
                        name: "Oblivion",
                        description: "Dimensius instantly devours any player who enters his body for any reason, killing them horribly.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#10002b',
                            text: 'OBLIVION'
                        }
                    }
                },
                buffs: {},
                casts: {
                    brokenWorld: {
                        id: 1236617,
                        name: "Broken World",
                        description: "Phase transition mechanic",
                        usageHints: {
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#5a189a',
                            text: 'Broken World'
                        }
                    },
                    extinction: {
                        id: 1238765,
                        name: "Extinction",
                        description: "Dimensius hurls a fragment of a broken world at players, inflicting 50593791 Cosmic damage to players caught in its path and stunning them for 4 sec.",
                        castTime: 5000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#e0aaff',
                            text: 'Extinction'
                        }
                    },
                    totalDestruction: {
                        id: 1240310,
                        name: "Total Destruction",
                        description: "Ultimate phase ability",
                        usageHints: {
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#c77dff',
                            text: 'Total Destruction'
                        }
                    }
                }
            }
        },
        
        dimensius_p4: {
            id: 233824,
            name: "Dimensius",
            type: 'main_boss',
            phases: [4],
            abilities: {
                damage: {
                    accretionDisk: {
                        id: 1233292,
                        name: "Accretion Disk",
                        description: "Dimensius' lost mass swirls and churns at the edge of the platform, inflicting 5059379 Shadow damage to players on contact and knocking them back.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#240046',
                            text: 'Accretion Disk'
                        }
                    },
                    cosmicCollapse: {
                        id: 1234269,
                        name: "Cosmic Collapse",
                        description: "Dimensius collapses space itself in an attempt to crush his target, inflicting 25296896 Cosmic damage and 37102113 Physical damage to players within 12 yards and applying Cosmic Fragility.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'tank'
                        },
                        display: {
                            color: '#9d4edd',
                            text: 'Cosmic Collapse'
                        }
                    },
                    cosmicRadiation: {
                        id: 1232895,
                        name: "Cosmic Radiation",
                        description: "Dimensius radiates intense energy, inflicting 2108075 Cosmic damage to all players every 2 sec.",
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        },
                        display: {
                            color: '#7209b7',
                            text: 'Radiation'
                        }
                    },
                    crushed: {
                        id: 1234251,
                        name: "Crushed",
                        description: "Debuff applied by Crushing Gravity",
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    },
                    crushingGravity: {
                        id: 1234248,
                        name: "Crushing Gravity",
                        description: "After 5 sec intense gravity pushes down around the target, inflicting 6745839 Cosmic damage and applying Crushed to all players within 2 yards.",
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#240046',
                            text: 'Crushing Gravity'
                        }
                    },
                    devour: {
                        id: 1245289,
                        name: "Devour",
                        description: "Upon reaching 100 energy Dimensius increases his Density, creating a powerful inward force that inflicts 1686460 Shadow damage every 1 for 5 sec and pulls in players, Voidstars, Black Holes, and the Accretion Disk.",
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#c77dff',
                            text: 'DEVOUR'
                        }
                    },
                    extinguishStars: {
                        id: 1232391,
                        name: "Extinguish The Stars",
                        description: "Dimensius calls 8 Voidstars down around him over 10 sec, each inflicting 7870145 Shadow damage to all players plus an additional 30918428 Shadow damage to players within 5 yards of the impact location.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#5a189a',
                            text: 'Extinguish Stars'
                        }
                    },
                    fistsOfVoidlord: {
                        id: 1243055,
                        name: "Fists of the Voidlord",
                        description: "Dimensius' melee attacks disrupt the very fabric of space, forcing his target into melee range if they can't be reached and inflicting 8432299 Shadow damage to players within 8 yards of his target.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'tank'
                        },
                        display: {
                            color: '#5a189a',
                            text: 'Fists'
                        }
                    },
                    gravityWell: {
                        id: 1232394,
                        name: "Gravity Well",
                        description: "Voidstars project a Gravity Well that inflicts 3653996 Shadow damage every 1 sec to players within 4 yards and reduces their movement speed by 30%.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#7209b7',
                            text: 'Gravity Well'
                        }
                    },
                    inverseGravity: {
                        id: 1234249,
                        name: "Inverse Gravity",
                        description: "After 5 sec intense gravity pushes outward from the target, inflicting 1686460 Cosmic damage and violently knocking away players within 6 yards.",
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#c77dff',
                            text: 'Inverse Gravity'
                        }
                    },
                    oblivion: {
                        id: 1249077,
                        name: "Oblivion",
                        description: "Dimensius instantly devours any player who enters his body for any reason, killing them horribly.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#10002b',
                            text: 'OBLIVION'
                        }
                    },
                    shadowquake: {
                        id: 1234054,
                        name: "Shadowquake",
                        description: "A tremendous shockwave of dark energy radiates outward from the impact, inflicting 8994452 Shadow damage to players on contact and increasing damage taken from Shadowquake by 400% for 3 sec.",
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#240046',
                            text: 'Shadowquake'
                        }
                    },
                    supernova: {
                        id: 1232986,
                        name: "Supernova",
                        description: "Dimensius initiates the death of a Voidstar, causing it to explode after 7 sec inflicting 16864597 Cosmic damage to all players, reduced based on distance.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#e0aaff',
                            text: 'Supernova'
                        }
                    }
                },
                buffs: {
                    cosmicRadiationBuff: {
                        id: 1232894,
                        name: "Cosmic Radiation Buff",
                        description: "Dimensius radiates intense energy, inflicting 1264845 Cosmic damage to all players every 2 sec.",
                        usageHints: {
                            plotImportance: 'secondary'
                        }
                    },
                    density: {
                        id: 1233557,
                        name: "Density",
                        description: "Increases damage of Cosmic Radiation by 100%. This effect stacks.",
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    }
                },
                casts: {
                    cosmicCollapseCast: {
                        id: 1234263,
                        name: "Cosmic Collapse Cast",
                        description: "Dimensius collapses space itself in an attempt to crush his target, inflicting 25296896 Cosmic damage and 37102113 Physical damage to players within 12 yards and applying Cosmic Fragility.",
                        castTime: 4000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'tank'
                        },
                        display: {
                            color: '#9d4edd',
                            text: 'Cosmic Collapse Cast'
                        }
                    },
                    darkenedSky: {
                        id: 1234044,
                        name: "Darkened Sky",
                        description: "Dimensius calls down a series of massive celestial objects that collide with the ground one after another. Each impact inflicts 42161493 Shadow damage to players within 12 yards and triggers a Shadowquake.",
                        castTime: 2000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#240046',
                            text: 'Darkened Sky'
                        }
                    },
                    devourCast: {
                        id: 1233539,
                        name: "Devour Cast",
                        description: "Upon reaching 100 energy Dimensius increases his Density, creating a powerful inward force that inflicts 1686460 Shadow damage every 1 for 5 sec and pulls in players, Voidstars, Black Holes, and the Accretion Disk.",
                        castTime: 2000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#c77dff',
                            text: 'DEVOUR CAST'
                        }
                    },
                    extinguishStarsCast: {
                        id: 1231716,
                        name: "Extinguish The Stars Cast",
                        description: "Dimensius calls 8 Voidstars down around him over 10 sec, each inflicting 7870145 Shadow damage to all players plus an additional 30918428 Shadow damage to players within 5 yards of the impact location.",
                        castTime: 10000,
                        channeled: true,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#5a189a',
                            text: 'Extinguish Stars Cast'
                        }
                    }
                }
            }
        },
        
        // Mini Bosses
        artoshion: {
            id: 245255,
            name: "Artoshion",
            type: 'mini_boss',
            phases: [3],
            abilities: {
                damage: {
                    debrisField: {
                        id: 1237696,
                        name: "Debris Field",
                        description: "The Voidlord's powerful spell leaves behind cosmic debris that inflicts 3372919 Cosmic damage every 1 sec to players within and reduces their movement speed by 70%.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#540b0e',
                            text: 'Debris Field'
                        }
                    },
                    massDestruction: {
                        id: 1249433,
                        name: "Mass Destruction",
                        description: "Artoshion ejects superheated mass at random players after 5 sec, inflicting 8432299 Cosmic damage to all players in its path, knocking them back, and leaving behind a Debris Field.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#9d0208',
                            text: 'Mass Destruction'
                        }
                    },
                    touchOfOblivion: {
                        id: 1246145,
                        name: "Touch of Oblivion",
                        description: "The Voidlord's successful melee attacks apply Touch of Oblivion, inflicting 1405383 Shadow damage every 2 sec for 14 sec. This effect stacks. Upon reaching 10 applications, the target is consigned to Oblivion.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'tank'
                        },
                        display: {
                            color: '#370617',
                            text: 'Touch of Oblivion'
                        }
                    }
                },
                buffs: {},
                casts: {
                    conquerorsCross: {
                        id: 1239262,
                        name: "Conqueror's Cross",
                        description: "The Voidlord summons a phalanx of Voidwardens to secure his territory and restrict player movement.",
                        castTime: 2500,
                        usageHints: {
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#6a040f',
                            text: "Conqueror's Cross"
                        }
                    },
                    massDestructionCast: {
                        id: 1249423,
                        name: "Mass Destruction Cast",
                        description: "Artoshion ejects superheated mass at random players after 5 sec, inflicting 8432299 Cosmic damage to all players in its path, knocking them back, and leaving behind a Debris Field.",
                        castTime: 5000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#9d0208',
                            text: 'Mass Destruction Cast'
                        }
                    }
                }
            }
        },
        
        pargoth: {
            id: 245222,
            name: "Pargoth",
            type: 'mini_boss',
            phases: [3],
            abilities: {
                damage: {
                    debrisField: {
                        id: 1237696,
                        name: "Debris Field",
                        description: "The Voidlord's powerful spell leaves behind cosmic debris that inflicts 3372919 Cosmic damage every 1 sec to players within and reduces their movement speed by 70%.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#540b0e',
                            text: 'Debris Field'
                        }
                    },
                    starshard: {
                        id: 1254385,
                        name: "Starshard",
                        description: "Detonates violently on contact with a player, inflicting 2810766 Cosmic damage to players within 6 yards every 1 sec for 1 min and leaving behind a Debris Field.",
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#f48c06',
                            text: 'Starshard'
                        }
                    },
                    starshardNova: {
                        id: 1249454,
                        name: "Starshard Nova",
                        description: "Pargoth releases a burst of superheated stardust, inflicting 33729194 Cosmic damage to players within 10 yards, launching several Starshards, and leaving behind a Debris Field.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#ffba08',
                            text: 'Starshard Nova'
                        }
                    },
                    touchOfOblivion: {
                        id: 1246145,
                        name: "Touch of Oblivion",
                        description: "The Voidlord's successful melee attacks apply Touch of Oblivion, inflicting 1405383 Shadow damage every 2 sec for 14 sec. This effect stacks. Upon reaching 10 applications, the target is consigned to Oblivion.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'tank'
                        },
                        display: {
                            color: '#370617',
                            text: 'Touch of Oblivion'
                        }
                    }
                },
                buffs: {
                    eclipse: {
                        id: 1237690,
                        name: "Eclipse",
                        description: "The Voidlord begins a ritual to seal the worldsoul fragment within a veil of impenetrable darkness. Upon completion of the ritual, the fragment becomes inaccessible.",
                        duration: 31000,
                        channeled: true,
                        usageHints: {
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#f48c06',
                            text: 'ECLIPSE'
                        }
                    },
                    touchOfOblivionBuff: {
                        id: 1246143,
                        name: "Touch of Oblivion Buff",
                        description: "The Voidlord's successful melee attacks apply Touch of Oblivion, inflicting 1405383 Shadow damage every 2 sec for 14 sec. This effect stacks.",
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    },
                    voidShell: {
                        id: 1237689,
                        name: "Void Shell",
                        description: "The Voidlord shields itself, absorbing up to 11302925 incoming damage while it focuses on casting a powerful spell.",
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    }
                },
                casts: {
                    conquerorsCross: {
                        id: 1239262,
                        name: "Conqueror's Cross",
                        description: "The Voidlord summons a phalanx of Voidwardens to secure his territory and restrict player movement.",
                        castTime: 2500,
                        usageHints: {
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#6a040f',
                            text: "Conqueror's Cross"
                        }
                    },
                    starshardNovaCast: {
                        id: 1251619,
                        name: "Starshard Nova Cast",
                        description: "Pargoth releases a burst of superheated stardust, inflicting 33729194 Cosmic damage to players within 10 yards, launching several Starshards, and leaving behind a Debris Field.",
                        castTime: 3000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#ffba08',
                            text: 'Starshard Nova Cast'
                        }
                    }
                }
            }
        },
        
        // Adds
        livingMass: {
            id: 242587,
            name: "Living Mass",
            type: 'add',
            phases: [1],
            abilities: {
                damage: {
                    fission: {
                        id: 1231194,
                        name: "Fission",
                        description: "The Living Mass sustains a high-energy reaction that inflicts 2951304 Cosmic damage to random players every 2 sec.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        },
                        display: {
                            color: '#2d6a4f',
                            text: 'Fission'
                        }
                    }
                },
                buffs: {},
                casts: {
                    fissionCast: {
                        id: 1231005,
                        name: "Fission Cast",
                        description: "The Living Mass sustains a high-energy reaction that inflicts 2951304 Cosmic damage to random players every 2 sec.",
                        castTime: 3600000, // 1 hour cast
                        channeled: true,
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        },
                        display: {
                            color: '#2d6a4f',
                            text: 'Fission Cast'
                        }
                    }
                }
            }
        },
        
        // Environmental entity for skyriding
        environmentalSkyride: {
            id: 999999, // Placeholder ID
            name: "Skyriding Environment",
            type: 'environmental',
            phases: [2],
            abilities: {
                damage: {
                    endlessDarkness: {
                        id: 999998,
                        name: "Endless Darkness",
                        description: "Players without Reshii Wraps take damage from the endless darkness during skyriding.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#000000',
                            text: 'Endless Darkness'
                        }
                    }
                },
                buffs: {
                    vigor: {
                        id: 999997,
                        name: "Vigor",
                        description: "Speed and vigor restored by flying through Umbral Gates.",
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    }
                },
                casts: {
                    umbralGates: {
                        id: 999996,
                        name: "Umbral Gates",
                        description: "Gates that provide speed and restore vigor during the skyriding sequence.",
                        usageHints: {
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#4c956c',
                            text: 'Umbral Gate'
                        }
                    },
                    stellarCores: {
                        id: 999995,
                        name: "Stellar Cores",
                        description: "Collectible cores that players should grab during skyriding before landing.",
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#ffd23f',
                            text: 'Stellar Core'
                        }
                    }
                }
            }
        }
    },
    
    phases: [
        {
            number: 1,
            name: "Critical Mass",
            description: "Dimensius awakens and begins his assault. Players must manage Excess Mass, survive Massive Smash attacks, and coordinate through two Devour attempts.",
            type: 'normal',
            mechanics: ["darkMatter", "devour", "massiveSmash", "reverseGravity", "shatteredSpace"],
            activeEntities: ["dimensius_p1", "livingMass"],
            transition: {
                to: 2,
                triggerType: 'spell',
                triggerValue: 1234898, // Event Horizon
                description: "Dimensius collapses in on himself, forcing players to skyride to a new platform."
            },
            triggers: {
                healthPercent: 100
            }
        },
        {
            number: 2,
            name: "Skyriding Sequence",
            description: "Players must mount up and navigate through Umbral Gates while avoiding obstacles and collecting Stellar Cores.",
            type: 'intermission',
            mechanics: ["umbralGates", "stellarCores", "endlessDarkness"],
            activeEntities: ["environmentalSkyride"],
            transition: {
                to: 3,                
                triggerType: 'time',
                triggerValue: 60000, // Estimated 60 seconds
                description: "Players land on the new platform to face the Voidlords."
            }
        },
        {
            number: 3,
            name: "The Dark Heart",
            description: "Players must defeat the Voidlords Artoshion and Pargoth before they can seal the worldsoul fragment with Eclipse.",
            type: 'normal',
            mechanics: ["massDestruction", "starshardNova", "eclipse", "extinction"],
            activeEntities: ["dimensius_p2", "artoshion", "pargoth"],
            transition: {
                to: 4,
                triggerType: 'health',
                triggerValue: 30,
                description: "After defeating the Voidlords, Dimensius enters his final, most dangerous phase."
            }
        },
        {
            number: 4,
            name: "Singularity",
            description: "The final confrontation. Dimensius becomes increasingly unstable, summoning Voidstars, creating Black Holes, and threatening total annihilation.",
            type: 'normal',
            mechanics: ["extinguishStars", "darkenedSky", "cosmicCollapse", "supernova", "devour"],
            activeEntities: ["dimensius_p4"],
            triggers: {
                healthPercent: 30
            }
        }
    ],
    
    metadata: {
        raidTier: "Manaforge Omega",
        bossNumber: 8,
        releaseDate: "August 12th, 2025",
        description: "The eighth and final boss encounter in Manaforge Omega. Dimensius, the All-Devouring, destroyer of K'aresh, threatens to consume reality itself. This epic four-phase encounter features planet-level threats, gravity manipulation, and the ultimate test of coordination and survival.",
        strategy: "A complex encounter requiring precise positioning, gravity management, and phase-specific strategies. Players must master Excess Mass collection, survive devastating cosmic attacks, navigate a skyriding intermission, defeat powerful Voidlords, and finally face Dimensius in his most unstable form with Voidstars and Black Holes."
    }
};
