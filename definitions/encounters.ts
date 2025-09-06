import type { SpellEvent, Mechanic, EncounterData, SpellEventType } from './types';

// Plexus Sentinel Encounter
const PlexusSentinelEncounter: EncounterData = {
    name: "Plexus Sentinel",
    encounterId: 2900, // You'll need to add the actual ID
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
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
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
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
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
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
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
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
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
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
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
                        timelineRelevant: false,
                        defensiveTiming: 'during'
                    }
                }
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
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
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
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                },
                vulnerabilityDebuff: {
                    spellId: 1219263, // Same as cast
                    eventType: 'debuffApply',
                    description: "The impact causes the primary target to take 1000% damage from Obliteration Arcanocannon for 45 sec",
                    duration: 45000,
                    aura: {
                        stackable: false,
                        dispellable: false
                    },
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
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
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
                    }
                },
                cast2: {
                    spellId: 1220555,
                    eventType: 'cast',
                    castTime: 5000,
                    description: "Alternative cast ID for Protocol: Purge",
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
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
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
                    }
                },
                damage: {
                    spellId: 1224305,
                    eventType: 'damage',
                    description: "Damage from Protocol: Purge",
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
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

        // Environmental/Add mechanics
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
                        plotImportance: 'detail',
                        timelineRelevant: false
                    }
                }
            },
            metadata: {
                priority: 'medium',
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
                        plotImportance: 'detail',
                        timelineRelevant: false
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
        raidTier: "Nerub-ar Palace"
    }
};

