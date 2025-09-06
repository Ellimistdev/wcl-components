import { RpgLogs } from "../../definitions/RpgLogs";
import { BuffMap, InstantCasts, VBar } from "../../definitions/types";
import { defensives } from "../../definitions/defensives";
import { referenceCasts } from "../../definitions/referenceCasts";

getComponent = () => {
    // const encounterID = 2680; // Rashok
    // const encounterID = 2689; // Zkarn
    // const encounterID = 2683 // Magmorax
    // const encounterID = 2685 // Sarkareth
    // const encounterID = 2708 // Nymue
    // const encounterID = 2709 // Smolderon
    // const encounterID = 2786 // Tindral

    const onlyOneFightSelected = reportGroup.fights.length === 1;
    const onlyOneCombatantInfoEvent = reportGroup.fights[0].combatantInfoEvents.length === 1;
    const isBossConfigured = reportGroup.fights.every(fight => fight.encounterId === 0);
    // if (!onlyOneFightSelected) {
    //     return {
    //         component: 'EnhancedMarkdown',
    //         props: {
    //             content: `Please select a single encounter.`
    //         }
    //     }
    // } else if (!onlyOneCombatantInfoEvent) {
    //     return {
    //         component: 'EnhancedMarkdown',
    //         props: {
    //             content: `This component works best when viewing a single player`
    //         }
    //     }
    // } else if (!isBossConfigured) {
    //     return {
    //         component: 'EnhancedMarkdown',
    //         props: {
    //             content: `This component is currently configured for <EncounterIcon id="${encounterID}"></EncounterIcon>.`
    //         }
    //     }
    // }

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

        return { instantCasts, buffMap };
    };

    const data = reportGroup.fights.map(fight => ({
        id: fight.id,
        startTime: fight.startTime,
        deaths: fight.friendlyPlayerDeathEvents,
        casts: fight.allEventsByCategoryAndDisposition('casts', 'enemy').filter(event => event.ability && referenceCasts[event.ability.id] !== undefined && event.type === 'cast')
    }));

    const aurasGained = reportGroup.fights.flatMap(fight => {
        // "type": "applybuff"
        // "type": "removebuff"
        return fight.eventsByCategoryAndDisposition("aurasGained", "friendly")
            .filter(cast => {
                const defensiveAbilities = {
                    ...(defensives[cast.target?.subType ?? ""] || {}),
                    ...(defensives["Everyone"] || {})
                };

                return (
                    defensiveAbilities &&
                    cast.ability !== null && // Add null check
                    defensiveAbilities.hasOwnProperty(cast.ability.id)
                );
            })
            .map(cast => ({
                ...cast,
                timestamp: cast.timestamp - fight.startTime,
                startTime: fight.startTime
            }));
    });

    const defensiveCasts = reportGroup.fights.flatMap(fight => {
        return fight.eventsByCategoryAndDisposition("casts", "friendly")
            .filter(cast => {
                const actor = cast.source;
                const ability = cast.ability;
                const defensiveAbilities = {
                    ...(defensives[actor?.subType ?? ""] || {}),
                    ...(defensives["Everyone"] || {})
                };

                return (
                    defensiveAbilities &&
                    ability !== null &&
                    defensiveAbilities.hasOwnProperty(ability.id)
                );
            })
            .map(cast => ({
                ...cast,
                timestamp: cast.timestamp - fight.startTime,
                startTime: fight.startTime
            }));
    });

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

    const labels = {};

    const vbars: VBar[] = data.flatMap(({ id, startTime, casts }) => {
        return casts.map(event => {
            const ability = event.ability;
            const labels: { [key: string]: boolean } = {};
            const label = ability ? referenceCasts[ability.id].text : null;
            const isFirstEventWithText = label && !labels[label];
            if (isFirstEventWithText) {
                labels[label] = true;
            }
            return {
                width: 1,
                value: event.timestamp - startTime,
                color: ability ? referenceCasts[ability.id].color : '', // Assign an empty string as the default value
                label: isFirstEventWithText ? {
                    text: label,
                    align: "center",
                    verticalAlign: "bottom",// referenceCasts[ability.id].verticalAlign,
                    textAlign: "right",// referenceCasts[ability.id].verticalAlign,
                    y: -5,// referenceCasts[ability.id].y,
                    x: -12,// referenceCasts[ability.id].y,
                    style: {
                        color: ability ? referenceCasts[ability.id].color : '', // Assign an empty string as the default value
                    }
                } : null
            };
        });
    });

    const instantCastsVbars = [];

    // Iterate through instantCasts
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

    // Combine vbars and instantCastsVbars arrays
    const allVbars = [...vbars, ...instantCastsVbars];

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

    return {
        component: "Chart",
        props: {
            chart: {
                type: "xrange",
            },
            title: {
                text: "Defensives Active",
            },
            xAxis: {
                min: 0,
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
