import { RpgLogs } from "../../definitions/RpgLogs";
import { BuffMap, InstantCasts, VBar } from "../../definitions/types";
import { defensives } from "../../definitions/defensives";
import { getEncounterReferenceCasts } from "../../encounters";

getComponent = () => {
    const onlyOneFightSelected = reportGroup.fights.length === 1;

    if (!onlyOneFightSelected) {
        return {
            component: 'EnhancedMarkdown',
            props: {
                content: `Defensive Timeline<br/>Please select a single encounter.`
            }
        }
    }
    
    // Collect all unique actors from all data sources
    const uniqueActors = new Set<string>();
    
    // Check combatantInfoEvents (if available)
    reportGroup.fights.forEach(fight => {
        fight.combatantInfoEvents.forEach(event => {
            if (event.source?.name) {
                uniqueActors.add(event.source.name);
            }
        });
    });

    // Check defensive casts
    const defensiveCasts = reportGroup.fights.flatMap(fight => {
        return fight.eventsByCategoryAndDisposition("casts", "friendly")
            .filter(cast => {
                const actor = cast.source;
                const ability = cast.ability;
                const target = cast.target;
                const defensiveAbilities = {
                    ...(defensives[actor?.subType ?? ""] || {}),
                    ...(defensives["Everyone"] || {})
                };

                // Check if this is a valid defensive ability
                if (!defensiveAbilities || 
                    ability === null || 
                    !Object.prototype.hasOwnProperty.call(defensiveAbilities, ability.id)) {
                    return false;
                }

                // For Lay on Hands (633), 
                // and Emerald Blossom (355913)
                // and Verdant Embrace (360995)
                // only count it if cast on self
                if (ability.id === 633 ||
                    ability.id === 355913 ||
                    ability.id === 360995
                ) {
                    return actor?.id === target?.id;
                }

                return true;
            })
            .map(cast => ({
                ...cast,
                timestamp: cast.timestamp - fight.startTime,
                startTime: fight.startTime
            }));
    });

    // return defensiveCasts;
    
    defensiveCasts.forEach(cast => {
        if (cast.source?.name) {
            uniqueActors.add(cast.source.name);
        }
    });

    // Check auras gained
    const aurasGained = reportGroup.fights.flatMap(fight => {
        return fight.eventsByCategoryAndDisposition("aurasGained", "friendly")
            .filter(cast => {
                const defensiveAbilities = {
                    ...(defensives[cast.target?.subType ?? ""] || {}),
                    ...(defensives["Everyone"] || {})
                };

                return (
                    defensiveAbilities &&
                    cast.ability !== null &&
                    defensiveAbilities.hasOwnProperty(cast.ability.id)
                );
            })
            .map(cast => ({
                ...cast,
                timestamp: cast.timestamp - fight.startTime,
                startTime: fight.startTime
            }));
    });

    // return aurasGained;
    
    aurasGained.forEach(event => {
        if (event.target?.name) {
            uniqueActors.add(event.target.name);
        }
    });
    
    // Fail fast if multiple actors found
    if (uniqueActors.size > 1) {
        return {
            component: 'EnhancedMarkdown',
            props: {
                content: `Defensive Timeline<br/>This component works best when viewing a single player<br/>Found ${uniqueActors.size} players: ${Array.from(uniqueActors).join(', ')}`
            }
        };
    }
    
    if (uniqueActors.size === 0) {
        return {
            component: 'EnhancedMarkdown',
            props: {
                content: `Defensive Timeline<br/>No player data found in the selected time window`
            }
        };
    }

    const encounterId = reportGroup.fights[0]?.encounterId || 0;
    const encounterReferenceCasts = getEncounterReferenceCasts(encounterId);

    // Merge with default reference casts (if any)
    const referenceCasts = {
        ...encounterReferenceCasts
        // Add any default/global reference casts here if needed
    };

    const processInstantCasts = (eventsData: RpgLogs.AnyEvent[]) => {
        const instantCasts: InstantCasts = {};
        for (const event of eventsData) {
            const actor = event.source;
            const ability = event.ability;
            const target = event.target;
            // Check if it's an instant cast event
            if ((actor && actor.name && ability && ability.id && target)
                // && (event.target.name === "Environment") // targeting self
            ) {
                const defensiveAbilities = {
                    ...(defensives[actor.subType] || {}),
                    ...(defensives["Everyone"] || {})
                };
                const playerName = actor.name;
                const targetName = target.name;
                const abilityId = ability.id.toString();
                const abilityName = ability.name;
                const timestamp = event.timestamp;

                if (defensiveAbilities[abilityId].duration === 0) { // duration check
                    if (!instantCasts[playerName]) {
                        instantCasts[playerName] = {};
                    }
                    if (!instantCasts[playerName][abilityId]) {
                        instantCasts[playerName][abilityId] = {
                            name: abilityName,
                            target: targetName,
                            spellId: abilityId, // TODO: check if this is needed
                            casts: [],
                            vbar: {
                                width: 1,
                                color: defensiveAbilities[abilityId].color || "#FFF",
                                label: {
                                    text: abilityName,
                                    verticalAlign: defensiveAbilities[abilityId].verticalAlign || 'center',
                                    textAlign: defensiveAbilities[abilityId].textAlign || 'center',// referenceCasts[event.ability.id].verticalAlign,
                                    y: defensiveAbilities[abilityId].labelOffsetY || 130,// referenceCasts[event.ability.id].y,
                                    style: {
                                        color: defensiveAbilities[abilityId].color || "#FFF"
                                    },
                                }
                            }
                        };
                    }
                    instantCasts[playerName][abilityId].casts.push(timestamp);
                }
            }
        }

        return instantCasts;
    };

    const processBuffMap = (aurasGained: RpgLogs.AnyEvent[]) => {
        const buffMap: BuffMap = {};

        for (const event of aurasGained) {
            if (event.type === "applybuff" || event.type === "removebuff") {
                const target = event.target;
                if (target) {
                    const targetName = target.name;
                    if (!buffMap[targetName]) {
                        buffMap[targetName] = {};
                    }
                    const ability = event.ability;
                    if (ability) {
                        const buffId = ability.id;

                        if (!buffMap[targetName][buffId]) {
                            buffMap[targetName][buffId] = {
                                name: ability.name,
                                casts: []
                            };
                        }
                        const buffCasts = buffMap[targetName][buffId].casts;
                        const lastCast = buffCasts[buffCasts.length - 1];
                        if (event.type === "applybuff") {
                            buffCasts.push({ applied: event.timestamp, removed: null });
                        } else if (event.type === "removebuff" && lastCast) {
                            lastCast.removed = event.timestamp;
                        }
                    }
                }
            }
        }

        return buffMap;
    };

    const formatEventData = (eventsData: RpgLogs.AnyEvent[], aurasGained: RpgLogs.AnyEvent[]) => {
        const instantCasts = processInstantCasts(eventsData);
        const buffMap = processBuffMap(aurasGained);

        // Special handling for Stone Bulwark Totem - convert cast to buff duration
        eventsData.forEach(event => {
            if (event.ability?.id === 108270 && event.source?.name) { // Stone Bulwark cast
                const playerName = event.source.name;
                const abilityName = "Stone Bulwark Totem";

                if (!buffMap[playerName]) {
                    buffMap[playerName] = {};
                }
                if (!buffMap[playerName][108270]) {
                    buffMap[playerName][108270] = {
                        name: abilityName,
                        casts: []
                    };
                }

                // Create a synthetic 30-second buff from the cast time
                buffMap[playerName][108270].casts.push({
                    applied: event.timestamp,
                    removed: event.timestamp + 30000 // 30 seconds later
                });
            }
        });

        return { instantCasts, buffMap };
    };

    // Fallback chain to find selected player info
    let selectedPlayer: RpgLogs.Actor | null = null;

    // 1. First try: combatantInfoEvents (works for full fight or early time windows)
    if (reportGroup.fights[0]?.combatantInfoEvents?.length > 0) {
        selectedPlayer = reportGroup.fights[0].combatantInfoEvents[0].source;
    }

    // 2. Second try: get from defensive casts
    if (!selectedPlayer && defensiveCasts.length > 0) {
        selectedPlayer = defensiveCasts[0]?.source;
    }

    // 3. Third try: get from auras gained
    if (!selectedPlayer && aurasGained.length > 0) {
        selectedPlayer = aurasGained[0]?.target;
    }

    // 4. Final fallback: show error
    if (!selectedPlayer) {
        return {
            component: 'EnhancedMarkdown',
            props: {
                content: 'No player data available in the selected time window. Try expanding the time range or selecting a different player.'
            }
        };
    }

    const fightName = reportGroup.fights[0]?.name || "Fight";
    const fightDifficulty = reportGroup.fights[0]?.difficulty || 1;

    const data = reportGroup.fights.map(fight => ({
        id: fight.id,
        name: fight.name,
        startTime: fight.startTime,
        endTime: fight.endTime,
        firstEvent: fight.events.length > 0 ? fight.events[0]?.timestamp : null,
        lastEvent: fight.events.length > 0 ? fight.events[fight.events.length - 1]?.timestamp : null,
        deaths: fight.friendlyPlayerDeathEvents,
        casts: [
        // Include cast events
        ...fight.allEventsByCategoryAndDisposition('casts', 'enemy').filter(event => 
            event.ability && referenceCasts[event.ability.id] !== undefined && event.type === 'cast'
        ),
        // Include damage events  
        ...fight.allEventsByCategoryAndDisposition('damage', 'enemy').filter(event => 
            event.ability && 
            referenceCasts[event.ability.id] !== undefined && 
            event.type === 'damage' &&
            event.target?.id === selectedPlayer?.id // only show damaging events that affected the selected player
        )
    ]
    }));

    const chartData: {
        marker: { enabled: boolean; };
        name: string;
        // duration: abilityData.duration,
        id: any;
        data: {
            x: number;
            x2: number | null;
            y: number;
        }[];
    }[] = [];

    const { instantCasts, buffMap } = formatEventData(defensiveCasts, aurasGained);

    const vbars: VBar[] = data.flatMap(({ id, startTime, casts }) => {
        const labelTracker: { [abilityId: string]: number } = {}; // Track last label time per ability
        const LABEL_WINDOW = 30000; // 30 seconds in milliseconds
        
        return casts.map(event => {
            const ability = event.ability;
            const abilityId = ability?.id?.toString() || '';
            const eventTime = event.timestamp - startTime;
            const label = ability ? referenceCasts[ability.id].text : null;
            
            // Check if we should show a label for this ability
            let shouldShowLabel = false;
            if (label && abilityId) {
                const lastLabelTime = labelTracker[abilityId] || -Infinity;
                const timeSinceLastLabel = eventTime - lastLabelTime;
                
                if (timeSinceLastLabel >= LABEL_WINDOW) {
                    shouldShowLabel = true;
                    labelTracker[abilityId] = eventTime; // Update last label time for this ability
                }
            }
            
            const displayInfo = ability ? referenceCasts[ability.id] : null;
            
            return {
                width: 1,
                value: eventTime,
                color: ability ? referenceCasts[ability.id].color : '',
                label: shouldShowLabel && label ? {
                    text: label,
                    align: "center",
                    verticalAlign: displayInfo?.verticalAlign || "bottom",
                    textAlign: displayInfo?.textAlign || "right",
                    y: displayInfo?.y || -5,
                    x: displayInfo?.x || -12,
                    style: {
                        color: ability ? referenceCasts[ability.id].color : '',
                    }
                } : null
            };
        });
    });

    // Iterate through instantCasts
    const instantCastsVbars = [];
    for (const playerName in instantCasts) {
        for (const abilityId in instantCasts[playerName]) {
            const ability = instantCasts[playerName][abilityId];

            // Iterate through each cast timestamp for the ability
            for (const castTimestamp of ability.casts) {
                // Create a vbar entry based on the ability's data
                const instantCastVbar = {
                    width: 1,
                    value: castTimestamp,
                    color: ability.vbar.color,
                    label: {
                        text: ability.name,
                        verticalAlign: ability.vbar.label?.verticalAlign,
                        textAlign: ability.vbar.label?.textAlign,
                        y: ability.vbar.label?.y,
                        style: {
                            color: ability.vbar.color
                        },
                    }
                };

                instantCastsVbars.push(instantCastVbar);
            }
        }
    }

    // Add death vertical lines
    const deathVbars: {
        width: number;
        value: number; color: string;
        dashStyle: string;
        label: { text: string; verticalAlign: string; textAlign: string; y: number; style: { color: string; fontWeight: string; }; };
    }[] = [];
    data.forEach(({ deaths, startTime }) => {
        deaths.forEach(deathEvent => {
            const deathVbar = {
                width: 2,
                value: deathEvent.timestamp - startTime,
                color: "#FF0000",
                dashStyle: "Dash",
                label: {
                    text: `💀`,
                    verticalAlign: "top",
                    textAlign: "left",
                    y: -15,
                    style: {
                        color: "#FF0000",
                        fontWeight: "bold"
                    }
                }
            };
            deathVbars.push(deathVbar);
        });
    });

    // Combine vbars and instantCastsVbars arrays
    const allVbars = [...vbars, ...instantCastsVbars, ...deathVbars];

    // Create categories from buffMap
    const categories: string[] = [];
    Object.entries(buffMap).forEach(([playerName, abilities]) => {
        // Iterate over each ability for the player
        Object.entries(abilities).forEach(([abilityId, abilityData]) => {
            // TODO: account for prepull buff applications
            const abilityName = abilityData.name;
            // const duration = abilityData.removed - abilityData.applied;
            if (!categories.includes(abilityName)) {
                categories.push(abilityName);
            }

            // Ensure we have at least an empty category if no defensives were used
            if (categories.length === 0) {
                categories.push("No Defensives Used");
            }

            const casts = abilityData.casts;

            // Create a series object for each ability
            const series = {
                marker: {
                    enabled: true,
                },
                name: abilityName,
                // duration: abilityData.duration,
                id: abilityId,
                data: casts.map(cast => ({
                    x: cast.applied,
                    x2: cast.removed,
                    y: categories.indexOf(abilityName),
                })),
            };

            chartData.push(series);
        });
    });

    // If no defensive data, add an empty series to maintain chart structure
    if (chartData.length === 0) {
        chartData.push({
            marker: { enabled: true },
            name: "No Defensives Used",
            id: "empty",
            data: [], // Empty data array
        });
    }

    // Convert absolute timestamps to relative timestamps (subtract fight start time)
    const minTimestamp = Math.min(...data.map(fight => 
        fight.firstEvent ? fight.firstEvent - fight.startTime : 0
    ));
    const maxTimestamp = Math.max(...data.map(fight => 
        fight.lastEvent ? fight.lastEvent - fight.startTime : fight.endTime - fight.startTime
    ));

    const getDifficultyName = (difficulty: number):string  => {
    switch (difficulty) {
        case 1: return "LFR";
        case 2: return "Normal";
        case 3: return "Heroic";
        case 4: return "Mythic";
        case 5: return "Mythic"; // super mythic??
        default: return `Unknown (${difficulty})`;
    }
}

    return {
        component: "Chart",
        props: {
            chart: {
                type: "xrange",
            },
            title: {
                text: `<span class="${selectedPlayer?.subType}">${selectedPlayer?.name}'s</span> Defensives Timeline - ${getDifficultyName(fightDifficulty)} ${fightName}`,
                useHTML: true,
            },
            xAxis: {
                min: minTimestamp,
                max: maxTimestamp,
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: 'Time in Fight'
                },
                plotLines: allVbars,
                labels: {
                    format: '{value:%M:%S}',
                },
            },
            yAxis: {
                categories: categories,
                plotLines: allVbars,
                title: {
                    enabled: false,
                },
            },
            series: chartData
        },
    }
}
