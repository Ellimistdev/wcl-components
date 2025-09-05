// encounterSpecific/EventPlotter.ts
import { eventsByCategoryAndDisposition } from "../../util/wrappers/getEventsByTypeAndDisposition";
import { filterEvents, getEventCategory, groupEventsByTime, isMultiEventFilter } from "../../util/eventUtils";
import { RpgLogs } from "../../definitions/RpgLogs";
import { EventPlotterConfig, PlotLocation, ChartSeries, EventFilter } from "../../definitions/types";
import { EncounterIds } from "../../definitions/encounterIds";

// const markerAssignments: Record<number, string> = {
//     1: 'star',
//     2: 'circle',
//     3: 'diamond',
//     4: 'triangle',
//     5: 'moon',
//     6: 'square',
//     7: 'cross',
//     8: 'skull'
// };

function formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
}

// function processWorldMarkers(
//     fight: RpgLogs.Fight, 
//     setIndex: number,
//     setStartTime: number, 
//     setEndTime: number,
//     config: EventPlotterConfig
// ): PlotLocation[] {
//     return fight.worldMarkers
//         .filter(point => 
//             point.startTime <= setEndTime && 
//             (point.endTime === null || point.endTime >= setStartTime)
//         )
//         .map(point => ({
//             x: (point.x / 100) + config.chartBounds.NUDGE_X,
//             y: (point.y / 100) + config.chartBounds.NUDGE_Y,
//             i: setIndex + 1,
//             marker: 
//             { 
//                 enabled: true,
//                 symbol: `url(https://cf.raidplan.io/game/wow/raid/${markerAssignments[point.icon]}.png)`,
//                 height: 20,
//                 width: 20
//             },
//             fightId: fight.id,
//             timestamp: formatTime(point.startTime - fight.startTime)
//         }));
// }

// Modified processEvents function to handle both NPCs and players
// const processEvents = (fight: RpgLogs.Fight, config: EventPlotterConfig) => {
//     const { setDefinition } = config;
    
//     // Get NPC cast events as triggers
//     const triggerEvents = filterEvents(
//         eventsByCategoryAndDisposition(fight, "casts", "enemy"),
//         setDefinition.triggerEvent
//     );
    
//     const setGroups = groupEventsByTime(triggerEvents, false, setDefinition.window);
    
//     const locations: PlotLocation[] = [];
    
//     setGroups.forEach((eventGroup, index) => {
//         const setStartTime = eventGroup[0].timestamp;
//         const setEndTime = setStartTime + setDefinition.window;
        
//         // Add NPC positions from cast events
//         eventGroup.forEach(event => {
//             if (!event.source || !event.sourceResources) return;
            
//             locations.push({
//                 x: (event.sourceResources.x / 100) + config.chartBounds.NUDGE_X,
//                 y: (event.sourceResources.y / 100) + config.chartBounds.NUDGE_Y,
//                 i: index + 1,
//                 name: event.source.name,
//                 symbol: { 
//                     enabled: true,
//                     symbol: 'diamond',
//                     height: 12,
//                     width: 12
//                 },
//                 fightId: fight.id,
//                 timestamp: formatTime(event.timestamp - fight.startTime),
//                 isNPC: true
//             });
//         });
        
//         // Handle multi-event plot events
//         if (isMultiEventFilter(setDefinition.plotEvent)) {
//             // Handle each event type
//             setDefinition.plotEvent.events.forEach((eventFilter: EventFilter) => {
//                 const eventCategory = getEventCategory(eventFilter);
//                 const filteredEvents = filterEvents(
//                     eventsByCategoryAndDisposition(fight, eventCategory, "enemy")
//                         .filter(e => 
//                             e.timestamp >= setStartTime && 
//                             e.timestamp <= setEndTime
//                         ),
//                     eventFilter
//                 );

//                 // Process filtered events
//                 filteredEvents.forEach(event => {
//                     if (!event.targetResources || !event.target) return;
                    
//                     locations.push({
//                         x: (event.targetResources.x / 100) + config.chartBounds.NUDGE_X,
//                         y: (event.targetResources.y / 100) + config.chartBounds.NUDGE_Y,
//                         i: index + 1,
//                         name: event.target.name,
//                         symbol: { 
//                             enabled: true,
//                             symbol: eventFilter.type === 'cast' ? 'diamond' : 'circle',
//                             height: eventFilter.type === 'cast' ? 12 : 8,
//                             width: eventFilter.type === 'cast' ? 12 : 8
//                         },
//                         fightId: fight.id,
//                         timestamp: formatTime(event.timestamp - fight.startTime),
//                         isPlayer: eventFilter.type === 'damage'
//                     });
//                 });
//             });
//         } else {
//             // Handle single event plot events
//             const eventCategory = getEventCategory(setDefinition.plotEvent);
//             const filteredEvents = filterEvents(
//                 eventsByCategoryAndDisposition(fight, eventCategory, "enemy")
//                     .filter(e => 
//                         e.timestamp >= setStartTime && 
//                         e.timestamp <= setEndTime
//                     ),
//                 setDefinition.plotEvent
//             );

//             // Process filtered events
//             filteredEvents.forEach(event => {
//                 if (!event.targetResources || !event.target) return;
                
