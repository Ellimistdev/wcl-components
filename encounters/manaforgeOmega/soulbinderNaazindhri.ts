import type { EncounterData } from '../types';

export const SoulbinderNaazindhriEncounter: EncounterData = {
    name: "Soulbinder Naazindhri",
    encounterId: 3130,
    
    entities: {
        soulbinderNaazindhri: {
            id: 3130,
            name: "Soulbinder Naazindhri",
            type: 'main_boss',
            phases: [1, 2],
            abilities: {
                damage: {
                    arcaneExpulsion: {
                        id: 1242071,
                        name: "Arcane Expulsion",
                        description: "Devastating shockwave - 3232381 Arcane damage and knockback to all players.",
                        damage: { amount: 3232381, school: 'Arcane' },
                        relatedEvents: [
                            {
                                spellId: 1242088,
                                eventType: 'cast',
                                description: "4 sec cast - The Soulbinder Naazindhri unleashes a devastating shockwave",
                                castTime: 4000,
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'reactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#8E44AD',
                            text: 'Expulsion Hit',
                            priority: 1
                        }
                    },
                    arcaneExpulsionPersistent: {
                        id: 1242088,
                        name: "Arcane Expulsion Persistent",
                        description: "Persistent damage after shockwave - 843230 Arcane damage per second for 15 seconds.",
                        damage: { amount: 843230, school: 'Arcane' },
                        duration: 15000,
                        tickInterval: 1000,
                        relatedEvents: [
                            {
                                spellId: 1242088,
                                eventType: 'cast',
                                description: "Cast that triggers persistent damage",
                                triggeredBy: 1242088
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'during',
                            category: 'raid'
                        }
                    },
                    mysticLash: {
                        id: 1237629,
                        name: "Mystic Lash",
                        description: "Tank DoT - 6605300 Arcane damage per second for 5 seconds.",
                        damage: { amount: 6605300, school: 'Arcane' },
                        duration: 5000,
                        tickInterval: 1000,
                        relatedEvents: [
                            {
                                spellId: 1241100,
                                eventType: 'cast',
                                description: "2 sec cast - The Soulbinder Naazindhri lashes out at her current target",
                                castTime: 2000,
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'tank'
                        },
                        display: {
                            color: '#C0392B',
                            text: 'Lash DoT',
                            priority: 1
                        }
                    },
                    mysticLashInstant: {
                        id: 1224025,
                        name: "Mystic Lash Instant",
                        description: "Alternative instant damage from Mystic Lash - 6605300 Arcane damage.",
                        damage: { amount: 6605300, school: 'Arcane' },
                        relatedEvents: [
                            {
                                spellId: 1241100,
                                eventType: 'cast',
                                description: "Cast that can trigger instant damage variant",
                                triggeredBy: 1241100
                            }
                        ],
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'tank'
                        }
                    },
                    soulfrayAnnihilation: {
                        id: 1227276,
                        name: "Soulfray Annihilation",
                        description: "Orb mechanic - 11250162 Arcane damage to hit players.",
                        damage: { amount: 11250162, school: 'Arcane' },
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'reactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#F39C12',
                            text: 'Soulfray Annihilation',
                            verticalAlign: 'top',
                            y: 110,
                            priority: 1
                        }
                    },
                    soulfrayAnnihilationAlt: {
                        id: 1227279,
                        name: "Soulfray Annihilation Alt",
                        description: "Alternative Soulfray Annihilation event.",
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'raid'
                        }
                    },
                    soulfireConvergence: {
                        id: 1249065,
                        name: "Soulfire Convergence",
                        description: "Multi-target DoT - 2108075 Arcane damage per second for 5 seconds.",
                        damage: { amount: 2108075, school: 'Arcane' },
                        duration: 5000,
                        tickInterval: 1000,
                        relatedEvents: [
                            {
                                spellId: 1225616,
                                eventType: 'cast',
                                description: "2 sec cast - The Soulbinder Naazindhri courses arcane energy through the bodies of several players",
                                castTime: 2000,
                                triggersMain: true
                            },
                            {
                                spellId: 1249065,
                                eventType: 'cast',
                                description: "Alternative instant cast version of Soulfire Convergence"
                            }
                        ],
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'during',
                            category: 'raid'
                        },
                        display: {
                            color: '#2980B9',
                            text: 'Soulfire DoT',
                            priority: 1
                        }
                    },
                    soulrendOrb: {
                        id: 1226827,
                        name: "Soulrend Orb",
                        description: "Debuff from orb contact - 2248613 Arcane damage every 5.2 seconds for 15 seconds.",
                        damage: { amount: 2248613, school: 'Arcane' },
                        duration: 15000,
                        tickInterval: 5200,
                        relatedEvents: [
                            {
                                spellId: 1249065,
                                eventType: 'damageTick',
                                description: "Soulfire damage that can apply orb debuff",
                                triggeredBy: 1249065
                            }
                        ],
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#F39C12',
                            text: 'Soulrend Orb Tick',
                            priority: 2
                        }
                    },
                    spellburn: {
                        id: 1240763,
                        name: "Spellburn",
                        description: "Periodic radiation - 1124306 Arcane damage every 2 seconds.",
                        damage: { amount: 1124306, school: 'Arcane' },
                        tickInterval: 2000,
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    },
                    tsunamiOfArcane: {
                        id: 1245422,
                        name: "Tsunami of Arcane",
                        description: "Primary target strikes with vulnerability amplification - 0 Arcane damage every 5.2 seconds.",
                        damage: { amount: 0, school: 'Arcane' },
                        tickInterval: 5200,
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'tank'
                        }
                    }
                },
                buffs: {
                    mysticLashVulnerability: {
                        id: 1224025,
                        name: "Mystic Lash Vulnerability",
                        description: "Increases Mystic Lash damage by 40% and Physical damage by 15% for 45 seconds. Stacks.",
                        duration: 45000,
                        aura: { stackable: true, dispellable: false },
                        relatedEvents: [
                            {
                                spellId: 1224025,
                                eventType: 'damage',
                                description: "Mystic Lash damage that applies vulnerability",
                                triggeredBy: 1241100
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'tank'
                        }
                    },
                    soulfrayVulnerability: {
                        id: 1241357,
                        name: "Soulfray Vulnerability",
                        description: "Increases damage taken by 15% for 20 seconds.",
                        duration: 20000,
                        aura: { stackable: false, dispellable: false },
                        relatedEvents: [
                            {
                                spellId: 1227276,
                                eventType: 'damage',
                                description: "Soulfray orb damage that applies vulnerability",
                                triggeredBy: 1227276
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        }
                    },
                    soulrendOrbDebuff: {
                        id: 1226827,
                        name: "Soulrend Orb Debuff",
                        description: "Reduces movement speed by 30% and haste by 25% for 15 seconds.",
                        duration: 15000,
                        aura: { stackable: false, dispellable: true },
                        relatedEvents: [
                            {
                                spellId: 1249065,
                                eventType: 'damageTick',
                                description: "Soulfire damage that can apply orb debuff",
                                triggeredBy: 1249065
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        }
                    },
                    manaMotivation: {
                        id: 1234871,
                        name: "Mana Motivation",
                        description: "Increases casting speed by 30%.",
                        aura: { stackable: false, dispellable: true },
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    }
                },
                casts: {
                    arcaneExpulsionCast: {
                        id: 1242088,
                        name: "Arcane Expulsion Cast",
                        description: "Devastating shockwave that knocks back all players.",
                        castTime: 4000,
                        usageHints: {
                            plotImportance: 'detail',
                            defensiveTiming: 'proactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#8E44AD',
                            text: 'Arcane Expulsion',
                            priority: 2
                        }
                    },
                    mysticLashCast: {
                        id: 1241100,
                        name: "Mystic Lash Cast",
                        description: "Lashes out at current target with vulnerability application.",
                        castTime: 2000,
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'proactive',
                            category: 'tank'
                        },
                        display: {
                            color: '#E74C3C',
                            text: 'Mystic Lash',
                            verticalAlign: 'top',
                            y: 65,
                            priority: 1
                        }
                    },
                    soulfireConvergenceCast: {
                        id: 1225616,
                        name: "Soulfire Convergence Cast",
                        description: "Courses arcane energy through several players.",
                        castTime: 2000,
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'proactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#db34b7ff',
                            text: 'Soulfire Cast',
                            verticalAlign: 'top',
                            y: 70,
                            priority: 2
                        }
                    },
                    soulfireConvergenceInstant: {
                        id: 1249065,
                        name: "Soulfire Convergence Instant",
                        description: "Alternative instant cast version of Soulfire Convergence.",
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'proactive',
                            category: 'raid'
                        }
                    },
                    soulCallingCast: {
                        id: 1225582,
                        name: "Soul Calling Cast",
                        description: "Activates chambers and transforms unbound souls.",
                        castTime: 3000,
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'proactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#9B59B6',
                            text: 'Soul Calling',
                            priority: 3
                        }
                    }
                }
            }
        },
        
        shadowguardAssassin: {
            id: 237897,
            name: "Shadowguard Assassin",
            type: 'add',
            phases: [2],
            abilities: {
                damage: {
                    voidbladeAmbush: {
                        id: 1227051,
                        name: "Voidblade Ambush",
                        description: "Shadow-infused strike - 843000 Shadow damage per second for 30 seconds.",
                        damage: { amount: 843000, school: 'Shadow' },
                        duration: 30000,
                        tickInterval: 1000,
                        relatedEvents: [
                            {
                                spellId: 1227048,
                                eventType: 'cast',
                                description: "The Shadowguard Assassin targets a random player, vanishing into the shadows then reappearing behind them",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'reactive',
                            category: 'raid'
                        }
                    }
                },
                buffs: {},
                casts: {
                    voidbladeAmbushCast: {
                        id: 1227048,
                        name: "Voidblade Ambush Cast",
                        description: "Vanishes into shadows then reappears behind random player.",
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'proactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#34495E',
                            text: 'Voidblade Ambush',
                            priority: 3
                        }
                    }
                }
            }
        },
        
        shadowguardMage: {
            id: 237981,
            name: "Shadowguard Mage",
            type: 'add',
            phases: [2],
            abilities: {
                damage: {
                    voidBurst: {
                        id: 1227052,
                        name: "Void Burst",
                        description: "Void energy burst - 2951304 Shadow damage plus 1405383 per second for 15 seconds.",
                        damage: { amount: 2951304, school: 'Shadow' },
                        duration: 15000,
                        tickInterval: 1000,
                        relatedEvents: [
                            {
                                spellId: 1252952,
                                eventType: 'cast',
                                description: "3 sec cast - The caster forth a burst of Void energy",
                                castTime: 3000,
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    }
                },
                buffs: {},
                casts: {
                    voidBurstCast: {
                        id: 1252952,
                        name: "Void Burst Cast",
                        description: "Channels forth a burst of Void energy.",
                        castTime: 3000,
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    }
                }
            }
        },
        
        shadowguardPhaseblade: {
            id: 244922,
            name: "Shadowguard Phaseblade",
            type: 'add',
            phases: [2],
            abilities: {
                damage: {
                    phaseBlades: {
                        id: 1235246,
                        name: "Phase Blades",
                        description: "Searing attack - 702692 Shadow damage that jumps between players.",
                        damage: { amount: 702692, school: 'Shadow' },
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    }
                },
                buffs: {
                    voidResonance: {
                        id: 1242018,
                        name: "Void Resonance",
                        description: "Gains power over time, increasing damage by 7%. Stacks every 8 seconds.",
                        aura: { stackable: true, dispellable: false },
                        usageHints: {
                            plotImportance: 'detail'
                        }
                    }
                },
                casts: {}
            }
        },
        
        bindingChambers: {
            id: 238197,
            alternateIds: [238196, 238203, 238204, 238199, 238195, 238205, 238198, 238207, 238201, 238210, 238202],
            name: "Binding Chambers",
            type: 'environmental',
            phases: [1, 2],
            abilities: {
                damage: {
                    essenceImplosion: {
                        id: 1227848,
                        name: "Essence Implosion",
                        description: "Chamber explosion - 1405383 Arcane damage per remaining chamber.",
                        damage: { amount: 1405383, school: 'Arcane' },
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'proactive',
                            category: 'positioning'
                        },
                        display: {
                            color: '#4498adff',
                            text: 'Essence Implosion',
                            verticalAlign: 'top',
                            y: 100,
                            priority: 2
                        }
                    },
                    arcaneEnergy: {
                        id: 1242086,
                        name: "Arcane Energy",
                        description: "Residual energy pools - 3372919 Arcane damage per second.",
                        damage: { amount: 3372919, school: 'Arcane' },
                        tickInterval: 1000,
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    shatterpulse: {
                        id: 1250008,
                        name: "Shatterpulse",
                        description: "Sigil destruction - 4634199 healing absorb shield to all players.",
                        damage: { amount: 4634199, school: 'Arcane' },
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    }
                },
                buffs: {},
                casts: {
                    arcaneSigils1: {
                        id: 1246530,
                        name: "Arcane Sigils",
                        description: "Enchants chambers with protective sigils against Soulfray Annihilation.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    arcaneSigils2: {
                        id: 1246531,
                        name: "Arcane Sigils Alt",
                        description: "Alternative Arcane Sigils cast event.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    soulweave1: {
                        id: 1219040,
                        name: "Soulweave",
                        description: "Unbound souls wrapped in silk bindings, transforming into Shadowguard.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    soulweave2: {
                        id: 1239988,
                        name: "Soulweave Alt 1",
                        description: "Alternative Soulweave cast event.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    soulweave3: {
                        id: 1219053,
                        name: "Soulweave Alt 2",
                        description: "Alternative Soulweave cast event.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    }
                }
            }
        }
    },
    
    phases: [
        {
            number: 1,
            name: "Canister Cleanup",
            description: "Break 6 binding chambers using Soulfray Annihilation orbs while managing tank mechanics and raid damage.",
            type: 'normal',
            mechanics: ["soulCalling", "soulfrayAnnihilation", "mysticLash", "soulfireConvergence", "arcaneExpulsion"],
            activeEntities: ["soulbinderNaazindhri", "bindingChambers"],
            transition: {
                to: 2,
                triggerType: 'time',
                triggerValue: 180000,
                description: "After breaking enough chambers, remaining chambers explode triggering add wave."
            },
            triggers: {
                healthPercent: 100
            }
        },
        {
            number: 2,
            name: "Add Wave",
            description: "Survive Essence Implosion damage and defeat all spawned Shadowguard adds.",
            type: 'intermission',
            mechanics: ["essenceImplosion", "voidbladeAmbush", "voidBurst", "phaseBlades", "voidResonance"],
            activeEntities: ["soulbinderNaazindhri", "shadowguardAssassin", "shadowguardMage", "shadowguardPhaseblade", "bindingChambers"],
            triggers: {
                healthPercent: 50
            }
        }
    ],
    
    metadata: {
        raidTier: "Manaforge Omega",
        bossNumber: 2,
        releaseDate: "2024-09-10",
        description: "Soulbinder Naazindhri is an ethereal soul manipulator who controls binding chambers and can summon Shadowguard reinforcements. This encounter emphasizes positioning, add management, and coordinated use of boss abilities to break objectives.",
        strategy: "Phase 1 requires using Soulfray Annihilation orbs to destroy 6 binding chambers while managing tank swaps for Mystic Lash and coordinating through Arcane Expulsion. The intermission involves surviving the resulting Essence Implosion and defeating waves of Shadowguard adds with varying abilities and threat levels."
    }
};
