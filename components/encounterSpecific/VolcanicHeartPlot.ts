// Example usage for Volcanic Heart
import EventPlotter from '../generic/EventPlotter';

const CONFIG = {
    bossEncounterId: 2684,
    background: 'https://i.imgur.com/sVKDJ0d.png',
    setDefinition: {
        // Trigger sets based on debuff application
        triggerEvent: {
            type: 'debuffApply' as const,
            abilityId: 410966
        },
        // Plot locations based on damage events
        plotEvent: {
            type: 'damage' as const,
            abilityId: 410953
        },
        window: 10000
    },
    chartBounds: {
        Y_MIN: 2400,
        Y_MAX: 2533,
        X_MIN: -2549,
        X_MAX: -2415,
        NUDGE_X: 0,
        NUDGE_Y: 0,
    },
    title: 'Volcanic Heart Drops'
};

export default getComponent = () => {
  return EventPlotter(CONFIG);
}
