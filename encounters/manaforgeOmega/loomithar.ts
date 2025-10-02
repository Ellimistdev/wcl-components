import type { EncounterData } from '../types';

export const LoomitharEncounter: EncounterData = {
    name: "Loom'ithar",
    encounterId: 3131,
    
    entities: {
        loomithar: {
            id: 233815,
            name: "Loom'ithar",
            type: 'main_boss',
            phases: [1, 2],
            abilities: {
                damage: {
                    piercingStrand: {
                        id: 1227742,
                        name: "Piercing Strand",
                        description: "Tank beam requiring tank swap - inflicts 32323811 Arcane damage and applies vulnerability debuff.",
                        damage: {
                            amount: 32323811,
                            school: 'Arcane'
                        },
                        relatedEvents: [
                            {
                                spellId: 1227263,
                                eventType: 'cast',
                                description: "Cast event for tank beam",
                                notes: "Tank beam (32M unmitigated)",
                                triggersMain: true
                            },
                            {
                                spellId: 1237212,
                                eventType: 'cast',
                                description: "Alternative cast event for Piercing Strand"
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'tank'
                        },
                        display: {
                            color: '#E67E22',
                            text: 'Strand Hit',
                            priority: 1
                        }
                    },
                    arcaneOutrageTicking: {
                        id: 1227784,
                        name: "Arcane Outrage Ticking",
                        description: "Ticking damage during spread mechanic - 1454571 Arcane damage per second.",
                        duration: 5000,
                        tickInterval: 1000,
                        damage: {
                            amount: 1454571,
                            school: 'Arcane'
                        },
                        relatedEvents: [
                            {
                                spellId: 1227782,
                                eventType: 'beginCast',
                                description: "Begin cast event for Arcane Outrage",
                                castTime: 2000,
                                triggersMain: true
                            },
                            {
                                spellId: 1227784,
                                eventType: 'cast',
                                description: "Cast completion event",
                                triggeredBy: 1227782
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    },
                    arcaneOutrage: {
                        id: 1243908,
                        name: "Arcane Outrage",
                        description: "Raid-wide spread mechanic explosion inflicting 4800000 Arcane damage.",
                        damage: {
                            amount: 4800000,
                            school: 'Arcane'
                        },
                        relatedEvents: [
                            {
                                spellId: 1227784,
                                eventType: 'damageTick',
                                description: "Ticking damage phase",
                                triggersMain: true
                            }
                        ],
                        eventSequence: {
                            fullSequence: ['beginCast', 'cast', 'tickingDamage', 'finalExplosion'],
                            damageEvents: ['tickingDamage', 'finalExplosion'],
                            castEvents: ['beginCast', 'cast'],
                            defensiveTimings: ['beginCast', 'finalExplosion']
                        },
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#0b9beeff',
                            text: 'Outrage Explosion',
                            priority: 1
                        }
                    },
                    writhingWave: {
                        id: 1227140,
                        name: "Writhing Wave",
                        description: "Frontal cone damage split among players - 96971433 Nature damage split among soakers.",
                        damage: {
                            amount: 96971433,
                            school: 'Nature',
                            splitDamage: true
                        },
                        relatedEvents: [
                            {
                                spellId: 1227227,
                                eventType: 'beginCast',
                                description: "Begin cast event for Writhing Wave",
                                triggersMain: true
                            },
                            {
                                spellId: 1227226,
                                eventType: 'cast',
                                description: "Cast completion event",
                                triggeredBy: 1227227
                            }
                        ],
                        eventSequence: {
                            fullSequence: ['beginCast', 'cast', 'initialDamage', 'persistentDamage'],
                            defensiveTimings: ['beginCast', 'initialDamage']
                        },
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#2ECC71',
                            text: 'Writhing Wave Soak',
                            priority: 1
                        }
                    },
                    writhingWaveDot: {
                        id: 1227163,
                        name: "Writhing Wave DoT",
                        description: "DoT from soaking cone - 13745701 Nature damage over 13 seconds.",
                        duration: 13000,
                        tickInterval: 1000,
                        damage: {
                            amount: 13745701,
                            school: 'Nature'
                        },
                        relatedEvents: [
                            {
                                spellId: 1227140,
                                eventType: 'damage',
                                description: "Initial cone damage that triggers DoT",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'secondary',
                            category: 'raid'
                        }
                    },
                    infusionPylons: {
                        id: 1250103,
                        name: "Infusion Pylons",
                        description: "Beam damage requiring soaking - 606071 Arcane damage per second to soakers.",
                        tickInterval: 1000,
                        damage: {
                            amount: 606071,
                            school: 'Arcane'
                        },
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#9B59B6',
                            text: 'Pylon Soak',
                            priority: 2
                        }
                    },
                    excessNova: {
                        id: 1247029,
                        name: "Excess Nova",
                        description: "Burst when pylons aren't soaked - 2101048 Arcane damage to all players.",
                        damage: {
                            amount: 2101048,
                            school: 'Arcane'
                        },
                        relatedEvents: [
                            {
                                spellId: 1250103,
                                eventType: 'damageTick',
                                description: "Pylon beams not being soaked properly",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'detail',
                            category: 'raid'
                        },
                        display: {
                            color: '#8E44AD',
                            text: 'Excess Nova',
                            priority: 1
                        }
                    },
                    infusionTether: {
                        id: 1238197,
                        name: "Infusion Tether",
                        description: "Players pulled and tethered - 452533 Arcane damage per second, growing over time.",
                        tickInterval: 1000,
                        damage: {
                            amount: 452533,
                            school: 'Arcane'
                        },
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#16A085',
                            text: 'Tether',
                            priority: 2
                        }
                    },
                    lairWeaving: {
                        id: 1237307,
                        name: "Lair Weaving",
                        description: "Collapsing ring lines - 20202382 Nature damage and 8 second root.",
                        damage: {
                            amount: 20202382,
                            school: 'Nature'
                        },
                        relatedEvents: [
                            {
                                spellId: 1237272,
                                eventType: 'cast',
                                description: "Loom'ithar weaves a collapsing ring of Infused Tangles",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#d674d1ff',
                            text: 'Tangle Hit',
                            textAlign: 'left',
                            verticalAlign: 'top',
                            y: 10,
                            priority: 1
                        }
                    },
                    livingSilkAbsorption: {
                        id: 1226395,
                        name: "Living Silk Absorption",
                        description: "Raidwide ticking damage - 266671 Arcane damage every 0.5 seconds for 8 seconds.",
                        duration: 8000,
                        tickInterval: 500,
                        damage: {
                            amount: 266671,
                            school: 'Arcane'
                        },
                        relatedEvents: [
                            {
                                spellId: 1226366,
                                eventType: 'channelStart',
                                description: "Loom'ithar begins absorbing arcane energy",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'secondary',
                            category: 'positioning'
                        }
                    },
                    livingSilkExplosion: {
                        id: 1226366,
                        name: "Living Silk Explosion",
                        description: "Massive explosion from ground webs - 129345416 Arcane damage within 45 yards.",
                        damage: {
                            amount: 129345416,
                            school: 'Arcane'
                        },
                        relatedEvents: [
                            {
                                spellId: 1226395,
                                eventType: 'damageTick',
                                description: "Absorption phase completing",
                                triggersMain: true
                            }
                        ],
                        eventSequence: {
                            fullSequence: ['absorptionCast', 'absorptionDamage', 'explosion'],
                            defensiveTimings: ['absorptionCast', 'explosion']
                        },
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#E67E22',
                            text: 'Silk Explosion',
                            priority: 1
                        }
                    },
                    livingSilkGroundEffect: {
                        id: 1226366,
                        name: "Living Silk Ground Effect",
                        description: "Ground webs - 6464762 Nature damage per second and 25% movement speed reduction.",
                        tickInterval: 1000,
                        damage: {
                            amount: 6464762,
                            school: 'Nature'
                        },
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    primalSpellstorm: {
                        id: 1226877,
                        name: "Primal Spellstorm",
                        description: "Swirly mechanics - 16161905 Arcane damage within 6 yards.",
                        damage: {
                            amount: 16161905,
                            school: 'Arcane'
                        },
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    arcaneIchor: {
                        id: 1243771,
                        name: "Arcane Ichor",
                        description: "Zone denial pools - 6464762 Arcane damage per second.",
                        tickInterval: 1000,
                        damage: {
                            amount: 6464762,
                            school: 'Arcane'
                        },
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    silkBlast: {
                        id: 1231403,
                        name: "Silk Blast",
                        description: "Primary tank attack - Physical damage to current target.",
                        damage: {
                            school: 'Physical'
                        },
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'tank'
                        }
                    }
                },
                buffs: {
                    piercingStrandVulnerability: {
                        id: 1227263,
                        name: "Piercing Strand Vulnerability",
                        description: "Increases damage taken from Piercing Strand by 1000% for 45 sec.",
                        duration: 45000,
                        aura: {
                            stackable: false,
                            dispellable: false
                        },
                        relatedEvents: [
                            {
                                spellId: 1227742,
                                eventType: 'damage',
                                description: "Piercing Strand damage that applies vulnerability",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'tank'
                        }
                    },
                    hyperInfusion: {
                        id: 1247045,
                        name: "Hyper Infusion",
                        description: "Increases damage taken from Infusion Pylons by 100% for 45 sec. Stacks.",
                        duration: 45000,
                        aura: {
                            stackable: true,
                            dispellable: false
                        },
                        relatedEvents: [
                            {
                                spellId: 1250103,
                                eventType: 'damageTick',
                                description: "Pylon beam damage that applies stacking debuff",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        }
                    },
                    writhingWaveDebuff: {
                        id: 1227163,
                        name: "Writhing Wave DoT",
                        description: "DoT from soaking cone - 13745701 Nature damage over 13 seconds.",
                        duration: 13000,
                        tickInterval: 1000,
                        aura: {
                            stackable: false,
                            dispellable: false
                        },
                        relatedEvents: [
                            {
                                spellId: 1227140,
                                eventType: 'damage',
                                description: "Initial cone damage that applies DoT",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        }
                    }
                },
                casts: {
                    piercingStrandCast: {
                        id: 1227263,
                        name: "Piercing Strand Cast",
                        description: "Tank beam cast requiring defensive cooldowns.",
                        relatedEvents: [
                            {
                                spellId: 1237212,
                                eventType: 'cast',
                                description: "Alternative cast event"
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'secondary',
                            category: 'tank'
                        },
                        display: {
                            color: '#F39C12',
                            text: 'Piercing Strand',
                            priority: 2
                        }
                    },
                    arcaneOutrageCast: {
                        id: 1227782,
                        name: "Arcane Outrage Cast",
                        description: "Begin cast for raid-wide spread mechanic.",
                        castTime: 2000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#1e81bbff',
                            text: 'Arcane Outrage',
                            verticalAlign: 'top',
                            y: 85,
                            priority: 2
                        }
                    },
                    writhingWaveCast: {
                        id: 1227227,
                        name: "Writhing Wave Cast",
                        description: "Begin cast for frontal cone soak mechanic.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'secondary',
                            category: 'raid'
                        },
                        display: {
                            color: '#27AE60',
                            text: 'Writhing Wave',
                            verticalAlign: 'top',
                            y: 80,
                            priority: 2
                        }
                    },
                    lairWeavingCast: {
                        id: 1237272,
                        name: "Lair Weaving Cast",
                        description: "Weaves collapsing ring of Infused Tangles.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'secondary',
                            category: 'positioning'
                        },
                        display: {
                            color: '#16A085',
                            text: 'Lair Weaving',
                            priority: 2
                        }
                    },
                    livingSilkChannel: {
                        id: 1226366,
                        name: "Living Silk Channel",
                        description: "Absorbs arcane energy before massive explosion.",
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#D35400',
                            text: 'Living Silk',
                            priority: 2
                        }
                    }
                }
            }
        },
        
        arcaneOverflow: {
            id: 999990,
            name: "Arcane Overflow",
            type: 'environmental',
            phases: [2],
            abilities: {
                damage: {
                    overflowTick: {
                        id: 1231408,
                        name: "Arcane Overflow",
                        description: "Unavoidable ticking raid damage throughout Phase 2 - 852541 Arcane damage per second.",
                        tickInterval: 1000,
                        damage: {
                            amount: 852541,
                            school: 'Arcane'
                        },
                        relatedEvents: [
                            {
                                spellId: 1231469,
                                eventType: 'damageTick',
                                description: "Actual damage event for Arcane Overflow",
                                notes: "Ticking damage during the entirety of p2 (853K/s unmitigated)"
                            }
                        ],
                        usageHints: {
                            defensiveTiming: 'during',
                            plotImportance: 'secondary',
                            category: 'raid'
                        }
                    }
                },
                buffs: {},
                casts: {}
            }
        }
    },
    
    phases: [
        {
            number: 1,
            name: "Phase 1",
            description: "Initial phase focusing on positioning and tank mechanics.",
            type: 'normal',
            mechanics: ["piercingStrand", "lairWeaving", "infusionTether", "primalSpellstorm"],
            activeEntities: ["loomithar"],
            transition: {
                to: 2,
                triggerType: 'health',
                triggerValue: 50,
                description: "Loom'ithar enters Phase 2 with new abilities and persistent raid damage."
            },
            triggers: {
                healthPercent: 100
            }
        },
        {
            number: 2,
            name: "Phase 2",
            description: "Advanced phase with spread mechanics, soak requirements, and persistent damage.",
            type: 'normal',
            mechanics: ["arcaneOutrage", "arcaneOverflow", "writhingWave", "infusionPylons", "primalSpellstorm", "arcaneIchor"],
            activeEntities: ["loomithar", "arcaneOverflow"],
            triggers: {
                healthPercent: 50
            }
        }
    ],
    
    metadata: {
        raidTier: "Manaforge Omega",
        bossNumber: 3,
        releaseDate: "2024-09-10",
        description: "Loom'ithar is a spider-like creature that weaves deadly patterns across the battlefield. This encounter features precise positioning requirements, tank swaps, and coordination-heavy mechanics.",
        strategy: "Phase 1 focuses on managing tank debuffs and positioning for Lair Weaving. Phase 2 introduces persistent raid damage, spread mechanics with Arcane Outrage, and coordinated soaking of Writhing Wave and Infusion Pylons."
    }
};
