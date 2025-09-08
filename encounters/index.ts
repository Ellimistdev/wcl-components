import { PlexusSentinelEncounter } from './manaforgeOmega/plexusSentinel';
import { LoomitharEncounter } from './manaforgeOmega/loomithar';
import { SoulbinderNaazindhriEncounter } from './manaforgeOmega/soulbinderNaazindhri';
import { DimensiusEncounter } from './manaforgeOmega/dimensius';
import { EncounterDisplayLookup } from './utils';
import type { DisplayInfo, EncounterData, Mechanic, SpellEvent } from './types';


export const ManaforgeOmegaEncounters = {
    PlexusSentinel: PlexusSentinelEncounter,
    SoulbinderNaazindhri: SoulbinderNaazindhriEncounter,
    Loomithar: LoomitharEncounter
};

export function getEncounterReferenceCasts(encounterId: number): Record<number, DisplayInfo> {
    let encounter: EncounterData | null = null;
    
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
        case 3135:
            encounter = DimensiusEncounter;
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

export type { DisplayInfo, EncounterData, Mechanic, SpellEvent };
