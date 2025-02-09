// Example usage for Volcanic Heart
import { EncounterAbilities } from '../../definitions/encounterAbilities';
import { EncounterIds } from '../../definitions/encounterIds';
import EventPlotter from '../generic/EventPlotter';

const CONFIG = {
    bossEncounterId: EncounterIds.NerubarPalace.NexusPrincessKyveza,
    background: 'https://i.imgur.com/B1cuUW8.png',
    setDefinition: {
        // Trigger sets based on debuff application
        triggerEvent: {
            type: 'debuffApply' as const,
            abilityId: EncounterAbilities.NerubarPalace.NexusPrincessKyveza.TwilightMassacrePlayerTargeted
        },
        // Plot locations based on damage events
        plotEvent: {
            type: 'damage' as const,
            abilityId: EncounterAbilities.NerubarPalace.NexusPrincessKyveza.TwilightMassacreDamageEvent
        },
        window: 10000
    },
    chartBounds: {
        Y_MIN: -3520,
        Y_MAX: -3425,
        X_MIN: -630,
        X_MAX: -535,
        NUDGE_X: 1,
        NUDGE_Y: 7,
    },
    title: 'Twilight Massacre Positioning',
};

export default getComponent = () => EventPlotter(CONFIG);