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
    
    static getDefensiveTimelineData(encounter: EncounterData) {
        const result = {
            proactiveCasts: [] as number[],
            reactiveCasts: [] as number[],
            duringCasts: [] as number[],
            damageEvents: [] as number[]
        };
        
        for (const entity of Object.values(encounter.entities)) {
            const allAbilities = [
                ...Object.values(entity.abilities.damage),
                ...Object.values(entity.abilities.buffs),
                ...Object.values(entity.abilities.casts)
            ];
            
            for (const ability of allAbilities) {
                if (!ability.usageHints?.plotImportance || ability.usageHints.plotImportance === 'detail') {
                    continue;
                }
                
                const spellId = ability.id;
                
                if (ability.usageHints?.defensiveTiming === 'proactive') {
                    result.proactiveCasts.push(spellId);
                } else if (ability.usageHints?.defensiveTiming === 'reactive') {
                    result.reactiveCasts.push(spellId);
                } else if (ability.usageHints?.defensiveTiming === 'during') {
                    result.duringCasts.push(spellId);
                }
                
                if (Object.values(entity.abilities.damage).includes(ability)) {
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

    static findAbilityBySpellId(encounter: EncounterData, spellId: number): {
        entityKey: string;
        abilityCategory: 'damage' | 'buffs' | 'casts';
        abilityKey: string;
        entity: EnemyEntity;
        ability: AbilityData;
    } | null {
        for (const [entityKey, entity] of Object.entries(encounter.entities)) {
            for (const [category, abilities] of Object.entries(entity.abilities)) {
                for (const [abilityKey, ability] of Object.entries(abilities)) {
                    if (ability.id === spellId) {
                        return { 
                            entityKey, 
                            abilityCategory: category as 'damage' | 'buffs' | 'casts',
                            abilityKey, 
                            entity, 
                            ability 
                        };
                    }
                }
            }
        }
        return null;
    }
    
    static getEntitiesByType(encounter: EncounterData, type: EnemyEntity['type']): EnemyEntity[] {
        return Object.values(encounter.entities).filter(entity => entity.type === type);
    }
    
    static getAbilitiesForPhase(encounter: EncounterData, phaseNumber: number): Record<string, AbilityData[]> {
        const phase = encounter.phases?.find(p => p.number === phaseNumber);
        if (!phase) return {};
        
        const entityAbilities: Record<string, AbilityData[]> = {};
        phase.activeEntities.forEach(entityKey => {
            const entity = encounter.entities[entityKey];
            if (entity) {
                const allAbilities = [
                    ...Object.values(entity.abilities.damage),
                    ...Object.values(entity.abilities.buffs),
                    ...Object.values(entity.abilities.casts)
                ];
                entityAbilities[entityKey] = allAbilities;
            }
        });
        
        return entityAbilities;
    }
    
    static getMechanicsForPhase(encounter: EncounterData, phaseNumber: number): AbilityData[] {
        const phase = encounter.phases?.find(p => p.number === phaseNumber);
        if (!phase) return [];
        
        const mechanics: AbilityData[] = [];
        
        const allAbilities: AbilityData[] = [];
        phase.activeEntities.forEach(entityKey => {
            const entity = encounter.entities[entityKey];
            if (entity) {
                allAbilities.push(
                    ...Object.values(entity.abilities.damage),
                    ...Object.values(entity.abilities.buffs),
                    ...Object.values(entity.abilities.casts)
                );
            }
        });
        
        // Filter to only the mechanics referenced by the phase
        phase.mechanics.forEach(mechanicName => {
            const ability = allAbilities.find(a => a.name.toLowerCase().replace(/\s+/g, '') === mechanicName.toLowerCase());
            if (ability) {
                mechanics.push(ability);
            }
        });
        
        return mechanics;
    }
    
    static getMainBossEntities(encounter: EncounterData): EnemyEntity[] {
        return this.getEntitiesByType(encounter, 'main_boss');
    }
    
    static getMiniBossEntities(encounter: EncounterData): EnemyEntity[] {
        return this.getEntitiesByType(encounter, 'mini_boss');
    }
    
    static getAddEntities(encounter: EncounterData): EnemyEntity[] {
        return this.getEntitiesByType(encounter, 'add');
    }
}