// Soulbinder Naazindhri Encounter  
const SoulbinderNaazindhriEncounter: EncounterData = {
    name: "Soulbinder Naazindhri",
    encounterId: 2901,
    mechanics: {
        arcaneExpulsion: {
            name: "Arcane Expulsion",
            description: "Raid-wide knockback with persistent damage",
            events: {
                cast: {
                    spellId: 1242088,
                    eventType: 'cast',
                    castTime: 4000,
                    description: "4 sec cast - The Soulbinder Naazindhri unleashes a devastating shockwave",
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
                    }
                },
                initialDamage: {
                    spellId: 1242071,
                    eventType: 'damage',
                    description: "inflicting 3232381 Arcane damage and knocking all players back with explosive force",
                    damage: {
                        amount: 3232381,
                        school: 'Arcane'
                    },
                    triggeredBy: 1242088,
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                },
                persistentDamage: {
                    spellId: 1242088, // Same as cast
                    eventType: 'damageTick',
                    description: "additional 843230 Arcane damage every 1 sec for 15 sec",
                    damage: {
                        amount: 843230,
                        school: 'Arcane'
                    },
                    duration: 15000,
                    tickInterval: 1000,
                    triggeredBy: 1242088,
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: false,
                        defensiveTiming: 'during'
                    }
                }
            },
            patterns: {
                fullSequence: ['cast', 'initialDamage', 'persistentDamage'],
                defensiveTimings: ['cast', 'initialDamage']
            },
            metadata: {
                priority: 'high',
                category: 'raid'
            }
        },

        mysticLash: {
            name: "Mystic Lash",
            description: "Tank ability with stacking vulnerability",
            events: {
                cast: {
                    spellId: 1241100,
                    eventType: 'cast',
                    castTime: 2000,
                    description: "2 sec cast - The Soulbinder Naazindhri lashes out at her current target",
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
                    }
                },
                damage: {
                    spellId: 1237629,
                    eventType: 'damageTick',
                    description: "inflicting 6605300 Arcane damage every 1 sec for 5 sec",
                    damage: {
                        amount: 6605300,
                        school: 'Arcane'
                    },
                    duration: 5000,
                    tickInterval: 1000,
                    triggeredBy: 1241100,
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                },
                vulnerabilityDebuff: {
                    spellId: 1224025,
                    eventType: 'debuffApply',
                    description: "The blow brands the victim, increasing the damage of Mystic Lash by 40% and Physical damage by 15% for 45 sec. This effect stacks.",
                    duration: 45000,
                    aura: {
                        stackable: true,
                        dispellable: false
                    },
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
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

        soulfrayAnnihilation: {
            name: "Soulfray Annihilation",
            description: "Orb mechanic with vulnerability debuff",
            events: {
                orbDamage: {
                    spellId: 1227276,
                    eventType: 'damage',
                    description: "The Soulbinder Naazindhri unleashes an orb in the direction of randomly targeted players, inflicting 11250162 Arcane damage",
                    damage: {
                        amount: 11250162,
                        school: 'Arcane'
                    },
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                },
                vulnerabilityDebuff: {
                    spellId: 1241357,
                    eventType: 'debuffApply',
                    description: "causing them to take 15% increased damage for 20 sec",
                    duration: 20000,
                    aura: {
                        stackable: false,
                        dispellable: false
                    },
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
            },
            patterns: {
                fullSequence: ['orbDamage', 'vulnerabilityDebuff'],
                defensiveTimings: ['orbDamage']
            },
            metadata: {
                priority: 'high',
                category: 'raid'
            }
        },

        soulfireConvergence: {
            name: "Soulfire Convergence",
            description: "Multi-target DoT with orb explosion",
            events: {
                cast: {
                    spellId: 1225616,
                    eventType: 'cast',
                    castTime: 2000,
                    description: "2 sec cast - The Soulbinder Naazindhri courses arcane energy through the bodies of several players",
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
                    }
                },
                damage: {
                    spellId: 1249065,
                    eventType: 'damageTick',
                    description: "inflicting 2108075 Arcane damage every 1 sec for 5 sec",
                    damage: {
                        amount: 2108075,
                        school: 'Arcane'
                    },
                    duration: 5000,
                    tickInterval: 1000,
                    triggeredBy: 1225616,
                    usageHints: {
                        plotImportance: 'primary',
                        timelineRelevant: true,
                        defensiveTiming: 'during'
                    }
                },
                orbDebuff: {
                    spellId: 1226827,
                    eventType: 'debuffApply',
                    description: "Soulrend Orb - Inflicting 2248613 Arcane damage every 5.2 sec, reducing movement speed by 30% and haste by 25%",
                    damage: {
                        amount: 2248613,
                        school: 'Arcane'
                    },
                    duration: 15000,
                    tickInterval: 5200,
                    triggeredBy: 1249065,
                    aura: {
                        stackable: false,
                        dispellable: true
                    },
                    notes: "15s debuff from getting hit by the orbs from Soulfire Convergence",
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
            },
            patterns: {
                fullSequence: ['cast', 'damage', 'orbDebuff'],
                defensiveTimings: ['cast', 'damage']
            },
            metadata: {
                priority: 'high',
                category: 'raid'
            }
        },

        // Add mechanics
        voidbladeAmbush: {
            name: "Voidblade Ambush",
            description: "Shadowguard Assassin teleport attack",
            events: {
                cast: {
                    spellId: 1227048,
                    eventType: 'cast',
                    description: "The Shadowguard Assassin targets a random player, vanishing into the shadows then reappearing behind them",
                    notes: "Cast by Shadowguard Assassin add, cast event for 1227051",
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: true,
                        defensiveTiming: 'proactive'
                    }
                },
                damage: {
                    spellId: 1227051,
                    eventType: 'damageTick',
                    description: "delivering a devastating strike infused with Shadow energy for 30 sec to all players within the impact area",
                    damage: {
                        amount: 843000, // Calculated from "843k/s for 30s"
                        school: 'Shadow'
                    },
                    duration: 30000,
                    tickInterval: 1000,
                    triggeredBy: 1227048,
                    notes: "Debuff of 1227048. 843k/s for 30s",
                    usageHints: {
                        plotImportance: 'secondary',
                        timelineRelevant: true,
                        defensiveTiming: 'reactive'
                    }
                }
            },
            patterns: {
                fullSequence: ['cast', 'damage'],
                defensiveTimings: ['cast']
            },
            metadata: {
                priority: 'medium',
                category: 'raid'
            }
        }
    },
    metadata: {
        raidTier: "Nerub-ar Palace"
    }
};

