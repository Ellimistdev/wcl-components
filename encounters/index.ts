import { PlexusSentinelEncounter } from './manaforgeOmega/plexusSentinel';
import { SoulbinderNaazindhriEncounter } from './manaforgeOmega/soulbinderNaazindhri';
import { LoomitharEncounter } from './manaforgeOmega/loomithar';
import { DimensiusEncounter } from './manaforgeOmega/dimensius';
import { TestEncounter } from './manaforgeOmega/test';
import { EncounterDisplayLookup } from './utils';
import type { DisplayInfo, EncounterData, Mechanic, SpellEvent } from './types';


export const ManaforgeOmegaEncounters = {
    PlexusSentinel: PlexusSentinelEncounter,
    SoulbinderNaazindhri: SoulbinderNaazindhriEncounter,
    Loomithar: LoomitharEncounter,
    Dimensius: DimensiusEncounter,
    Test: TestEncounter
};

export function getEncounterReferenceCasts(encounterId: number): Record<number, DisplayInfo> {
    let encounter: EncounterData | null = null;
    
    switch (encounterId) {
        case 1:
            encounter = TestEncounter;
            break;
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
    DimensiusEncounter,
    TestEncounter,
    EncounterDisplayLookup 
};

export type { DisplayInfo, EncounterData, Mechanic, SpellEvent };
