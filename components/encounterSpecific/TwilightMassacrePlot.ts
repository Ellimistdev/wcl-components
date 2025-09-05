import { EncounterAbilities } from '../../definitions/encounterAbilities';
import { EncounterIds } from '../../definitions/encounterIds';
import { RpgLogs } from '../../definitions/RpgLogs';
import { EventPlotterConfig, PlotLocation } from '../../definitions/types';
import EventPlotter from '../generic/EventPlotter';

const markerAssignments: Record<number, string> = {
    1: 'star',
    2: 'circle', 
    3: 'diamond',
    4: 'triangle',
    5: 'moon',
    6: 'square',
    7: 'cross',
    8: 'skull'
};

function formatTime(milliseconds: number): string {
    const seconds = getSeconds(milliseconds);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
}

function getSeconds(milliseconds: number): number {
    return Math.floor(milliseconds / 1000);
}

function processWorldMarkers(
    fight: RpgLogs.Fight,
    setIndex: number,
    setStartTime: number,
    setEndTime: number,
    config: EventPlotterConfig
): PlotLocation[] {
    return fight.worldMarkers
        .filter(point =>
            point.startTime <= setEndTime &&
            (point.endTime === null || point.endTime >= setStartTime)
        )
        .map(point => ({
            x: (point.x / 100) + config.chartBounds.NUDGE_X,
            y: (point.y / 100) + config.chartBounds.NUDGE_Y,
            i: setIndex + 1,
            name: "", // Remove name for world markers
            marker: {
                enabled: true,
                symbol: `url(https://cf.raidplan.io/game/wow/raid/${markerAssignments[point.icon]}.png)`,
                height: 20,
                width: 20
            },
            fightId: fight.id,
            timestamp: formatTime(point.startTime - fight.startTime),
            showInTooltip: false // Flag to hide from tooltip
        }));
}

function processEvents(fight: RpgLogs.Fight, config: EventPlotterConfig) {
    const { setDefinition } = config;
    
    // Get phantom cast events as triggers
    const triggerEvents = fight.eventsByCategoryAndDisposition("casts", "enemy")
        .filter(e =>
            e.type === "cast" &&
            e.ability?.id === setDefinition.triggerEvent.abilityId &&
            e.source?.name?.includes('Nether Phantom')
        );

    const locations: PlotLocation[] = [];
    let setStartTime = 0;
    let setCount = 0;

    triggerEvents.forEach((triggerEvent) => {
        if (setStartTime < getSeconds(triggerEvent.timestamp - fight.startTime)) {
            setCount++;
            setStartTime = getSeconds(triggerEvent.timestamp - fight.startTime);
        }
        const setEndTime = triggerEvent.timestamp + setDefinition.window;

        // Add phantom positions
        if (triggerEvent.sourceResources) {
            locations.push({
                x: (triggerEvent.sourceResources.x / 100) + config.chartBounds.NUDGE_X,
                y: (triggerEvent.sourceResources.y / 100) + config.chartBounds.NUDGE_Y,
                i: setCount,
                name: triggerEvent.source?.name || 'Unknown Phantom',
                symbol: {
                    enabled: true,
                    symbol: 'diamond',
                    height: 16,
                    width: 16
                },
                fightId: fight.id,
                timestamp: formatTime(triggerEvent.timestamp - fight.startTime)
            });
        }

        // Add player positions from damage events
        const playerEvents = fight.eventsByCategoryAndDisposition("damage", "friendly")
            .filter(e => {
                if (e.type !== "damage") return false;
                // Handle both single event and multi event cases
                if (config.setDefinition.plotEvent.type === 'multi') {
                    return config.setDefinition.plotEvent.events.some(eventFilter => 
                        e.ability?.id === eventFilter.abilityId &&
                        e.timestamp >= triggerEvent.timestamp &&
                        e.timestamp <= setEndTime
                    );
                } else {
                    return e.ability?.id === config.setDefinition.plotEvent.abilityId &&
                           e.timestamp >= triggerEvent.timestamp &&
                           e.timestamp <= setEndTime;
                }
            });

        playerEvents.forEach(event => {
            if (event.targetResources && event.target) { // Changed back to target since we want where players get hit
                locations.push({
                    x: (event.targetResources.x / 100) + config.chartBounds.NUDGE_X,
                    y: (event.targetResources.y / 100) + config.chartBounds.NUDGE_Y,
                    i: setCount,
                    name: event.target.name,
                    symbol: {
                        enabled: true,
                        symbol: 'circle',
                        height: 8,
                        width: 8
                    },
                    fightId: fight.id,
                    timestamp: formatTime(event.timestamp - fight.startTime),
                    isPlayer: true
                });
            }
        });

        // Add world markers
        const markerLocations = processWorldMarkers(fight, setCount - 1, triggerEvent.timestamp, setEndTime, config);
        locations.push(...markerLocations);
    });

    return { locations, setCount };
}

const CONFIG: EventPlotterConfig = {
    bossEncounterId: EncounterIds.NerubarPalace.NexusPrincessKyveza,
    background: 'https://i.imgur.com/B1cuUW8.png',
    setDefinition: {
        triggerEvent: {
            type: 'cast',
            abilityId: EncounterAbilities.NerubarPalace.NexusPrincessKyveza.TwilightMassacreGhostTargetingCast,
            sourceFilter: (event: RpgLogs.AnyEvent) => {
                if (event.type !== 'cast') return false;
                return event.source?.name?.includes('Nether Phantom') || false;
            }
        },
        plotEvent: {
            type: 'damage',
            abilityId: EncounterAbilities.NerubarPalace.NexusPrincessKyveza.TwilightMassacreDamageEvent
        },
        window: 5000 // 5 second window
    },
    chartBounds: {
        Y_MIN: -3520,
        Y_MAX: -3425,
        X_MIN: -630,
        X_MAX: -535,
        NUDGE_X: 0,
        NUDGE_Y: 7,
    },
    title: 'Twilight Massacre Positioning',
};

export default getComponent = () => {
    const fight = reportGroup.fights[0];
    return processEvents(fight, CONFIG);
    return EventPlotter(CONFIG, processEvents(fight, CONFIG));
};