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
        X_MAX: -2415
    },
    assignmentMapping: {
        'Zaratul': '7',
        'Sindir': '1',
        'Vox': '3',
        'ZennTyo': '2',
        'Maomitrasza': '5',
        'Gibbit': '6',
        'Xerog': '4',
    },
    title: 'Volcanic Heart Drops'
};

export default getComponent = () => {
  return EventPlotter(CONFIG);
}

// `#report-component-dashboard-container > div > div.react-tile.report-component-dashboard.report-component-dashboard--is-being-edited > div.react-tile__content.react-tile__content--narrow > div > div.react-grid-layout.layout > div:nth-child(1) > div.report-component-dashboard__cell-overlay`
// `#report-component-dashboard-container > div > div.react-tile.report-component-dashboard.report-component-dashboard--is-being-edited > div.react-tile__content.react-tile__content--narrow > div > div.react-grid-layout.layout > div:nth-child(1) > div.report-component-dashboard__cell-buttons > button:nth-child(2)`
// `#report-component-dashboard-container > div > div:nth-child(2) > div.react-tile__content.react-tile__content--regular > div > div.editor > div > div.monaco-editor.no-user-select`
    