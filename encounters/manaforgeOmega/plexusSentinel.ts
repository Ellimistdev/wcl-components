import type { EncounterData } from '../types';

export const PlexusSentinelEncounter: EncounterData = {
    name: "Plexus Sentinel",
    encounterId: 3129,
    
    entities: {
        plexusSentinel: {
            id: 3129,
            name: "Plexus Sentinel",
            type: 'main_boss',
            phases: [1, 2],
            abilities: {
                damage: {
                    cleanseTheChamber: {
                        id: 1234733,
                        name: "Cleanse the Chamber",
                        description: "Wall moving through the raid - 3653996 Arcane damage to target and up to 5 players within 20 yards.",
                        damage: { amount: 3653996, school: 'Arcane' },
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'positioning'
                        },
                        display: {
                            color: '#FF6B6B',
                            text: 'Cleanse Chamber',
                            priority: 1
                        }
                    },
                    eradicatingSalvoSoak: {
                        id: 1219611,
                        name: "Eradicating Salvo",
                        description: "Soak mechanic - 85728368 Arcane damage split between players within 6 yards.",
                        damage: { amount: 85728368, school: 'Arcane', splitDamage: true },
                        relatedEvents: [
                            {
                                spellId: 1219531,
                                eventType: 'cast',
                                description: "5 sec cast - The Plexus Sentinel targets a player to be purged",
                                castTime: 5000,
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#4ECDC4',
                            text: 'Salvo Hit',
                            priority: 1
                        }
                    },
                    eradicatingSalvoFail: {
                        id: 1229387,
                        name: "Eradicating Salvo Failure",
                        description: "Raid damage when soak fails - 16864597 Arcane damage to all players.",
                        damage: { amount: 16864597, school: 'Arcane' },
                        relatedEvents: [
                            {
                                spellId: 1219531,
                                eventType: 'cast',
                                description: "Eradicating Salvo cast that can trigger failure damage",
                                triggeredBy: 1219531
                            }
                        ],
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#E74C3C',
                            text: 'Salvo Fail',
                            priority: 1
                        }
                    },
                    obliterationArcanocannon: {
                        id: 1219346,
                        name: "Obliteration Arcanocannon",
                        description: "Tank buster - 26702279 Arcane damage within 10 yards, 25296896 to others.",
                        damage: { amount: 26702279, school: 'Arcane' },
                        relatedEvents: [
                            {
                                spellId: 1219263,
                                eventType: 'cast',
                                description: "Tank buster cast that triggers this damage",
                                castTime: 6000,
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'reactive',
                            category: 'tank'
                        },
                        display: {
                            color: '#E67E22',
                            text: 'Obliteration Hit',
                            priority: 1
                        }
                    },
                    manifestMatricesDebuff: {
                        id: 1226752,
                        name: "Manifest Matrices",
                        description: "Targeted debuff - 1616191 Arcane damage per second for 6 seconds.",
                        damage: { amount: 1616191, school: 'Arcane' },
                        duration: 6000,
                        tickInterval: 1000,
                        relatedEvents: [
                            {
                                spellId: 1219450,
                                eventType: 'cast',
                                description: "2 sec cast - Fires Arcane energy into players",
                                castTime: 2000,
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'detail',
                            defensiveTiming: 'during',
                            category: 'positioning'
                        }
                    },
                    protocolPurgeDamage: {
                        id: 1224305,
                        name: "Protocol Purge",
                        description: "Damage from boss relocation and atomizer activation.",
                        relatedEvents: [
                            {
                                spellId: 1220489,
                                eventType: 'cast',
                                description: "Protocol Purge cast 1",
                                castTime: 5000,
                                triggersMain: true
                            },
                            {
                                spellId: 1220555,
                                eventType: 'cast',
                                description: "Protocol Purge cast 2",
                                castTime: 5000,
                                triggersMain: true
                            },
                            {
                                spellId: 1220553,
                                eventType: 'cast',
                                description: "Protocol Purge cast 3",
                                castTime: 5000,
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'reactive',
                            category: 'positioning'
                        }
                    },
                    atomize: {
                        id: 1219223,
                        name: "Atomize",
                        description: "Wall damage - 49891099 Arcane damage when passing through the Sieve.",
                        damage: { amount: 49891099, school: 'Arcane' },
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        },
                        display: {
                            color: '#95A5A6',
                            text: 'Atomize',
                            priority: 0
                        }
                    },
                    purgingLightning: {
                        id: 1233110,
                        name: "Purging Lightning",
                        description: "Stacking damage - 386480 Arcane damage, increasing by 25% per cast.",
                        damage: { amount: 386480, school: 'Arcane' },
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'during',
                            category: 'raid'
                        }
                    },
                    poweredAutomaton: {
                        id: 1219687,
                        name: "Powered Automaton",
                        description: "Periodic energy emission - 3653996 Arcane damage to target and nearby players.",
                        damage: { amount: 3653996, school: 'Arcane' },
                        relatedEvents: [
                            {
                                spellId: 1223364,
                                eventType: 'cast',
                                description: "Powered Automaton cast event",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    },
                    energyCutter: {
                        id: 1218668,
                        name: "Energy Cutter",
                        description: "Rotating beam - 7729607 Arcane damage to players in the area.",
                        damage: { amount: 7729607, school: 'Arcane' },
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    potentManaResidue: {
                        id: 1219354,
                        name: "Potent Mana Residue",
                        description: "Ground effect - 4924561 Arcane damage every 2 seconds and 50% slow.",
                        damage: { amount: 4924561, school: 'Arcane' },
                        tickInterval: 2000,
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    staticLightning: {
                        id: 1242310,
                        name: "Static Lightning",
                        description: "Environmental lightning - 69 Nature damage.",
                        damage: { amount: 69, school: 'Nature' },
                        relatedEvents: [
                            {
                                spellId: 1234699,
                                eventType: 'cast',
                                description: "Static Lightning cast event",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    },
                    displacementMatrixExplosion: {
                        id: 1218626,
                        name: "Displacement Matrix",
                        description: "Area denial mine - 5762071 Arcane damage and stun within 8 yards when touched.",
                        damage: { amount: 5762071, school: 'Arcane' },
                        relatedEvents: [
                            {
                                spellId: 1218625,
                                eventType: 'debuffApply',
                                description: "Stun from displacement matrix explosion",
                                triggeredBy: 1218626
                            }
                        ],
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    }
                },
                buffs: {
                    obliterationVulnerability: {
                        id: 1219263,
                        name: "Obliteration Vulnerability",
                        description: "Takes 1000% damage from Obliteration Arcanocannon for 45 seconds.",
                        duration: 45000,
                        aura: { stackable: false, dispellable: false },
                        relatedEvents: [
                            {
                                spellId: 1219346,
                                eventType: 'damage',
                                description: "Obliteration damage that applies vulnerability",
                                triggeredBy: 1219263
                            }
                        ],
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'tank'
                        }
                    },
                    displacementMatrixStun: {
                        id: 1218625,
                        name: "Matrix Stun",
                        description: "Stun effect from displacement matrix explosion.",
                        aura: { stackable: false, dispellable: true },
                        relatedEvents: [
                            {
                                spellId: 1218626,
                                eventType: 'damage',
                                description: "Matrix explosion that triggers stun",
                                triggersMain: true
                            }
                        ],
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'positioning'
                        }
                    }
                },
                casts: {
                    eradicatingSalvoCast: {
                        id: 1219531,
                        name: "Eradicating Salvo Cast",
                        description: "Targets player for purging with two missiles in quick succession.",
                        castTime: 5000,
                        usageHints: {
                            plotImportance: 'detail',
                            defensiveTiming: 'proactive',
                            category: 'raid'
                        },
                        display: {
                            color: '#4ECDC4',
                            text: 'Eradicating Salvo Cast',
                            priority: 2
                        }
                    },
                    manifestMatricesCast: {
                        id: 1219450,
                        name: "Manifest Matrices Cast",
                        description: "Fires Arcane energy into 4 targeted players.",
                        castTime: 2000,
                        usageHints: {
                            plotImportance: 'secondary',
                            defensiveTiming: 'proactive',
                            category: 'positioning'
                        },
                        display: {
                            color: '#9B59B6',
                            text: 'Manifest Matrices',
                            priority: 3
                        }
                    },
                    obliterationArcanocannon: {
                        id: 1219263,
                        name: "Obliteration Arcanocannon Cast",
                        description: "Marks current target then fires arcane charge.",
                        castTime: 6000,
                        usageHints: {
                            plotImportance: 'detail',
                            defensiveTiming: 'proactive',
                            category: 'tank'
                        },
                        display: {
                            color: '#F39C12',
                            text: 'Obliteration Cast',
                            priority: 2
                        }
                    },
                    protocolPurge1: {
                        id: 1220489,
                        name: "Protocol Purge Cast",
                        description: "Relocates boss, pushes players, and activates Arcanomatrix Atomizer.",
                        castTime: 5000,
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'proactive',
                            category: 'positioning'
                        },
                        display: {
                            color: '#2ECC71',
                            text: 'Protocol: Purge',
                            verticalAlign: 'top',
                            y: 85,
                            priority: 1
                        }
                    },
                    protocolPurge2: {
                        id: 1220555,
                        name: "Protocol Purge Cast Alt 1",
                        description: "Alternative cast ID for Protocol: Purge.",
                        castTime: 5000,
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'proactive',
                            category: 'positioning'
                        }
                    },
                    protocolPurge3: {
                        id: 1220553,
                        name: "Protocol Purge Cast Alt 2",
                        description: "Alternative cast ID for Protocol: Purge.",
                        castTime: 5000,
                        usageHints: {
                            plotImportance: 'primary',
                            defensiveTiming: 'proactive',
                            category: 'positioning'
                        }
                    },
                    poweredAutomatonCast: {
                        id: 1223364,
                        name: "Powered Automaton Cast",
                        description: "Periodic arcane energy emission cast.",
                        usageHints: {
                            plotImportance: 'detail',
                            category: 'raid'
                        }
                    },
                    staticLightningCast: {
                        id: 1234699,
                        name: "Static Lightning Cast",
                        description: "Activates environmental lightning damage.",
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
            name: "Purge the Intruders",
            description: "Standard encounter phase with positioning mechanics and tank swaps.",
            type: 'normal',
            mechanics: ["eradicatingSalvo", "manifestMatrices", "obliterationArcanocannon", "cleanseTheChamber"],
            activeEntities: ["plexusSentinel"],
            transition: {
                to: 2,
                triggerType: 'energy',
                triggerValue: 100,
                description: "Boss relocates and activates the Arcanomatrix Atomizer for phase 2."
            },
            triggers: {
                healthPercent: 100
            }
        },
        {
            number: 2,
            name: "The Sieve Awakens",
            description: "Boss relocates and activates environmental hazards while channeling stacking damage.",
            type: 'intermission',
            mechanics: ["protocolPurge", "purgingLightning", "energyCutter", "potentManaResidue"],
            activeEntities: ["plexusSentinel"],
            triggers: {
                energyPercent: 100
            }
        }
    ],
    
    metadata: {
        raidTier: "Manaforge Omega",
        bossNumber: 1,
        description: "The Plexus Sentinel is a large arcane construct that serves as the first boss of Manaforge Omega. This encounter focuses on coordination mechanics, tank swaps, and positioning around environmental hazards.",
        strategy: "Phase 1 requires coordinated soaking of Eradicating Salvo missiles, proper positioning for Manifest Matrices, and tank swaps for Obliteration Arcanocannon. Phase 2 involves navigating the activated Arcanomatrix Atomizer while dealing with increasing Purging Lightning damage."
    }
};
