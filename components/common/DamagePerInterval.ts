import CustomLogger from "../../util/debugging/CustomLogger";
import { RpgLogs } from "../../definitions/RpgLogs";
import { eventsByCategoryAndDisposition } from "../../util/wrappers/getEventsByTypeAndDisposition";
import DamageEvent = RpgLogs.DamageEvent;

const COMPONENT_NAME = "Damage Per Interval"
const DEBUG = false
const LOGGER = new CustomLogger(DEBUG)

const componentIntervals = 8;
// Aug intervalDuration is 27s with talent
const intervalDuration = 27 * 1000;
const componentDuration = componentIntervals * intervalDuration;
// Aug pull is 4s til first ebon might completion
const startTimeOffset = 4 * 1000;

const ignoredAbilities: { [key: number]: boolean } = { 425610: true };
const ignoredSpecs: { [key: string]: boolean } = { Blood: true, Holy: true, Discipline: true, Mistweaver: true, Brewmaster: true, Vengeance: true, Protection: true, Restoration: true, Preservation: true };

const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const transformAggregatedDataToChartData = (aggregatedDamage: { [key: string]: { [key: number]: number } }) => {
    const tableData: { [key: string]: string | number }[] = new Array(componentIntervals);
    let tableDataIndex = 0;

    for (let intervalIndex = 0; intervalIndex < componentIntervals; intervalIndex++) {
        const intervalStartMs = intervalIndex * intervalDuration + startTimeOffset;
        const intervalEndMs = intervalStartMs + intervalDuration;

        const playersDamage: [string, number][] = [];

        for (const playerName in aggregatedDamage) {
            const damage = aggregatedDamage[playerName][intervalIndex] || 0;
            playersDamage.push([playerName, damage]);
        }

        // Sort players by damage in descending order
        playersDamage.sort((a, b) => b[1] - a[1]);

        // Skip rows that only contain default data
        if (playersDamage.length === 0 || playersDamage[0][1] === 0) {
            continue;
        }

        const formattedTimeRange = `${formatTime(intervalStartMs)}-${formatTime(intervalEndMs)}`;
        const row: { [key: string]: string | number } = {
            Time: formattedTimeRange,
        };

        for (let i = 0; i < playersDamage.length; i++) {
            const [playerName, damage] = playersDamage[i];
            row[`Player ${i + 1}`] = `${playerName} - ${(damage / 1000000).toFixed(2)}m`;
        }

        tableData[tableDataIndex] = row;
        tableDataIndex++;
    }

    tableData.length = tableDataIndex; // Truncate the array to the actual number of rows

    return tableData;
};

const normalizeData = (data: { [key: string]: string | number }[]) => {
    const players: { [key: string]: string } = {};
    for (let i = 1; i <= 14; i++) {
        players[`Player ${i}`] = "-";
    }

    return data.map(item => {
        const normalizedItem: { [key: string]: string | number } = { Time: item.Time || "-", ...players };

        for (const key in item) {
            if (key !== "Time") {
                normalizedItem[key] = item[key];
            }
        }

        return normalizedItem;
    });
};

export default getComponent = () => {
    const aggregatedDamage: { [key: string]: { [key: number]: number } } = {};
    const playerFightCount: { [key: string]: number } = {};

    for (const fight of reportGroup.fights) {
        const ignoredActors: { [key: number]: boolean } = {};
        const startTime = fight.startTime + startTimeOffset;
        const endTime = startTime + componentDuration;

        for (const event of fight.allCombatantInfoEvents) {
            const actor = event.source;
            if (actor && ignoredSpecs[fight.specForPlayer(actor)]) {
                ignoredActors[actor.id] = true;
            } else {
                const playerName = actor?.name;
                if (playerName) {
                    if (!playerFightCount[playerName]) {
                        playerFightCount[playerName] = 0;
                    }
                    playerFightCount[playerName]++;
                }
            }
        }

        LOGGER.addMessage("ignoredActors", ignoredActors)

        const events = eventsByCategoryAndDisposition(fight, "damage", "friendly");
        const intervalEventIndexes: { [key: number]: { startIndex: number; endIndex: number } } = {};

        const binarySearch = (events: readonly RpgLogs.AnyEvent[], time: number, left: number, right: number) => {
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                const midTimestamp = events[mid].timestamp;

                if (midTimestamp < time) {
                    left = mid + 1;
                } else if (midTimestamp > time) {
                    right = mid - 1;
                } else {
                    return mid;
                }
            }

            return left;
        };

        const startIndex = binarySearch(events, startTime, 0, events.length - 1);
        const endIndex = binarySearch(events, endTime, startIndex, events.length - 1);

        for (let i = startIndex; i < endIndex; i++) {
            const event = events[i] as DamageEvent;

            const actor = event.source;
            if (actor) {
                const sourceId = actor.id;
                if (sourceId && ignoredActors[sourceId] ||
                    (actor.type === "Pet" &&
                        actor.petOwner &&
                        ignoredActors[actor.petOwner?.id])
                ) {
                    continue;
                }

                const abilityId = event.ability?.id;
                if (abilityId && ignoredAbilities[abilityId]) {
                    continue;
                }

                const isPet = actor.type === "Pet";
                const isPetWithOwner = isPet && actor.petOwner !== null;
                const playerName = isPetWithOwner ? actor.petOwner?.name : actor.name;
                const damage = event.amount;
                const intervalIndex = Math.floor((event.timestamp - startTime) / intervalDuration);

                if (!intervalEventIndexes[intervalIndex]) {
                    intervalEventIndexes[intervalIndex] = { startIndex: i, endIndex: i };
                } else {
                    intervalEventIndexes[intervalIndex].endIndex = i;
                }

                if (playerName && (isPetWithOwner || !isPet)) {
                    if (!aggregatedDamage[playerName]) {
                        aggregatedDamage[playerName] = {};
                        for (let j = 0; j < componentIntervals; j++) {
                            aggregatedDamage[playerName][j] = 0;
                        }
                    }

                    aggregatedDamage[playerName][intervalIndex] = (aggregatedDamage[playerName][intervalIndex] || 0) + damage;
                }
            }
        }
    }

    // Average the damage values based on the number of fights each player participated in
    for (const playerName in aggregatedDamage) {
        for (const intervalIndex in aggregatedDamage[playerName]) {
            aggregatedDamage[playerName][intervalIndex] /= playerFightCount[playerName];
        }
    }
    LOGGER.addMessage("aggregatedDamage", aggregatedDamage);

    const chartData = normalizeData(transformAggregatedDataToChartData(aggregatedDamage));

    LOGGER.addMessage("chartData", chartData);

    const playerNames = new Set<string>();
    for (const row of chartData) {
        for (const key in row) {
            if (key !== 'Time') {
                playerNames.add(key);
            }
        }
    }

    const columns: { [key: string]: { header: string; textAlign: 'center' } } = {
        Time: {
            header: 'Time',
            textAlign: 'center'
        }
    };
    for (const player of playerNames) {
        columns[player] = {
            header: player,
            textAlign: 'center'
        };
    }

    if (DEBUG) {
        return LOGGER.messages
    }

    return {
        component: 'Table',
        props: {
            columns: columns,
            data: chartData
        }
    };
};