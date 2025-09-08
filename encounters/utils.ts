import type { EncounterData, DisplayInfo, EnemyEntity, AbilityData } from './types';

export class EncounterDisplayLookup {
    static getDisplayInfoForSpellId(encounter: EncounterData, spellId: number): DisplayInfo | null {
        
        for (const entity of Object.values(encounter.entities)) {
            const allAbilities = [
                ...Object.values(entity.abilities.damage),
                ...Object.values(entity.abilities.buffs),
                ...Object.values(entity.abilities.casts)
            ];
            
            for (const ability of allAbilities) {
                if (ability.id === spellId && ability.display) {
                    return ability.display;
                }
            }
        }
        
        return null;
    }
    
    static generateReferenceCasts(encounter: EncounterData, importanceLevel: 'primary' | 'secondary' = 'primary'): Record<number, DisplayInfo> {
        const referenceCasts: Record<number, DisplayInfo> = {};
        
        for (const entity of Object.values(encounter.entities)) {
            const allAbilities = [
                ...Object.values(entity.abilities.damage),
                ...Object.values(entity.abilities.buffs),
                ...Object.values(entity.abilities.casts)
            ];
            
            for (const ability of allAbilities) {
                const isTimelineRelevant = ability.usageHints?.plotImportance === importanceLevel || 
                                         (importanceLevel === 'secondary' && ability.usageHints?.plotImportance === 'primary');
                
                if (ability.display && isTimelineRelevant) {
                    referenceCasts[ability.id] = ability.display;
                }
            }
        }
        
        return referenceCasts;
    }
}
