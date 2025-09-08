import type { EncounterData } from '../types';

export const TestEncounter: EncounterData = {
    name: "Test Boss",
    encounterId: 1,
    
    entities: {
        testBoss: {
            id: 1,
            name: "Test Boss",
            type: 'main_boss',
            phases: [1],
            abilities: {
                damage: {
                    testAbility: {
                        id: 123456,
                        name: "Test Ability",
                        description: "A simple test ability for verification.",
                        damage: {
                            amount: 1000000,
                            school: 'Physical'
                        },
                        usageHints: {
                            defensiveTiming: 'reactive',
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#FF0000',
                            text: 'Test Hit',
                            priority: 1
                        }
                    }
                },
                buffs: {
                    testDebuff: {
                        id: 123457,
                        name: "Test Debuff",
                        description: "A test debuff that does nothing.",
                        duration: 10000,
                        aura: {
                            stackable: false,
                            dispellable: true
                        },
                        usageHints: {
                            plotImportance: 'secondary',
                            category: 'raid'
                        }
                    }
                },
                casts: {
                    testCast: {
                        id: 123458,
                        name: "Test Cast",
                        description: "A test cast ability.",
                        castTime: 3000,
                        usageHints: {
                            defensiveTiming: 'proactive',
                            plotImportance: 'primary',
                            category: 'raid'
                        },
                        display: {
                            color: '#00FF00',
                            text: 'Test Cast',
                            priority: 2
                        }
                    }
                }
            }
        }
    },
    
    phases: [
        {
            number: 1,
            name: "Test Phase",
            description: "A simple test phase.",
            type: 'normal',
            mechanics: ["testAbility"],
            activeEntities: ["testBoss"],
            triggers: {
                healthPercent: 100
            }
        }
    ],
    
    metadata: {
        raidTier: "Test Tier",
        bossNumber: 0,
        releaseDate: "2025-01-01",
        description: "A barebones test encounter for format verification.",
        strategy: "This is just a test encounter to verify the new format works correctly."
    }
};