//                 locations.push({
//                     x: (event.targetResources.x / 100) + config.chartBounds.NUDGE_X,
//                     y: (event.targetResources.y / 100) + config.chartBounds.NUDGE_Y,
//                     i: index + 1,
//                     name: event.target.name,
//                     symbol: { 
//                         enabled: true,
//                         symbol: 'circle',
//                         height: 8,
//                         width: 8
//                     },
//                     fightId: fight.id,
//                     timestamp: formatTime(event.timestamp - fight.startTime),
//                     isPlayer: true
//                 });
//             });
//         }
        
//         // Add world markers
//         const markerLocations = processWorldMarkers(fight, index, setStartTime, setEndTime, config);
//         locations.push(...markerLocations);
//     });
    
//     return { locations, setCount: setGroups.length };
// };

const processEvents = (fight: RpgLogs.Fight, config: EventPlotterConfig) => {
    return { locations: [], setCount: 0 };
}

// const processEvents = (fight: RpgLogs.Fight, config: EventPlotterConfig) => {
//     const { setDefinition } = config;

//     const friendlyTriggeredEvents = eventsByCategoryAndDisposition(
//         fight, 
//         getEventCategory(setDefinition.triggerEvent), 
//         "friendly"
//     );

//     const filteredEvents = filterEvents(
//             friendlyTriggeredEvents,
//             setDefinition.triggerEvent
//     );
//     // return {filteredEvents};

//     // Get trigger events (these define our sets)
//     const triggerEvents = groupEventsByTime(
//         filteredEvents,
//         false,
//         setDefinition.window
//     );

//     // Get plot events
//     const allPlotEvents = eventsByCategoryAndDisposition(
//         fight,
//         getEventCategory(setDefinition.plotEvent),
//         "enemy"
//     );

//     const locations: PlotLocation[] = [];

//     triggerEvents.forEach((eventGroup, index) => {
//         const setStartTime = eventGroup[0].timestamp;
//         const setEndTime = setStartTime + setDefinition.window;

//         const setPlotEvents = filterEvents(allPlotEvents, setDefinition.plotEvent)
//             .filter(event => 
//                 event.timestamp >= setStartTime &&
//                 event.timestamp <= setEndTime &&
//                 event.targetResources
//             );

//         setPlotEvents.forEach(event => {
//             if (!event.targetResources || !event.target) return;

//             locations.push({
//                 x: (event.targetResources.x / 100) + config.chartBounds.NUDGE_X,
//                 y: (event.targetResources.y / 100) + config.chartBounds.NUDGE_Y,
//                 i: index + 1,
//                 name: event.target.name,
//                 symbol: { enabled: true },
//                 fightId: fight.id,
//                 timestamp: formatTime(event.timestamp - fight.startTime),
//                 targetId: event.target.id
//             });
//         });
        

//         const markerLocations = processWorldMarkers(fight, index, setStartTime, setEndTime, config);
//         locations.push(...markerLocations);
//     });

//     return { locations, setCount: triggerEvents.length };
// };

export default getComponent = (config: EventPlotterConfig, processedEvents?: { locations: any; setCount: any; }) => {
    const isBoss = reportGroup.fights
        .every(fight => fight.encounterId === config.bossEncounterId);

        function getBossName(bossId: number): string {
            // Get all raid enums
            const raids = Object.values(EncounterIds);
            // Find the right boss name
            for (const raid of raids) {
                const bossName = Object.entries(raid)
                    .find(([_, value]) => value === bossId)?.[0];
                if (bossName) return bossName;
            }
            throw new Error(`Boss ID ${bossId} not found`);
        }
        
        if (!isBoss) {
            return {
                component: 'EnhancedMarkdown',
                props: {
                    content: `This component only works for <EncounterIcon id="${config.bossEncounterId}">${getBossName(config.bossEncounterId)}</EncounterIcon>.`
                }
            };
        }

    let maxSetCount = 0;
    const data = reportGroup.fights.flatMap(fight => {
        const { locations, setCount } = processedEvents ? processedEvents : processEvents(fight, config);
        maxSetCount = Math.max(maxSetCount, setCount);
        return locations;
    });

    // return data;

    const series: ChartSeries[] = Array.from(
        { length: maxSetCount }, 
        (_, i) => ({
            name: `Set #${i + 1}`,
            data: data.filter(x => x.i === i + 1),
            tooltip: { headerFormat: '{point.name}</br>' }
        })
    );

    return {
        component: 'Chart',
        props: {
            chart: {
                type: 'scatter',
                plotBackgroundImage: config.background,
                backgroundColor: 'transparent',
                plotBorderWidth: 0,
                spacing: [0, 0, 0, 0],
                animation: false,
                plotBackgroundSize: '100%'  // Make image fit exactly to plot area
            },
            title: { text: config.title },
            colors: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#fffac8', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
            plotOptions: {
                scatter: {
                    marker: {
                        enabled: true,
                        symbol: '{point.marker.symbol}',
                        height: '{point.marker.height}',
                        width: '{point.marker.width}'
                    },
                    opacity: 1,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        allowOverlap: true,
                        style: {
                            color: 'white'
                        }
                    },
                    tooltip: {
                        pointFormat: 'Pull: {point.fightId} @ {point.timestamp}<br/>Set: {point.i}<br/>Assignment: {point.assignment}<br/>X: {point.x}<br/>Y: {point.y}'
                    }
                }
            },
            yAxis: {
                visible: false,
                endOnTick: false,
                min: config.chartBounds.Y_MIN,
                max: config.chartBounds.Y_MAX
            },
            xAxis: {
                visible: false,
                endOnTick: false,
                min: config.chartBounds.X_MIN,
                max: config.chartBounds.X_MAX
            },
            series
        }
    };
};