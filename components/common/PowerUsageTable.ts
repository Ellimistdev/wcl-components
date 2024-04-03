import CustomLogger from "../../util/debugging/CustomLogger";
import { RpgLogs } from "../../definitions/RpgLogs";
import { eventsByCategoryAndDisposition } from "../../util/wrappers/getEventsByTypeAndDisposition";
import GetResourceName from "../../util/GetResourceName";
import CastEvent = RpgLogs.CastEvent;
import getAbilityMarkdown from "../../util/getAbilityMarkdown";

const COMPONENT_NAME = "Resource Usage"
const DEBUG = false
const LOGGER = new CustomLogger(DEBUG)
const CAPTURE_EVENTS = true

type Row = {
    actorName: string,
    ability: string,
    castCount: number
} & Record<string, unknown>

export default getComponent = () => {
    const allFightData: FightData[] = []
    const allRows: Row[][] = []
    const allColumns: Record<string, RpgLogs.TableColumn>[] = []
    const actorIdFilter = eventFilters.actorId
    for (const fight of reportGroup.fights) {
        const fightData = ParseFight(fight, actorIdFilter)
        const column = fightData.GetColumns()
        allFightData.push(fightData)
        allColumns.push(column)
        allRows.push(fightData.GetRows(column))
    }
    LOGGER.addMessage("Fight Data", allFightData)

    const columns = mergeColumns(allColumns)
    LOGGER.addMessage("Columns", columns)

    let data = mergeAllRows(allRows)
    if (allFightData.length > 1) {
        // we need to recalculate all the percentages
        data = updatePercentages(data, allFightData)
    }

    LOGGER.addMessage("Data Rows", data)


    const returnTable: RpgLogs.TableComponent = {
        component: "Table",
        props: {
            columns: {
                title: {
                    header: COMPONENT_NAME,
                    columns: columns
                },
            },
            data: data
        }
    }

    if (LOGGER.debug) {
        return LOGGER.messages
    }

    return returnTable
}

function updatePercentages(allRows: Row[], allFightData: FightData[]) {
    const completeResourceMap: Record<string, Record<string, number>> = {}

    // build a complete map for all fights and players
    for (const fightData of allFightData) {
        for (const player in fightData.players) {
            const resourcesUsed = fightData.players[player].getTotalResourcesUsed()
            if (!completeResourceMap[player]) {
                completeResourceMap[player] = resourcesUsed
            } else {
                for (const resourceName in resourcesUsed) {
                    completeResourceMap[player][resourceName] ??= 0
                    completeResourceMap[player][resourceName] += resourcesUsed[resourceName]
                }
            }
        }
    }

    for (const row of allRows) {
        const totalResourceUse = completeResourceMap[row.actorName]

        for (const columnHeader in row) {
            if (!columnHeader.endsWith("%")) {
                continue
            }
            const resourceName = columnHeader.slice(0, -1);
            const usageOfResourceInRow = row[resourceName]
            if (typeof usageOfResourceInRow === "number" && usageOfResourceInRow !== 0) {
                const percentage = usageOfResourceInRow / totalResourceUse[resourceName]
                row[columnHeader] = Math.round(percentage * 100)
            }
        }
    }

    return allRows
}

function ParseFight(fight: RpgLogs.Fight, actorIdFilter: number | undefined): FightData {
    const fightData = new FightData()
    const events = eventsByCategoryAndDisposition(fight, "casts", "friendly")
    for (const event of events) {

        if (event.type !== "cast")
            continue

        if (actorIdFilter && event.source?.id !== actorIdFilter) {
            continue
        }
        fightData.AddCastEvent(event)

    }
    return fightData
}

function mergeAllRows(rowLists: Row[][]): Row[] {
    // Create a map to hold rows by actorName and ability for faster lookup
    const map = new Map<string, Row>();

    // Process each row of each list
    rowLists.forEach(rows => {
        rows.forEach((row) => {
            const key = generateKey(row);
            mergeRowToMap(map, key, row);
        });
    });

    // Return the merged list
    return Array.from(map.values());
}

// A function to generate a unique key for each row based on actorName and ability
function generateKey(row1: Row): string {
    return `${row1.actorName}_${row1.ability}`;
}

// A function to merge a row into the existing map
// If a row with the same key exists, the new row will be merged into it
function mergeRowToMap(map: Map<string, Row>, key: string, row: Row) {
    let resultRow = map.get(key);

    if (resultRow) {
        mergeRows(resultRow, row);
    } else {
        resultRow = { ...row };
    }

    map.set(key, resultRow);
}

function mergeRows(row1: Row, row2: Row): Row {
    // Check if rows have the same actorName and ability
    if (row1.actorName === row2.actorName && row1.ability === row2.ability) {
        for (const prop in row1) {
            let value1 = row1[prop];
            let value2 = row2[prop];

            // If one value is string and the other is number, try converting string to float
            if (typeof value1 === 'string' && typeof value2 === 'number') {
                value1 = parseFloat(value1);
            } else if (typeof value2 === 'string' && typeof value1 === 'number') {
                value2 = parseFloat(value2);
            }

            // If both values are numbers, sum them
            if (typeof value1 === 'number' && typeof value2 === 'number') {
                row1[prop] = value1 + value2;
            }
            // If both values are strings, try to parse them
            else if (typeof value1 === 'string' && typeof value2 === 'string') {
                const parsed1 = parseFloat(value1);
                const parsed2 = parseFloat(value2);
                if (!isNaN(parsed1) && !isNaN(parsed2)) {
                    row1[prop] = parsed1 + parsed2;
                }
            }
        }

        return row1;
    } else {
        throw new Error('Row objects must have the same actorName and ability');
    }
}

