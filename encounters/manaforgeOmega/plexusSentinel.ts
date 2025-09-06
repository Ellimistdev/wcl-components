import type { EnhancedEncounterData } from '../types';

export const PlexusSentinelEncounter: EnhancedEncounterData = {
    name: "Plexus Sentinel",
    encounterId: 3129,
    mechanics: {
        cleanseTheChamber: {
            name: "Cleanse the Chamber",
            description: "Wall moving through the raid, one-shot mechanic",
            events: {
                cast: {
                    spellId: 1234733,
                    eventType: 'cast',
                    description: "The Plexus Sentinel periodically emits arcing energy, inflicting 3653996 Arcane damage to the target and up to 5 players within 20 yards",
                    notes: "Wall moving through the raid, one-shot mechanic",
                    damage: {
                        amount: 3653996,
                        school: 'Arcane'
                    },
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'reactive'
                    },
                    display: {
                        color: '#FF6B6B',
                        text: 'Cleanse Chamber',
                        priority: 1
                    }
                }
            },
            display: {
                primaryColor: '#FF6B6B',
                chartStyle: 'line'
            },
            metadata: {
                priority: 'high',
                category: 'positioning'
            }
        },

        eradicatingSalvo: {
            name: "Eradicating Salvo",
            description: "Soak mechanic - missiles that must hit 5+ players or raid takes damage",
            events: {
                cast: {
                    spellId: 1219531,
                    eventType: 'cast',
                    castTime: 5000,
                    description: "5 sec cast - The Plexus Sentinel targets a player to be purged, firing two missiles in quick succession",
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#4ECDC4',
                        text: 'Eradicating Salvo',
                        priority: 2
                    }
                },
                soakDamage: {
                    spellId: 1219611,
                    eventType: 'damage',
                    description: "Each missile inflicts 85728368 Arcane damage split evenly between players within 6 yards",
                    damage: {
                        amount: 85728368,
                        school: 'Arcane',
                        splitDamage: true
                    },
                    triggeredBy: 1219531,
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'reactive'
                    },
                    display: {
                        color: '#4ECDC4',
                        text: 'Salvo Hit',
                        priority: 1
                    }
                },
                failureDamage: {
                    spellId: 1229387,
                    eventType: 'damage',
                    description: "If a missile fails to hit at least 5 players, it instead inflicts 16864597 Arcane damage to all players",
                    damage: {
                        amount: 16864597,
                        school: 'Arcane'
                    },
                    triggeredBy: 1219531,
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'reactive'
                    },
                    display: {
                        color: '#E74C3C',
                        text: 'Salvo Fail',
                        priority: 1
                    }
                }
            },
            display: {
                primaryColor: '#4ECDC4',
                chartStyle: 'area'
            },
            patterns: {
                fullSequence: ['cast', 'soakDamage'],
                castEvents: ['cast'],
                damageEvents: ['soakDamage', 'failureDamage'],
                defensiveTimings: ['cast', 'soakDamage', 'failureDamage']
            },
            metadata: {
                priority: 'high',
                category: 'raid'
            }
        },

        manifestMatrices: {
            name: "Manifest Matrices",
            description: "Targeted debuff creating area denial",
            events: {
                cast: {
                    spellId: 1219450,
                    eventType: 'cast',
                    castTime: 2000,
                    description: "2 sec cast - The Plexus Sentinel fires Arcane energy into players",
                    notes: "Targeted on 4 players, area denial drop outside of raid",
                    usageHints: {
                        plotImportance: 'secondary',
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#9B59B6',
                        text: 'Manifest Matrices',
                        priority: 3
                    }
                },
                debuffDamage: {
                    spellId: 1226752,
                    eventType: 'damageTick',
                    description: "inflicting 1616191 Arcane damage every 1 sec for 6 sec. Upon expiration, a Displacement Matrix is created",
                    damage: {
                        amount: 1616191,
                        school: 'Arcane'
                    },
                    duration: 6000,
                    tickInterval: 1000,
                    triggeredBy: 1219450,
                    usageHints: {
                        plotImportance: 'detail',
                        defensiveTiming: 'during'
                    }
                }
            },
            display: {
                primaryColor: '#9B59B6',
                chartStyle: 'marker'
            },
            patterns: {
                fullSequence: ['cast', 'debuffDamage'],
                defensiveTimings: ['cast']
            },
            metadata: {
                priority: 'medium',
                category: 'positioning'
            }
        },

        obliterationArcanocannon: {
            name: "Obliteration Arcanocannon",
            description: "Tank buster with vulnerability debuff",
            events: {
                cast: {
                    spellId: 1219263,
                    eventType: 'cast',
                    castTime: 6000,
                    description: "The Plexus Sentinel marks its current target, then fires an arcane charge",
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#F39C12',
                        text: 'Obliteration Cast',
                        priority: 2
                    }
                },
                damage: {
                    spellId: 1219346,
                    eventType: 'damage',
                    description: "inflicts 26702279 Arcane damage to players within 10 yards, and 25296896 Arcane damage to all other players",
                    damage: {
                        amount: 26702279,
                        school: 'Arcane'
                    },
                    triggeredBy: 1219263,
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'reactive'
                    },
                    display: {
                        color: '#E67E22',
                        text: 'Obliteration Hit',
                        priority: 1
                    }
                },
                vulnerabilityDebuff: {
                    spellId: 1219263,
                    eventType: 'debuffApply',
                    description: "The impact causes the primary target to take 1000% damage from Obliteration Arcanocannon for 45 sec",
                    duration: 45000,
                    aura: {
                        stackable: false,
                        dispellable: false
                    },
                    usageHints: {
                        plotImportance: 'secondary',
                        defensiveTiming: 'reactive'
                    }
                }
            },
            display: {
                primaryColor: '#F39C12',
                chartStyle: 'line'
            },
            patterns: {
                fullSequence: ['cast', 'damage', 'vulnerabilityDebuff'],
                defensiveTimings: ['cast', 'damage']
            },
            metadata: {
                priority: 'high',
                category: 'tank'
            }
        },

        protocolPurge: {
            name: "Protocol: Purge",
            description: "Boss relocates and activates atomizer wall",
            events: {
                cast1: {
                    spellId: 1220489,
                    eventType: 'cast',
                    castTime: 5000,
                    description: "5 sec cast - The Plexus Sentinel relocates, pushing players away and activating the Arcanomatrix Atomizer",
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#2ECC71',
                        text: 'Protocol: Purge',
                        verticalAlign: 'bottom',
                        y: 100,
                        priority: 1
                    }
                },
                cast2: {
                    spellId: 1220555,
                    eventType: 'cast',
                    castTime: 5000,
                    description: "Alternative cast ID for Protocol: Purge",
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'proactive'
                    }
                },
                cast3: {
                    spellId: 1220553,
                    eventType: 'cast',
                    castTime: 5000,
                    description: "Alternative cast ID for Protocol: Purge",
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'proactive'
                    }
                },
                damage: {
                    spellId: 1224305,
                    eventType: 'damage',
                    description: "Damage from Protocol: Purge",
                    usageHints: {
                        plotImportance: 'secondary',
                        defensiveTiming: 'reactive'
                    }
                }
            },
            display: {
                primaryColor: '#2ECC71',
                chartStyle: 'background'
            },
            patterns: {
                castEvents: ['cast1', 'cast2', 'cast3'],
                damageEvents: ['damage'],
                defensiveTimings: ['cast1', 'cast2', 'cast3']
            },
            metadata: {
                priority: 'high',
                category: 'positioning'
            }
        },

        atomize: {
            name: "Atomize",
            description: "Damage from the atomizer wall",
            events: {
                damage: {
                    spellId: 1219223,
                    eventType: 'damage',
                    description: "The Arcanomatrix Atomizer inflicts 49891099 Arcane Damage to players passing through the Sieve",
                    damage: {
                        amount: 49891099,
                        school: 'Arcane'
                    },
                    notes: "Damage from the wall, mitigated by using extra action button to phase through",
                    usageHints: {
                        plotImportance: 'detail'
                    },
                    display: {
                        color: '#95A5A6',
                        text: 'Atomize',
                        priority: 0
                    }
                }
            },
            display: {
                primaryColor: '#95A5A6',
                chartStyle: 'marker'
            },
            metadata: {
                priority: 'medium',
                category: 'positioning'
            }
        },

        displacementMatrix: {
            name: "Displacement Matrix",
            description: "Area denial mines that teleport and stun",
            events: {
                explosion: {
                    spellId: 1218626,
                    eventType: 'damage',
                    description: "The Displacement Matrix detonates when touched, inflicting 5762071 Arcane damage and stunning players within 8 yards",
                    damage: {
                        amount: 5762071,
                        school: 'Arcane'
                    },
                    usageHints: {
                        plotImportance: 'detail'
                    }
                },
                stun: {
                    spellId: 1218625,
                    eventType: 'debuffApply',
                    description: "Stun from displacement matrix explosion",
                    notes: "Stun from 1218626",
                    triggeredBy: 1218626,
                    aura: {
                        stackable: false,
                        dispellable: true
                    },
                    usageHints: {
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'positioning'
            }
        },

        energyCutter: {
            name: "Energy Cutter",
            description: "Rotating beam of arcane energy",
            events: {
                damage: {
                    spellId: 1218668,
                    eventType: 'damage',
                    description: "A rotating beam of arcane energy that inflicts 7729607 Arcane damage to players in the area",
                    damage: {
                        amount: 7729607,
                        school: 'Arcane'
                    },
                    usageHints: {
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'positioning'
            }
        },

        potentManaResidue: {
            name: "Potent Mana Residue",
            description: "Ground effect slowing and damaging players",
            events: {
                damage: {
                    spellId: 1219354,
                    eventType: 'damageTick',
                    description: "Residual energy slows players in the area by 50% and inflicts 4924561 Arcane damage every 2 sec",
                    damage: {
                        amount: 4924561,
                        school: 'Arcane'
                    },
                    tickInterval: 2000,
                    usageHints: {
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'positioning'
            }
        },

        poweredAutomaton: {
            name: "Powered Automaton",
            description: "Periodic arcane energy emission",
            events: {
                cast: {
                    spellId: 1223364,
                    eventType: 'cast',
                    description: "The Plexus Sentinel periodically emits arcing energy, inflicting 3653996 Arcane damage to the target and up to 5 players within 20 yards",
                    damage: {
                        amount: 3653996,
                        school: 'Arcane'
                    },
                    usageHints: {
                        plotImportance: 'detail'
                    }
                },
                damage: {
                    spellId: 1219687,
                    eventType: 'damage',
                    description: "The Plexus Sentinel periodically emits arcing energy, inflicting 3653996 Arcane damage to the target and up to 5 players within 20 yards",
                    damage: {
                        amount: 3653996,
                        school: 'Arcane'
                    },
                    triggeredBy: 1223364,
                    usageHints: {
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'raid'
            }
        },

        purgingLightning: {
            name: "Purging Lightning",
            description: "Stacking damage during shield phase",
            events: {
                damage: {
                    spellId: 1233110,
                    eventType: 'damageTick',
                    description: "The Plexus Sentinel continuously channels arcane lightning through its chassis, inflicting 386480 Arcane damage to all players with each cast. Each cast empowers the chassis, increasing damage of subsequent casts by 25%. This effect stacks.",
                    damage: {
                        amount: 386480,
                        school: 'Arcane'
                    },
                    usageHints: {
                        plotImportance: 'secondary',
                        defensiveTiming: 'during'
                    }
                }
            },
            metadata: {
                priority: 'medium',
                category: 'raid'
            }
        },

        staticLightning: {
            name: "Static Lightning",
            description: "Environmental lightning damage",
            events: {
                cast: {
                    spellId: 1234699,
                    eventType: 'cast',
                    description: "Static Lightning cast event",
                    usageHints: {
                        plotImportance: 'detail'
                    }
                },
                damage: {
                    spellId: 1242310,
                    eventType: 'damage',
                    description: "The Great Exhaust rains lightning down when activated, inflicting 69 Nature damage to players in a 0 yard radius",
                    damage: {
                        amount: 69,
                        school: 'Nature'
                    },
                    usageHints: {
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'positioning'
            }
        }
    },
    metadata: {
        raidTier: "Manaforge Omega"
    }
};
