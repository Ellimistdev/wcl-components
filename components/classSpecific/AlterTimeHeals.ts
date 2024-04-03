import { eventsByCategoryAndDisposition } from "../../util/wrappers/getEventsByTypeAndDisposition";
import BuffManager from "../../util/managers/BuffManager";
import HealthManager from "../../util/managers/HealthManager";
import { RpgLogs } from "../../definitions/RpgLogs";
import throwError from "../../util/returnHelper/throwError";
import timestampToTime from "../../util/timestampToTime";
import CustomLogger from "../../util/debugging/CustomLogger";

type Row = {
    timestamp: number | string,
    amount: string
}

const COMPONENT_NAME = "Alter Time Healing"
const DEBUG = false
const db = new CustomLogger(DEBUG)
const ALTER_TIME_BUFF_ID = 342246
const ALTER_TIME_ID = 342247
const ALTER_TIME_ICON = "<AbilityIcon id={ALTER_TIME_ID} icon=\"spell_mage_altertime.jpg\">Alter Time</AbilityIcon>"


export default getComponent = () => {
    if (reportGroup.fights.length !== 1) {
        return throwError(COMPONENT_NAME, "Please select a single fight")
    }

    const fight = reportGroup.fights[0]

    if (fight.combatantInfoEvents.length === 0) {
        return throwError(COMPONENT_NAME, "Sadly this component relies on real encounters and won't work with trash fights.")
    }

    if (fight.combatantInfoEvents.length !== 1) {
        return throwError(COMPONENT_NAME, "Please select a single <Mage>")
    }

    const actor = fight.combatantInfoEvents[0].source
    if (!actor || actor.subType !== "Mage") {
        return throwError(COMPONENT_NAME, "Please select a single <Mage>")
    }

    const heals = getAlterTimeHeals(fight, actor)

    const noAlterTimeComponent: RpgLogs.EnhancedMarkdownComponent = {
        component: "EnhancedMarkdown",
        props: {
            content: `
# ${COMPONENT_NAME}
<Mage>${actor.name}</Mage> did not use ${ALTER_TIME_ICON} or all usages got canceled.
`
        }
    }

    if (heals.length === 0) {
        return noAlterTimeComponent
    }

    const alterTimeHealingTable: RpgLogs.TableComponent = {
        component: "Table",
        props: {
            columns: {
                title: {
                    header: `<a href="https://www.wowhead.com/spell=342245">Alter Time</a> Healing Done by <Mage>${actor.name}</Mage>`,
                    columns: {
                        timestamp: {
                            header: "Timestamp",
                            textAlign: "center"
                        },
                        amount: {
                            header: "Amount",
                            textAlign: "center"
                        }
                    }
                }
            },
            data: heals
        }
    }

    if (DEBUG) {
        return db.messages
    }

    return alterTimeHealingTable
}



function getAlterTimeHeals(fight: RpgLogs.Fight, actor: RpgLogs.Actor): Row[] {
    const gained = eventsByCategoryAndDisposition(fight, "aurasGained", "friendly")
    const bm = new BuffManager(gained, {
        sourceFilters: [{ idInReport: actor.idInReport }],
        auraIds: new Set([ALTER_TIME_BUFF_ID]),
        captureEvent: true
    })
    db.addMessage("BuffManager", bm)

    const health = eventsByCategoryAndDisposition(fight, "healing", "friendly")
    const damage = eventsByCategoryAndDisposition(fight, "damage", "enemy")
    const hm = new HealthManager([health, damage], db, { targetFilters: [{ idInReport: actor.idInReport }] })

    if (!bm.actors[actor.id] || !bm.actors[actor.id].targets[actor.id] || !bm.actors[actor.id].targets[actor.id].buffs[ALTER_TIME_BUFF_ID]) {
        return []
    }

    const timings = bm.actors[actor.id].targets[actor.id].buffs[ALTER_TIME_BUFF_ID].sortedTimeSpans
    const heals: Row[] = []
    let overall = 0

    for (const [start, end] of timings) {
        let startHealth = hm.getHealth(actor.idInReport, start, "before")
        const endHealth = hm.getHealth(actor.idInReport, end, "before")
        db.addMessage("AT", { startHealth, endHealth, start, end })
        const duration = Math.round(end / 1000) - Math.round(start / 1000)

        if (duration < 10 && !isRecast(fight, actor, end)) {
            db.addMessage("canceled", `AT Skipped at ${timestampToTime(end - fight.startTime)}, ${start} - ${end}`)
            continue
        }

        const healingAmount = startHealth - endHealth
        overall += healingAmount
        const amount = healingAmount >= 0 ? healingAmount + "" : `<span style='color:red'>${healingAmount}</span>`

        const time = timestampToTime(end - fight.startTime)
        const timestamp = healingAmount >= 0 ? time + "" : `<span style='color:red'>${time}</span>`

        heals.push({ timestamp: timestamp, amount: amount })
    }
    const formattedOverall = overall >= 0 ? `<span style='font-weight: bold'>${overall}</span>` : `<span style='color:red; font-weight: bold'>${overall}</span>`
    const overallTimestamp = overall >= 0 ? `<span style='font-weight: bold'>overall</span>` : `<span style='color:red; font-weight: bold'>overall</span>`
    heals.push({ timestamp: overallTimestamp, amount: formattedOverall })

    return heals
}

function isRecast(fight: RpgLogs.Fight, actor: RpgLogs.Actor, endTime: number) {
    const casts = eventsByCategoryAndDisposition(fight, "casts", "friendly")

    for (const cast of casts) {
        if (!cast.ability || cast.ability.id !== ALTER_TIME_ID) {
            continue
        }
        if (!cast.source || cast.source.idInReport !== actor.idInReport) {
            continue
        }

        if (cast.timestamp === endTime) {
            return true
        }
    }
    return false
}
