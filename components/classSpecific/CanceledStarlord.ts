import CustomLogger from "../../util/debugging/CustomLogger";
import throwError from "../../util/returnHelper/throwError";
import {eventsByCategoryAndDisposition} from "../../util/wrappers/getEventsByTypeAndDisposition";
import BuffManager from "../../util/managers/BuffManager";
import {RpgLogs} from "../../definitions/RpgLogs";

const STARLORD_BUFF_ID = 279709
const DEBUG = false
const logger = new CustomLogger(DEBUG)
const COMPONENT_NAME = "Canceled Starlord"


export default getComponent = () => {
    if (reportGroup.fights.length !== 1){
        return throwError(COMPONENT_NAME, "Please select a single fight")
    }

    const fight = reportGroup.fights[0]

    if (fight.combatantInfoEvents.length !== 1) {
        return throwError(COMPONENT_NAME, "Please select a single <Druid>")
    }

    const actor = fight.combatantInfoEvents[0].source
    if (!actor || actor.subType !== "Druid") {
        return throwError(COMPONENT_NAME, "Please select a single <Druid>")
    }

    const buffGained = eventsByCategoryAndDisposition(fight, "aurasGained", "friendly")
    const bm = new BuffManager(
        buffGained,
        {
            sourceFilters: [{idInReport: actor.idInReport}],
            auraIds: new Set([STARLORD_BUFF_ID]),
            captureEvent: true
        }
    )
    logger.addMessage("BuffManager", bm)

    if (!bm.actors[actor.id] || !bm.actors[actor.id].targets[actor.id] || !bm.actors[actor.id].targets[actor.id].buffs[STARLORD_BUFF_ID]) {
        return []
    }

    const timings = bm.actors[actor.id].targets[actor.id].buffs[STARLORD_BUFF_ID].sortedTimeSpans

    let canceledCount = 0
    const allDurations = []
    for (const [start, end] of timings){
        const duration = Math.round(end / 1000) - Math.round(start / 1000)
        const rawDuration = end / 1000 - start / 1000
        allDurations.push(rawDuration)
        if (duration < 15 && duration > 1){
            canceledCount++
        }
    }

    logger.addMessage("Applications", timings.length)
    logger.addMessage("Canceled", canceledCount)
    logger.addMessage("All Durations", allDurations)
    logger.addMessage("All Timings", timings)

    if (DEBUG){
        return logger.messages
    }

    const markdownReturn: RpgLogs.EnhancedMarkdownComponent = {
        component: "EnhancedMarkdown",
        props: {
            content: `
# <u>${COMPONENT_NAME} for <Druid>${actor.name}</Druid></u>
Detected Starlord applications: ${timings.length}


Starlord canceled: ${canceledCount}
`
        }
    }

    return markdownReturn

}