function mergeColumns(columnsList: Array<Record<string, RpgLogs.TableColumn>>): Record<string, RpgLogs.TableColumn> {
    let mergedColumns: Record<string, RpgLogs.TableColumn> = {};

    for (let columns of columnsList) {
        mergedColumns = { ...mergedColumns, ...columns };
    }

    return mergedColumns;
}



class FightData {
    public readonly players: Record<string, ActorData> = {}
    public readonly AbilitiesUsed: Record<string, RpgLogs.Ability> = {}

    public AddCastEvent(event: RpgLogs.CastEvent) {
        if (!event.source) {
            return
        }
        if (event.source.type === "Pet") {
            return;
        }
        if (!event.ability) {
            return;
        }
        this.AbilitiesUsed[event.ability.name] = event.ability
        this.players[event.source.name] ??= new ActorData()
        this.players[event.source.name].AddCastEvent(event)
    }

    GetColumns(): Record<string, RpgLogs.TableColumn> {
        const columns: ReturnType<typeof this.GetColumns> = {
            actorName: {
                header: "Player Name",
                textAlign: "center"
            },
            ability: {
                header: "Ability Name",
                textAlign: "center"
            },
            castCount: {
                header: "Casts",
                textAlign: "center"
            }
        }

        const allResourcesInvolved: Set<string> = new Set()
        for (const actor of Object.values(this.players)) {
            for (const ability of Object.values(actor.abilityDataByName)) {
                for (const resourceName in ability.totalResourcesUsed) {
                    allResourcesInvolved.add(resourceName)
                }
            }
        }

        for (const resourceName of allResourcesInvolved) {
            columns[resourceName] = {
                header: resourceName,
                textAlign: "center"
            }
            columns[resourceName + "%"] = {
                header: resourceName + "%",
                textAlign: "center"
            }
        }

        return columns
    }

    GetRows(columns: Record<string, RpgLogs.TableColumn>): Row[] {
        const dataRows: ReturnType<typeof this.GetRows> = []

        for (const playerName in this.players) {
            const totalUsed = this.players[playerName].getTotalResourcesUsed()

            for (const abilityName in this.players[playerName].abilityDataByName) {
                const abilityData = this.players[playerName].abilityDataByName[abilityName]
                const row: Row = {
                    actorName: playerName,
                    ability: getAbilityMarkdown(this.AbilitiesUsed[abilityName]),
                    castCount: abilityData.Casts
                }
                for (const resourceName in abilityData.totalResourcesUsed) {
                    const resourceUsedDisplay = abilityData.totalResourcesUsed[resourceName] ? abilityData.totalResourcesUsed[resourceName] : 0
                    const resourcePercentDisplay = totalUsed[resourceName] ? Math.round((abilityData.totalResourcesUsed[resourceName] / totalUsed[resourceName]) * 100) : 0
                    row[resourceName] = resourceUsedDisplay
                    row[resourceName + "%"] = resourcePercentDisplay
                }

                for (const columnKey in columns) {
                    row[columnKey] ??= 0
                }

                dataRows.push(row)
            }
        }


        return dataRows
    }
}

class ActorData {
    public readonly abilityDataByName: Record<string, AbilityData> = {}

    public getTotalResourcesUsed() {
        const totalUsed: Record<string, number> = {}

        for (const ability of Object.values(this.abilityDataByName)) {
            for (const resourceName in ability.totalResourcesUsed) {
                totalUsed[resourceName] ??= 0
                totalUsed[resourceName] += ability.totalResourcesUsed[resourceName]
            }
        }

        return totalUsed
    }

    public AddCastEvent(event: RpgLogs.CastEvent) {
        if (!event.ability) {
            return
        }

        this.abilityDataByName[event.ability.name] ??= new AbilityData(event.ability.name)
        this.abilityDataByName[event.ability.name].AddCastEvent(event)
    }
}

class AbilityData {
    public readonly totalResourcesUsed: Record<string, number> = {}
    public readonly Name: string
    public Casts = 0
    private events: CastEvent[] = []

    constructor(name: string) {
        //LOGGER.addMessage("AbilityData:ctor", this)
        if (CAPTURE_EVENTS) {
            LOGGER.addMessage("CastEvents " + name, this.events)
        }
        this.Name = name
    }

    public AddCastEvent(event: RpgLogs.CastEvent) {

        if (!event.sourceResources) {
            return
        }
        if (CAPTURE_EVENTS) {
            this.events.push(event)
        }

        this.Casts++

        this.ParseClassResource(event.sourceResources)
    }

    ParseClassResource(resourceData: RpgLogs.ResourceData) {
        if (resourceData.resourceType !== 0 && !resourceData.resourceType) {
            return
        }

        const resourceName = GetResourceName(resourceData.resourceType)
        this.totalResourcesUsed[resourceName] ??= 0
        this.totalResourcesUsed[resourceName] += resourceData.resourceCost

        if (resourceData.additionalResources) {
            this.ParseAdditionalResources(resourceData.additionalResources)
        }
    }

    ParseAdditionalResources(classResource: RpgLogs.ClassResource) {
        if (!classResource.resourceType) {
            return
        }


        const resourceName = GetResourceName(classResource.resourceType)
        this.totalResourcesUsed[resourceName] ??= 0
        this.totalResourcesUsed[resourceName] += classResource.resourceAmount

        if (classResource.next) {
            this.ParseAdditionalResources(classResource.next)
        }
    }

}