import type { EnhancedEncounterData } from '../types';

export const LoomitharEncounter: EnhancedEncounterData = {
    name: "Loom'ithar",
    encounterId: 3131,
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#E74C3C',
                        text: 'Arcane Outrage',
                        priority: 2
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
                        plotImportance: 'secondary'
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
                        plotImportance: 'detail'
                    }
                },
                finalExplosion: {
                    spellId: 1243908,
                    eventType: 'damageBurst',
                    duration: 1000,
                    description: "Single explosion at the end of the spread mechanic",
                    damage: {
                        amount: 4800000,
                        school: 'Arcane'
                    },
                    notes: "Single explosion at the end of the spread mechanic (4.8M unmitigated)",
                    triggeredBy: 1227784,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#C0392B',
                        text: 'Outrage Explosion',
                        priority: 1
                    }
                }
            },
            display: {
                primaryColor: '#E74C3C',
                chartStyle: 'area'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#F39C12',
                        text: 'Piercing Strand',
                        priority: 2
                    }
                },
                castAlternate: {
                    spellId: 1237212,
                    eventType: 'cast',
                    description: "Alternative cast event for Piercing Strand",
                    usageHints: {
                        defensiveTiming: 'proactive',
                        plotImportance: 'primary'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#E67E22',
                        text: 'Strand Hit',
                        priority: 1
                    }
                },
                vulnerabilityDebuff: {
                    spellId: 1227263,
                    eventType: 'debuffApply',
                    description: "increasing damage taken from Piercing Strand by 1000% for 45 sec",
                    duration: 45000,
                    aura: {
                        stackable: false,
                        dispellable: false
                    },
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'secondary'
                    }
                }
            },
            display: {
                primaryColor: '#F39C12',
                chartStyle: 'line'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#27AE60',
                        text: 'Writhing Wave',
                        priority: 2
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
                        plotImportance: 'secondary'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#2ECC71',
                        text: 'Wave Hit',
                        priority: 1
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
                        plotImportance: 'secondary'
                    }
                }
            },
            display: {
                primaryColor: '#27AE60',
                chartStyle: 'area'
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
                        plotImportance: 'secondary'
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
                        plotImportance: 'detail'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#9B59B6',
                        text: 'Pylon Soak',
                        priority: 2
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
                        plotImportance: 'secondary'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#8E44AD',
                        text: 'Excess Nova',
                        priority: 1
                    }
                }
            },
            display: {
                primaryColor: '#9B59B6',
                chartStyle: 'line'
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
                        plotImportance: 'secondary'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#16A085',
                        text: 'Lair Weaving',
                        priority: 2
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#1ABC9C',
                        text: 'Tangle Hit',
                        priority: 1
                    }
                }
            },
            display: {
                primaryColor: '#16A085',
                chartStyle: 'marker'
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
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#D35400',
                        text: 'Living Silk',
                        priority: 2
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
                        plotImportance: 'secondary'
                    }
                },
                explosion: {
                    spellId: 1226366,
                    eventType: 'damageBurst',
                    description: "Then, it releases the energy in a massive explosion inflicting 129345416 Arcane damage to players within 45 yards",
                    damage: {
                        amount: 129345416,
                        school: 'Arcane'
                    },
                    triggeredBy: 1226395,
                    usageHints: {
                        defensiveTiming: 'reactive',
                        plotImportance: 'primary'
                    },
                    display: {
                        color: '#E67E22',
                        text: 'Silk Explosion',
                        priority: 1
                    }
                },
                groundEffect: {
                    spellId: 1226366,
                    eventType: 'damageTick',
                    description: "Tendrils of arcane silk inflict 6464762 Nature damage every second and reduce movement speed by 25%",
                    damage: {
                        amount: 6464762,
                        school: 'Nature'
                    },
                    notes: "Stepping in webs, avoidable",
                    usageHints: {
                        defensiveTiming: 'during',
                        plotImportance: 'detail'
                    }
                }
            },
            display: {
                primaryColor: '#D35400',
                chartStyle: 'area'
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
                        plotImportance: 'detail'
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
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'positioning'
            }
        },

        silkBlast: {
            name: "Silk Blast",
            description: "Loom'ithar's primary attack",
            events: {
                damage: {
                    spellId: 1231403,
                    eventType: 'damage',
                    description: "Loom'ithar primary attack launches silk that inflicts Physical damage to its current target",
                    damage: {
                        school: 'Physical'
                    },
                    usageHints: {
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'tank'
            }
        }
    },

    phases: [
        {
            name: "Phase 1",
            mechanics: ["piercingStrand", "lairWeaving", "infusionTether", "primalSpellstorm", "silkBlast"],
            triggers: { healthPercent: 100 }
        },
        {
            name: "Phase 2", 
            mechanics: ["arcaneOutrage", "arcaneOverflow", "writhingWave", "infusionPylons", "primalSpellstorm", "arcaneIchor", "silkBlast"],
            triggers: { healthPercent: 50 }
        }
    ],

    metadata: {
        raidTier: "Manaforge Omega",
        releaseDate: "2024-09-10"
    }
};
