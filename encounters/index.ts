import { PlexusSentinelEncounter } from './manaforgeOmega/plexusSentinel';
import { SoulbinderNaazindhriEncounter } from './manaforgeOmega/soulbinderNaazindhri';
import { LoomitharEncounter } from './manaforgeOmega/loomithar';
import { EncounterDisplayLookup } from './utils';
import type { DisplayInfo, EnhancedEncounterData, EnhancedMechanic, EnhancedSpellEvent } from './types';


export const ManaforgeOmegaEncounters = {
    PlexusSentinel: PlexusSentinelEncounter,
    SoulbinderNaazindhri: SoulbinderNaazindhriEncounter,
    Loomithar: LoomitharEncounter
};

export function getEncounterReferenceCasts(encounterId: number): Record<number, DisplayInfo> {
    let encounter: EnhancedEncounterData | null = null;
    
    switch (encounterId) {
        case 3129:
            encounter = PlexusSentinelEncounter;
            break;
        case 3130:
            encounter = SoulbinderNaazindhriEncounter;
            break;
        case 3131:
            encounter = LoomitharEncounter;
            break;
        default:
            return {};
    }
    
    return EncounterDisplayLookup.generateReferenceCasts(encounter);
}

export { 
    PlexusSentinelEncounter, 
    SoulbinderNaazindhriEncounter, 
    LoomitharEncounter,
    EncounterDisplayLookup 
};

export type { DisplayInfo, EnhancedEncounterData, EnhancedMechanic, EnhancedSpellEvent };