// Loom'ithar Encounter (Updated with full data)
const LoomitharEncounter: EncounterData = {
    name: "Loom'ithar",
    encounterId: 2902,
    mechanics: {
        arcaneOutrage: {
            name: "Arcane Outrage",
            description: "Raid-wide spread mechanic with ticking damage followed by explosion",
            events: {
                beginCast: {
                    spellId: 1227782,
                    eventType: 'beginCast',
                    castTime: 2000,
                    description: "Begin cast event for Arcane Outrage",
                    notes: "Begin cast and cast event",
                    usageHints: {
                        defensiveTiming: 'proactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                cast: {
                    spellId: 1227784,
                    eventType: 'cast',
                    description: "Cast completion event",
                    notes: "Single cast event, duplicate of 1227782's cast event without the begin cast event",
                    triggeredBy: 1227782,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'secondary',
                        timelineRelevant: true
                    }
                },
                tickingDamage: {
                    spellId: 1227784,
                    eventType: 'damageTick',
                    duration: 5000,
                    description: "Ticking damage during spread mechanic",
                    damage: {
                        amount: 1454571,
                        school: 'Arcane'
                    },
                    notes: "Ticking damage during spread mechanic (1.5M/s unmitigated)",
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'detail',
                        timelineRelevant: false
                    }
                },
                finalExplosion: {
                    spellId: 1243908,
                    eventType: 'damageBurst',
                    duration: 1000,
                    description: "Single explosion at the end of the spread mechanic",
                    damage: {
                        amount: 4800000, // From notes: 4.8M unmitigated
                        school: 'Arcane'
                    },
                    notes: "Single explosion at the end of the spread mechanic (4.8M unmitigated)",
                    triggeredBy: 1227784,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                }
            },
            patterns: {
                fullSequence: ['beginCast', 'cast', 'tickingDamage', 'finalExplosion'],
                damageEvents: ['tickingDamage', 'finalExplosion'],
                castEvents: ['beginCast', 'cast'],
                defensiveTimings: ['beginCast', 'finalExplosion']
            },
            metadata: {
                phase: 1,
                priority: 'high',
                category: 'raid'
            }
        },

        piercingStrand: {
            name: "Piercing Strand",
            description: "Tank beam requiring tank swap",
            events: {
                cast: {
                    spellId: 1227263,
                    eventType: 'cast',
                    description: "Cast event for tank beam",
                    notes: "Tank beam (32M unmitigated)",
                    usageHints: {
                        defensiveTiming: 'proactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                castAlternate: {
                    spellId: 1237212,
                    eventType: 'cast',
                    description: "Alternative cast event for Piercing Strand",
                    usageHints: {
                        defensiveTiming: 'proactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                damage: {
                    spellId: 1227742,
                    eventType: 'damage',
                    description: "Actual beam damage",
                    damage: {
                        amount: 32323811,
                        school: 'Arcane'
                    },
                    triggeredBy: 1227263,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                vulnerabilityDebuff: {
                    spellId: 1227263, // Same as cast
                    eventType: 'debuffApply',
                    description: "increasing damage taken from Piercing Strand by 1000% for 45 sec",
                    duration: 45000,
                    aura: {
                        stackable: false,
                        dispellable: false
                    },
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'secondary',
                        timelineRelevant: true
                    }
                }
            },
            patterns: {
                fullSequence: ['cast', 'damage', 'vulnerabilityDebuff'],
                castEvents: ['cast', 'castAlternate'],
                damageEvents: ['damage'],
                defensiveTimings: ['cast', 'castAlternate', 'damage']
            },
            metadata: {
                category: 'tank',
                priority: 'high'
            }
        },

        writhingWave: {
            name: "Writhing Wave",
            description: "Phase 2 frontal cone soak mechanic",
            events: {
                beginCast: {
                    spellId: 1227227,
                    eventType: 'beginCast',
                    description: "Begin cast event for Writhing Wave",
                    notes: "Begin cast and cast event",
                    usageHints: {
                        defensiveTiming: 'proactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                cast: {
                    spellId: 1227226,
                    eventType: 'cast',
                    description: "Cast completion event",
                    notes: "Single cast event, duplicate of 1227227's cast event without the begin cast event",
                    triggeredBy: 1227227,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'secondary',
                        timelineRelevant: true
                    }
                },
                initialDamage: {
                    spellId: 1227140,
                    eventType: 'damage',
                    description: "Initial cone damage split among players",
                    damage: {
                        amount: 96971433,
                        school: 'Nature',
                        splitDamage: true
                    },
                    notes: "Frontal cone during p2 (100M split among players soaking)",
                    triggeredBy: 1227226,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                persistentDamage: {
                    spellId: 1227163,
                    eventType: 'damageTick',
                    duration: 13000,
                    description: "DoT from soaking the cone",
                    damage: {
                        amount: 13745701,
                        school: 'Nature'
                    },
                    notes: "Dot from soaking the cone (1.5M/s unmitigated)",
                    triggeredBy: 1227140,
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'secondary',
                        timelineRelevant: false
                    }
                }
            },
            patterns: {
                fullSequence: ['beginCast', 'cast', 'initialDamage', 'persistentDamage'],
                defensiveTimings: ['beginCast', 'initialDamage']
            },
            metadata: {
                phase: 2,
                priority: 'high',
                category: 'raid'
            }
        },

        arcaneOverflow: {
            name: "Arcane Overflow",
            description: "P2 unavoidable raid damage",
            events: {
                tickingDamage: {
                    spellId: 1231408,
                    eventType: 'damageTick',
                    description: "P2 raidwide ticking damage, unavoidable",
                    damage: {
                        amount: 852541,
                        school: 'Arcane'
                    },
                    notes: "P2 raidwide ticking damage, unavoidable (850K/s unmitigated)",
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'secondary',
                        timelineRelevant: false
                    }
                },
                actualDamage: {
                    spellId: 1231469,
                    eventType: 'damageTick',
                    duration: 1000,
                    description: "Actual damage event for Arcane Overflow",
                    notes: "Ticking damage during the entirety of p2 (853K/s unmitigated)",
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'detail',
                        timelineRelevant: false
                    }
                }
            },
            metadata: {
                phase: 2,
                priority: 'medium',
                category: 'raid'
            }
        },

        infusionPylons: {
            name: "Infusion Pylons",
            description: "P2 mechanic with beams that must be soaked",
            events: {
                beamDamage: {
                    spellId: 1250103,
                    eventType: 'damageTick',
                    description: "Players standing within the beam block its path, suffering 606071 Arcane damage and gaining an application of Hyper Infusion every 1 sec",
                    damage: {
                        amount: 606071,
                        school: 'Arcane'
                    },
                    tickInterval: 1000,
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                hyperInfusionDebuff: {
                    spellId: 1247045,
                    eventType: 'debuffApply',
                    description: "Exposure to Infusion Pylons causes the target to take 100% increased damage from Infusion Pylons for 45 sec. This effect stacks.",
                    duration: 45000,
                    aura: {
                        stackable: true,
                        dispellable: false
                    },
                    notes: "Stacking debuff from soaking pylons",
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'secondary',
                        timelineRelevant: true
                    }
                },
                excessNova: {
                    spellId: 1247029,
                    eventType: 'damage',
                    description: "The Infusion Pylons' beams trigger a burst of arcane energy from within Loom'ithar, inflicting 2101048 Arcane damage to all players",
                    damage: {
                        amount: 2101048,
                        school: 'Arcane'
                    },
                    notes: "Nuke from boss when beams from Infusion Pylons are not properly soaked (2.1M Unmitigated)",
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                }
            },
            patterns: {
                fullSequence: ['beamDamage', 'hyperInfusionDebuff', 'excessNova'],
                defensiveTimings: ['beamDamage', 'excessNova']
            },
            metadata: {
                phase: 2,
                priority: 'high',
                category: 'raid'
            }
        },

        infusionTether: {
            name: "Infusion Tether",
            description: "Players pulled to boss and tethered",
            events: {
                damage: {
                    spellId: 1238197,
                    eventType: 'damageTick',
                    description: "Loom'ithar pulls several players to its location, binding them with silken strands that inflict 452533 Arcane damage each second, growing in intensity over time",
                    damage: {
                        amount: 452533,
                        school: 'Arcane'
                    },
                    tickInterval: 1000,
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'secondary',
                        timelineRelevant: true
                    }
                }
            },
            metadata: {
                priority: 'medium',
                category: 'positioning'
            }
        },

        lairWeaving: {
            name: "Lair Weaving",
            description: "Collapsing ring of tangles with connecting lines",
            events: {
                cast: {
                    spellId: 1237272,
                    eventType: 'cast',
                    description: "Loom'ithar weaves a collapsing ring of Infused Tangles",
                    notes: "Lines connecting Infused Tangles (20M unmitigated & 8s stun)",
                    usageHints: {
                        defensiveTiming: 'proactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                damage: {
                    spellId: 1237307,
                    eventType: 'damage',
                    description: "inflict 20202382 Nature damage to players in their path and root them for 8 sec",
                    damage: {
                        amount: 20202382,
                        school: 'Nature'
                    },
                    notes: "Avoidable damage from touching the lines connecting the Infused Tangles (20M unmitigated)",
                    triggeredBy: 1237272,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                }
            },
            patterns: {
                fullSequence: ['cast', 'damage'],
                defensiveTimings: ['cast']
            },
            metadata: {
                priority: 'high',
                category: 'positioning'
            }
        },

        livingSilk: {
            name: "Living Silk",
            description: "Ground webs with absorption and explosion",
            events: {
                absorptionCast: {
                    spellId: 1226366,
                    eventType: 'channelStart',
                    description: "Loom'ithar inflicts 266671 Arcane damage to all players every 0.5 sec for 8 sec as it absorbs arcane energy",
                    notes: "Ground webs dropped by clearing Infused Tethers (6.5M/s unmitigated & 25% slow)",
                    usageHints: {
                        defensiveTiming: 'proactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                absorptionDamage: {
                    spellId: 1226395,
                    eventType: 'damageTick',
                    duration: 8000,
                    description: "Raidwide ticking damage whenever Loom'ithar absorbs energy",
                    damage: {
                        amount: 266671,
                        school: 'Arcane'
                    },
                    tickInterval: 500,
                    notes: "267k per 0.5s ticking damage",
                    triggeredBy: 1226366,
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'secondary',
                        timelineRelevant: false
                    }
                },
                explosion: {
                    spellId: 1226366, // Same as cast
                    eventType: 'damageBurst',
                    description: "Then, it releases the energy in a massive explosion inflicting 129345416 Arcane damage to players within 45 yards",
                    damage: {
                        amount: 129345416,
                        school: 'Arcane'
                    },
                    triggeredBy: 1226395,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary',
                        timelineRelevant: true
                    }
                },
                groundEffect: {
                    spellId: 1226366, // Same spell, different damage event
                    eventType: 'damageTick',
                    description: "Tendrils of arcane silk inflict 6464762 Nature damage every second and reduce movement speed by 25%",
                    damage: {
                        amount: 6464762,
                        school: 'Nature'
                    },
                    notes: "Stepping in webs, avoidable",
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'detail',
                        timelineRelevant: false
                    }
                }
            },
            patterns: {
                fullSequence: ['absorptionCast', 'absorptionDamage', 'explosion'],
                defensiveTimings: ['absorptionCast', 'explosion']
            },
            metadata: {
                priority: 'high',
                category: 'positioning'
            }
        },

        primalSpellstorm: {
            name: "Primal Spellstorm",
            description: "Swirlies throughout encounter",
            events: {
                damage: {
                    spellId: 1226877,
                    eventType: 'damage',
                    duration: 1000,
                    description: "Arcane energy rains down from the chamber above, inflicting 16161905 Arcane damage within 6 yards of the impact locations",
                    damage: {
                        amount: 16161905,
                        school: 'Arcane'
                    },
                    notes: "Swirlies present throughout the encounter (16M unmitigated)",
                    usageHints: {
                        plotImportance: 'detail',
                        timelineRelevant: false
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'positioning'
            }
        },

        arcaneIchor: {
            name: "Arcane Ichor",
            description: "Zone denial pools from boss wounds",
            events: {
                damage: {
                    spellId: 1243771,
                    eventType: 'damageTick',
                    description: "Ichor pours from Loom'ithar's wounds and inflicts 6464762 Arcane damage every 1 sec to players within its area",
                    damage: {
                        amount: 6464762,
                        school: 'Arcane'
                    },
                    notes: "100% Avoidable",
                    usageHints: {
                        plotImportance: 'detail',
                        timelineRelevant: false
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'positioning'
            }
        }
    },

    phases: [
        {
            name: "Phase 1",
            mechanics: ["arcaneOutrage", "piercingStrand", "lairWeaving", "infusionTether", "primalSpellstorm", "arcaneIchor"],
            triggers: { healthPercent: 100 }
        },
        {
            name: "Phase 2", 
            mechanics: ["arcaneOverflow", "piercingStrand", "writhingWave", "infusionPylons", "livingSilk", "primalSpellstorm", "arcaneIchor"],
            triggers: { healthPercent: 70 }
        }
    ],

    metadata: {
        raidTier: "Nerub-ar Palace",
        releaseDate: "2024-09-10"
    }
};

// Export all encounters and utility functions
export const ManaforgeOmegaEncounters = {
    PlexusSentinel: PlexusSentinelEncounter,
    SoulbinderNaazindhri: SoulbinderNaazindhriEncounter,
    Loomithar: LoomitharEncounter
};

// Enhanced lookup utilities for the converted data
export class ConvertedEncounterLookup {
    static getAllSpellIdsByEventType(encounters: typeof ManaforgeOmegaEncounters, eventType: SpellEventType): number[] {
        const spellIds: number[] = [];
        
        for (const encounter of Object.values(encounters)) {
            for (const mechanic of Object.values(encounter.mechanics)) {
                for (const event of Object.values(mechanic.events)) {
                    if (event.eventType === eventType) {
                        spellIds.push(event.spellId);
                    }
                }
            }
        }
        
        return [...new Set(spellIds)]; // Remove duplicates
    }
    
    static getDefensiveTimelineSpellIds(encounters: typeof ManaforgeOmegaEncounters) {
        const result = {
            proactiveCasts: [] as number[],
            reactiveCasts: [] as number[],
            duringCasts: [] as number[],
            damageEvents: [] as number[]
        };
        
        for (const encounter of Object.values(encounters)) {
            for (const mechanic of Object.values(encounter.mechanics)) {
                for (const event of Object.values(mechanic.events)) {
                    const spellId = event.spellId;
                    
                    if (event.usageHints?.defensiveTiming === 'proactive') {
                        result.proactiveCasts.push(spellId);
                    } else if (event.usageHints?.defensiveTiming === 'reactive') {
                        result.reactiveCasts.push(spellId);
                    } else if (event.usageHints?.defensiveTiming === 'during') {
                        result.duringCasts.push(spellId);
                    }
                    
                    if (['damage', 'damageBurst', 'damageTick'].includes(event.eventType)) {
                        result.damageEvents.push(spellId);
                    }
                }
            }
        }
        
        // Remove duplicates
        result.proactiveCasts = [...new Set(result.proactiveCasts)];
        result.reactiveCasts = [...new Set(result.reactiveCasts)];
        result.duringCasts = [...new Set(result.duringCasts)];
        result.damageEvents = [...new Set(result.damageEvents)];
        
        return result;
    }
    
    static findMechanicBySpellId(encounters: typeof ManaforgeOmegaEncounters, spellId: number): {
        encounter: string;
        mechanic: string;
        event: string;
        data: SpellEvent;
    } | null {
        for (const [encounterKey, encounter] of Object.entries(encounters)) {
            for (const [mechanicKey, mechanic] of Object.entries(encounter.mechanics)) {
                for (const [eventKey, event] of Object.entries(mechanic.events)) {
                    if (event.spellId === spellId) {
                        return {
                            encounter: encounterKey,
                            mechanic: mechanicKey,
                            event: eventKey,
                            data: event
                        };
                    }
                }
            }
        }
        return null;
    }
    
    static getMechanicsByCategory(encounters: typeof ManaforgeOmegaEncounters, category: string): Array<{
        encounter: string;
        mechanic: string;
        data: Mechanic;
    }> {
        const results: Array<{ encounter: string; mechanic: string; data: Mechanic }> = [];
        
        for (const [encounterKey, encounter] of Object.entries(encounters)) {
            for (const [mechanicKey, mechanic] of Object.entries(encounter.mechanics)) {
                if (mechanic.metadata?.category === category) {
                    results.push({
                        encounter: encounterKey,
                        mechanic: mechanicKey,
                        data: mechanic
                    });
                }
            }
        }
        
        return results;
    }
}

// Example usage for your DefensiveTimelines component
console.log("Proactive Cast Spell IDs:", 
    ConvertedEncounterLookup.getDefensiveTimelineSpellIds(ManaforgeOmegaEncounters).proactiveCasts
);

console.log("Tank Mechanics:", 
    ConvertedEncounterLookup.getMechanicsByCategory(ManaforgeOmegaEncounters, 'tank')
        .map(m => `${m.encounter}.${m.mechanic}`)
);
