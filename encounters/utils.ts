import type { EnhancedEncounterData, EnhancedMechanic, EnhancedSpellEvent, DisplayInfo } from './types';

export class EncounterDisplayLookup {
    static getDisplayInfoForSpellId(encounter: EnhancedEncounterData, spellId: number): DisplayInfo | null {
        for (const mechanic of Object.values(encounter.mechanics)) {
            for (const event of Object.values(mechanic.events)) {
                if (event.spellId === spellId && event.display) {
                    return event.display;
                }
            }
        }
        return null;
    }
    
    static generateReferenceCasts(encounter: EnhancedEncounterData, importanceLevel: 'primary' | 'secondary' = 'primary'): Record<number, DisplayInfo> {
        const referenceCasts: Record<number, DisplayInfo> = {};
        
        for (const mechanic of Object.values(encounter.mechanics)) {
            for (const event of Object.values(mechanic.events)) {
                const isTimelineRelevant = event.usageHints?.plotImportance === importanceLevel || 
                                         (importanceLevel === 'secondary' && event.usageHints?.plotImportance === 'primary');
                
                if (event.display && isTimelineRelevant) {
                    referenceCasts[event.spellId] = event.display;
                }
            }
        }
        
        return referenceCasts;
    }
    
    static getDefensiveTimelineData(encounter: EnhancedEncounterData) {
        const result = {
            proactiveCasts: [] as number[],
            reactiveCasts: [] as number[],
            duringCasts: [] as number[],
            damageEvents: [] as number[]
        };
        
        for (const mechanic of Object.values(encounter.mechanics)) {
            for (const event of Object.values(mechanic.events)) {
                if (!event.usageHints?.plotImportance || event.usageHints.plotImportance === 'detail') {
                    continue;
                }
                
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
        
        return {
            proactiveCasts: [...new Set(result.proactiveCasts)],
            reactiveCasts: [...new Set(result.reactiveCasts)],
            duringCasts: [...new Set(result.duringCasts)],
            damageEvents: [...new Set(result.damageEvents)]
        };
    }

    static findMechanicBySpellId(encounter: EnhancedEncounterData, spellId: number): {
        mechanicKey: string;
        eventKey: string;
        mechanic: EnhancedMechanic;
        event: EnhancedSpellEvent;
    } | null {
        for (const [mechanicKey, mechanic] of Object.entries(encounter.mechanics)) {
            for (const [eventKey, event] of Object.entries(mechanic.events)) {
                if (event.spellId === spellId) {
                    return { mechanicKey, eventKey, mechanic, event };
                }
            }
        }
        return null;
    }
}
