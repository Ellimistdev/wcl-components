// encounterSpecific/EventPlotter.ts
import { eventsByCategoryAndDisposition } from "../../util/wrappers/getEventsByTypeAndDisposition";
import { filterEvents, getEventCategory, groupEventsByTime } from "../../util/eventUtils";
import { RpgLogs } from "../../definitions/RpgLogs";
import { EventPlotterConfig, PlotLocation, ChartSeries } from "../../definitions/types";

const processEvents = (fight: RpgLogs.Fight, config: EventPlotterConfig) => {
    const { setDefinition } = config;
    const friendlyTriggeredEvents = eventsByCategoryAndDisposition(
        fight, 
        getEventCategory(setDefinition.triggerEvent), 
        "friendly"
    );
    const filteredEvents = filterEvents(
            friendlyTriggeredEvents,
            setDefinition.triggerEvent
    );
    // return {filteredEvents};

    // Get trigger events (these define our sets)
    const triggerEvents = groupEventsByTime(
        filteredEvents,
        false,
        setDefinition.window
    );

    // Get plot events
    const allPlotEvents = eventsByCategoryAndDisposition(
        fight,
        getEventCategory(setDefinition.plotEvent),
        "enemy"
    );

    const locations: PlotLocation[] = [];

    triggerEvents.forEach((eventGroup, index) => {
        const setStartTime = eventGroup[0].timestamp;
        const setEndTime = setStartTime + setDefinition.window;

        const setPlotEvents = filterEvents(allPlotEvents, setDefinition.plotEvent)
            .filter(event => 
                event.timestamp >= setStartTime &&
                event.timestamp <= setEndTime &&
                event.targetResources
            );

        function formatTime(milliseconds: number): string {
            const totalSeconds = Math.floor(milliseconds / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        setPlotEvents.forEach(event => {
            if (!event.targetResources || !event.target) return;

            locations.push({
                x: event.targetResources.x / 100,
                y: event.targetResources.y / 100,
                i: index + 1,
                assignment: config.assignmentMapping?.[event.target.name] ?? '•',
                name: event.target.name,
                fightId: fight.id,
                timestamp: formatTime(event.timestamp - fight.startTime),
                targetId: event.target.id
            });
        });
    });

    return { locations, setCount: triggerEvents.length };
};

export default getComponent = (config: EventPlotterConfig) => {
    const isBoss = reportGroup.fights
        .every(fight => fight.encounterId === config.bossEncounterId);

    if (!isBoss) {
        return {
            component: 'EnhancedMarkdown',
            props: {
                content: `This component only works for <EncounterIcon id="${config.bossEncounterId}">Boss</EncounterIcon>.`
            }
        };
    }

    let maxSetCount = 0;
    const data = reportGroup.fights.flatMap(fight => {
        const { locations, setCount } = processEvents(fight, config);
        maxSetCount = Math.max(maxSetCount, setCount);
        return locations;
    });

    // return data;

    const series: ChartSeries[] = Array.from(
        { length: maxSetCount }, 
        (_, i) => ({
            name: `Set #${i + 1}`,
            data: data.filter(x => x.i === i + 1),
            tooltip: { headerFormat: '{point.point.name}</br>' }
        })
    );

    return {
        component: 'Chart',
        props: {
            chart: {
                type: 'scatter',
                plotBackgroundImage: config.background,
            },
            title: { text: config.title },
            colors: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#fffac8', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
            plotOptions: {
                scatter: {
                    marker: { enabled: true },
                    opacity: 1,
                    dataLabels: {
                        enabled: true,
                        format: '{point.assignment}',
                        allowOverlap: true
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