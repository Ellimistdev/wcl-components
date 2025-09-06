import type { EnhancedEncounterData } from '../types';

export const SoulbinderNaazindhriEncounter: EnhancedEncounterData = {
    name: "Soulbinder Naazindhri",
    encounterId: 3130,
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
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#8E44AD',
                        text: 'Arcane Expulsion',
                        priority: 2
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
                        defensiveTiming: 'reactive'
                    },
                    display: {
                        color: '#8E44AD',
                        text: 'Expulsion Hit',
                        priority: 1
                    }
                },
                persistentDamage: {
                    spellId: 1242088,
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
                        defensiveTiming: 'during'
                    }
                }
            },
            display: {
                primaryColor: '#8E44AD',
                chartStyle: 'area'
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
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#E74C3C',
                        text: 'Mystic Lash',
                        priority: 2
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
                        defensiveTiming: 'reactive'
                    },
                    display: {
                        color: '#C0392B',
                        text: 'Lash DoT',
                        priority: 1
                    }
                },
                instantDamage: {
                    spellId: 1224025,
                    eventType: 'damage',
                    description: "Alternative instant damage from Mystic Lash",
                    damage: {
                        amount: 6605300,
                        school: 'Arcane'
                    },
                    triggeredBy: 1241100,
                    usageHints: {
                        plotImportance: 'primary',
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
                        defensiveTiming: 'reactive'
                    }
                }
            },
            display: {
                primaryColor: '#E74C3C',
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
                        defensiveTiming: 'reactive'
                    },
                    display: {
                        color: '#F39C12',
                        text: 'Soulfray Orb',
                        priority: 1
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
                        defensiveTiming: 'reactive'
                    }
                },
                alternateOrb: {
                    spellId: 1227279,
                    eventType: 'damage',
                    description: "Alternative Soulfray Annihilation event",
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'reactive'
                    }
                }
            },
            display: {
                primaryColor: '#F39C12',
                chartStyle: 'marker'
            },
            patterns: {
                fullSequence: ['orbDamage', 'vulnerabilityDebuff'],
                defensiveTimings: ['orbDamage', 'alternateOrb']
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
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#3498DB',
                        text: 'Soulfire Cast',
                        priority: 2
                    }
                },
                instantCast: {
                    spellId: 1249065,
                    eventType: 'cast',
                    description: "Alternative instant cast version of Soulfire Convergence",
                    usageHints: {
                        plotImportance: 'primary',
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
                        defensiveTiming: 'during'
                    },
                    display: {
                        color: '#2980B9',
                        text: 'Soulfire DoT',
                        priority: 1
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
                        defensiveTiming: 'reactive'
                    }
                }
            },
            display: {
                primaryColor: '#3498DB',
                chartStyle: 'area'
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

        soulCalling: {
            name: "Soul Calling",
            description: "Activates chambers and transforms souls",
            events: {
                cast: {
                    spellId: 1225582,
                    eventType: 'cast',
                    castTime: 3000,
                    description: "3 sec cast - The Soulbinder Naazindhri activates chambers throughout the room, transforming unbound souls within each chamber to join the Shadowguard",
                    usageHints: {
                        plotImportance: 'secondary',
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#9B59B6',
                        text: 'Soul Calling',
                        priority: 3
                    }
                }
            },
            display: {
                primaryColor: '#9B59B6',
                chartStyle: 'background'
            },
            metadata: {
                priority: 'medium',
                category: 'raid'
            }
        },

        arcaneEnergy: {
            name: "Arcane Energy",
            description: "Residual energy pools",
            events: {
                damage: {
                    spellId: 1242086,
                    eventType: 'damageTick',
                    description: "Residual energy inflicts 3372919 Arcane damage every 1 sec to players within the area",
                    damage: {
                        amount: 3372919,
                        school: 'Arcane'
                    },
                    tickInterval: 1000,
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

        arcaneSigils: {
            name: "Arcane Sigils",
            description: "Protective sigils on binding chambers",
            events: {
                cast1: {
                    spellId: 1246530,
                    eventType: 'cast',
                    description: "The Soulbinder Naazindhri enchants the Binding Chambers with dark sigils, protecting them from Soulfray Annihilation",
                    usageHints: {
                        plotImportance: 'detail'
                    }
                },
                cast2: {
                    spellId: 1246531,
                    eventType: 'cast',
                    description: "Alternative Arcane Sigils cast event",
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

        essenceImplosion: {
            name: "Essence Implosion",
            description: "Binding chamber explosion",
            events: {
                implosion: {
                    spellId: 1227848,
                    eventType: 'cast',
                    description: "Big raid damage and ticking DoT based on how many machines exploded",
                    damage: {
                        school: 'Arcane'
                    },
                    notes: "Damage scales with number of remaining canisters",
                    usageHints: {
                        plotImportance: 'primary',
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#8E44AD',
                        text: 'Essence Implosion',
                        priority: 1
                    }
                },
                damage: {
                    spellId: 1227848,
                    eventType: 'damage',
                    description: "The Binding Chamber expires and bursts outward, inflicting 1405383 Arcane damage",
                    damage: {
                        amount: 1405383,
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
                        defensiveTiming: 'proactive'
                    },
                    display: {
                        color: '#34495E',
                        text: 'Voidblade Ambush',
                        priority: 3
                    }
                },
                damage: {
                    spellId: 1227051,
                    eventType: 'damageTick',
                    description: "delivering a devastating strike infused with Shadow energy for 30 sec to all players within the impact area",
                    damage: {
                        amount: 843000,
                        school: 'Shadow'
                    },
                    duration: 30000,
                    tickInterval: 1000,
                    triggeredBy: 1227048,
                    notes: "Debuff of 1227048. 843k/s for 30s",
                    usageHints: {
                        plotImportance: 'secondary',
                        defensiveTiming: 'reactive'
                    }
                }
            },
            display: {
                primaryColor: '#34495E',
                chartStyle: 'marker'
            },
            patterns: {
                fullSequence: ['cast', 'damage'],
                defensiveTimings: ['cast']
            },
            metadata: {
                priority: 'medium',
                category: 'raid'
            }
        },

        voidBurst: {
            name: "Void Burst",
            description: "Shadowguard Mage spell",
            events: {
                cast: {
                    spellId: 1252952,
                    eventType: 'cast',
                    castTime: 3000,
                    description: "3 sec cast - The caster forth a burst of Void energy",
                    notes: "Cast by Shadowguard Mage add",
                    usageHints: {
                        plotImportance: 'detail'
                    }
                },
                damage: {
                    spellId: 1227052,
                    eventType: 'damageTick',
                    description: "inflicting 2951304 Shadow damage and additional 1405383 Shadow damage every 1 sec for 15 sec to target player",
                    damage: {
                        amount: 2951304,
                        school: 'Shadow'
                    },
                    duration: 15000,
                    tickInterval: 1000,
                    triggeredBy: 1252952,
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

        voidResonance: {
            name: "Void Resonance",
            description: "Phaseblade damage amplification",
            events: {
                buff: {
                    spellId: 1242018,
                    eventType: 'buffApply',
                    description: "The Phaseblade gains power over time, increasing its damage by 7%. This effect stacks",
                    notes: "Cast by Shadowguard Phaseblade add every 8s",
                    aura: {
                        stackable: true,
                        dispellable: false
                    },
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

        phaseBlades: {
            name: "Phase Blades",
            description: "Shadowguard Phaseblade attack",
            events: {
                damage: {
                    spellId: 1235246,
                    eventType: 'damage',
                    description: "The Shadowguard Phaseblade sears the target inflicting 702692 Shadow damage. The power of Void that scatters after impact jumps between all players, inflicting 702692 Shadow damage",
                    damage: {
                        amount: 702692,
                        school: 'Shadow'
                    },
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

        shatterpulse: {
            name: "Shatterpulse",
            description: "Sigil destruction effect",
            events: {
                damage: {
                    spellId: 1250008,
                    eventType: 'absorb',
                    description: "A shattering Arcane Sigil sends out a pulse of energy, applying a 4634199 healing absorb shield to all players",
                    damage: {
                        amount: 4634199,
                        school: 'Arcane'
                    },
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

        spellburn: {
            name: "Spellburn",
            description: "Periodic arcane radiation",
            events: {
                damage: {
                    spellId: 1240763,
                    eventType: 'damageTick',
                    description: "The Soulbinder Naazindhri radiates Arcane energy, inflicting 1124306 Arcane damage to all players every 2 sec",
                    damage: {
                        amount: 1124306,
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
                category: 'raid'
            }
        },

        soulweave: {
            name: "Soulweave",
            description: "Soul transformation process",
            events: {
                cast1: {
                    spellId: 1219040,
                    eventType: 'channelStart',
                    description: "The Unbound Soul is slowly wrapped in silk bindings, transforming into a member of the Shadowguard",
                    usageHints: {
                        plotImportance: 'detail'
                    }
                },
                cast2: {
                    spellId: 1239988,
                    eventType: 'channelStart',
                    description: "Alternative Soulweave cast event",
                    usageHints: {
                        plotImportance: 'detail'
                    }
                },
                cast3: {
                    spellId: 1219053,
                    eventType: 'channelStart',
                    description: "Alternative Soulweave cast event",
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

        tsunamiOfArcane: {
            name: "Tsunami of Arcane",
            description: "Primary target strikes",
            events: {
                damage: {
                    spellId: 1245422,
                    eventType: 'damageTick',
                    description: "The Soulbinder angrily strikes her primary target, inflicting 0 Arcane damage every 5.2 sec for until canceled to target. Player who hit by it increases Mystic Lash damage they taken by 40% and Physical damage by 15% for 45 sec",
                    damage: {
                        amount: 0,
                        school: 'Arcane'
                    },
                    tickInterval: 5200,
                    usageHints: {
                        plotImportance: 'detail'
                    }
                }
            },
            metadata: {
                priority: 'low',
                category: 'tank'
            }
        },

        manaMotivation: {
            name: "Mana Motivation",
            description: "Casting speed increase",
            events: {
                buff: {
                    spellId: 1234871,
                    eventType: 'buffApply',
                    description: "Increasing casting speed by 30%",
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
                category: 'raid'
            }
        }
    },
    phases: [
    {
        name: "Phase 1: Canister Cleanup",
        mechanics: [
            "soulCalling",
            "soulfrayAnnihilation", 
            "mysticLash",
            "soulfireConvergence",
            "arcaneExpulsion"
        ],
        description: "Break 6 canisters with Soulfray Annihilation orbs"
    },
    {
        name: "Intermission: Add Wave", 
        mechanics: [
            "essenceImplosion",
            "shadowguardAdds"
        ],
        description: "Survive Essence Implosion and kill all spawned adds"
    }
],
    metadata: {
        raidTier: "Manaforge Omega"
    }
};
