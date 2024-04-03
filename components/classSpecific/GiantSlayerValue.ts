import throwError from "../../util/returnHelper/throwError";
import BuffManager from "../../util/managers/BuffManager";
import { eventsByCategoryAndDisposition } from "../../util/wrappers/getEventsByTypeAndDisposition";
import { RpgLogs } from "../../definitions/RpgLogs";
import CustomLogger from "../../util/debugging/CustomLogger";
import { IsInTimeSpan } from "../../util/managers/IsInTimeSpan";

const COMPONENT_NAME = "Mastery: Giant Slayer Value"
const DRAGON_RAGE_BUFF_ID = 375087
const TYRANNY_ID = 376888
const HAS_TYRANNY: Record<string, boolean> = {}
const SPELL_WHITELIST: Set<number> = new Set([
    361500, // "Living Flame"
    370452, // "Shattering Star"
    357212, // "Pyre"
    357209, // "Fire Breath"
    359077, // "Eternity Surge"
    356995, // "Disintegrate"
    362969, // "Azure Strike"
    353759, // "Deep Breath"
    1, // "Melee"
    368847, // "Firestorm"
    382411, // "Unravel"
])
const DEEP_BREATH_ID = 357210
const BASE_MASTERY_PERCENT = 22.5;
const MASTER_POINTS_PER_PERCENT = 72;
const TYRANNY_ICON = "<AbilityIcon id={376888} icon=\"ability_evoker_dragonrage2.jpg\">Tyranny</AbilityIcon>"
const GIANT_SLAYER_ICON = "<AbilityIcon id={362980} icon=\"ability_evoker_masterygiantkiller.jpg\">Mastery: Giant Slayer</AbilityIcon>"
const DRAGON_RAGE_ID = 375087
const DRAGON_RAGE_ICON = `<AbilityIcon id=${DRAGON_RAGE_ID} icon='ability_evoker_dragonrage.jpg'>Dragon Rage</AbilityIcon>`
const DEBUG = false
const db = new CustomLogger(DEBUG)
db.addMessage("HasTyranny", HAS_TYRANNY)

export default getComponent = () => {
    if (reportGroup.fights.length !== 1) {
        return throwError(COMPONENT_NAME, "Please select a single fight")
    }

    const fight = reportGroup.fights[0]

    if (fight.combatantInfoEvents.length === 0) {
        return throwError(COMPONENT_NAME, "Sadly this component relies on real encounters and won't work with trash fights.")
    }

    if (fight.combatantInfoEvents.length !== 1) {
        return throwError(COMPONENT_NAME, "Please select a single <Evoker>Devastation Evoker</Evoker>")
    }

    const actor = fight.combatantInfoEvents[0].source
    if (!actor || fight.specForPlayer(actor) !== "Devastation") {
        return throwError(COMPONENT_NAME, "Please select a single <Evoker>Devastation Evoker</Evoker>")
    }

    const buffs = eventsByCategoryAndDisposition(fight, "aurasGained", "friendly")
    const bm = new BuffManager(buffs, {
        sourceFilters: [{ idInReport: actor.idInReport }],
        auraIds: new Set([DRAGON_RAGE_BUFF_ID])
    })

    const damageEvents = eventsByCategoryAndDisposition(fight, "damage", "friendly")
    const damageSummaries = getDamageSummaries(damageEvents, fight.combatantInfoEvents[0], bm)
    db.addMessage("damageSummaries", damageSummaries)

    let averageMasteryValueWithTyranny = 0
    let averageMasteryValue = 0
    let damageGainByTyranny = 0



    const masteryPercent = ((fight.combatantInfoEvents[0].stats.mastery / MASTER_POINTS_PER_PERCENT) + BASE_MASTERY_PERCENT) / 100
    db.addMessage("masteryPercent", masteryPercent)


    for (const damageSummary of damageSummaries) {
        if (hasTyranny(fight.combatantInfoEvents[0]) && (damageSummary.hasDragonrage || damageSummary.isDeepBreath)) {
            averageMasteryValueWithTyranny += 1
            let baseDamage = (damageSummary.damageDone / (1 + masteryPercent))
            let damageWithoutTyranny = baseDamage * (masteryPercent * damageSummary.healthPercent + 1)
            let tyrannyDamageGain = damageSummary.damageDone - damageWithoutTyranny
            damageGainByTyranny += tyrannyDamageGain

        } else {
            averageMasteryValueWithTyranny += damageSummary.healthPercent
        }
        averageMasteryValue += damageSummary.healthPercent

    }

    db.addMessage("hasTyranny", hasTyranny(fight.combatantInfoEvents[0]))
    db.addMessage("damageGainByTyranny", damageGainByTyranny)

    const dpsGain = damageGainByTyranny / ((fight.endTime - fight.startTime) / 1000)
    db.addMessage("dpsGain", dpsGain)


    averageMasteryValue /= damageSummaries.length
    const averageMasteryValueDisplay = (averageMasteryValue * 100).toFixed(2)
    db.addMessage("averageMasteryValue", averageMasteryValue)

    averageMasteryValueWithTyranny /= damageSummaries.length
    const averageMasteryValueWithTyrannyDisplay = (averageMasteryValueWithTyranny * 100).toFixed(2)
    db.addMessage("averageMasteryValueWithTyranny", averageMasteryValueWithTyranny)


    const masteryPercentDisplay = (masteryPercent * 100).toFixed(2)
    const damagePercentGain = (averageMasteryValue * masteryPercent * 100).toFixed(2)
    const damagePercentGainWithTyranny = (averageMasteryValueWithTyranny * masteryPercent * 100).toFixed(2)

    const dragonRageBuff = bm.getSelfBuff(actor.idInReport, DRAGON_RAGE_BUFF_ID)
    const duration = dragonRageBuff.getFullDuration(fight)

    const markdownComponent: RpgLogs.EnhancedMarkdownComponent = {
        component: "EnhancedMarkdown",
        props: {
            content: `
# <u>${COMPONENT_NAME} for <Evoker>${actor.name}</Evoker></u>
On average ${averageMasteryValueWithTyrannyDisplay}% (${averageMasteryValueDisplay}% without ${TYRANNY_ICON}) of ${GIANT_SLAYER_ICON} got applied.

With your Mastery of ${fight.combatantInfoEvents[0].stats.mastery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (${masteryPercentDisplay}%) and ${DRAGON_RAGE_ICON} duration of ${(duration / 1000).toFixed(0)} seconds ${TYRANNY_ICON} gained you ${dpsGain.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DPS, assuming your mastery did not change during the Encounter.

Overall ${GIANT_SLAYER_ICON} increased your damage by roughly ${damagePercentGainWithTyranny}% (${damagePercentGain}%).
`
        }
    }

    if (DEBUG) {
        return db.messages
    }

    return markdownComponent
}

/**
 * Determines if the given evoker has Tyranny talented.
 * Results are cached on a per Evoker basis to prevent multiple enumeration of the talent tree.
 * @param combatantInfo
 */
function hasTyranny(combatantInfo: RpgLogs.CombatantInfoEvent) {
    if (!combatantInfo.source) {
        throw new Error("Combatant Info Event was incomplete")
    }

    if (HAS_TYRANNY[combatantInfo.source.idInReport]) {
        return HAS_TYRANNY[combatantInfo.source.idInReport]
    }

    const tyrannyNode = combatantInfo.talentTree.find(treeNode => treeNode.spellId === TYRANNY_ID)
    HAS_TYRANNY[combatantInfo.source.idInReport] = !!tyrannyNode
    return HAS_TYRANNY[combatantInfo.source.idInReport]
}

type DamageSummary = {
    damageDone: number,
    hasDragonrage: boolean,
    isDeepBreath: boolean,
    healthPercent: number,
    timestamp: number,
}

function getDamageSummaries(damageEvents: ReadonlyArray<RpgLogs.DamageEvent>, combatantInfo: RpgLogs.CombatantInfoEvent, buffManager: BuffManager) {
    if (!combatantInfo.source) {
        throw new Error("Combatant Source was missing")
    }

    const dragonRageBuff = buffManager.getSelfBuff(combatantInfo.source.idInReport, DRAGON_RAGE_BUFF_ID)
    const timeSpanManager = new IsInTimeSpan(dragonRageBuff)
    db.addMessage("dragonRageBuff", dragonRageBuff.sortedTimeSpans)
    const damageSummaries: Array<DamageSummary> = []

    for (const damageEvent of damageEvents) {
        if (!damageEvent.source || !damageEvent.ability || !damageEvent.targetResources) {
            continue
        }
        if (damageEvent.source.idInReport !== combatantInfo.source.idInReport) {
            continue
        }
        if (!damageEvent.amount) {
            continue
        }
        if (!SPELL_WHITELIST.has(damageEvent.ability.id)) {
            continue
        }


        const healthPercent = damageEvent.targetResources.hitPoints / damageEvent.targetResources.maxHitPoints
        const isDeepBreath = damageEvent.ability.id === DEEP_BREATH_ID
        const damageDone = damageEvent.amount
        const hasDragonrage = timeSpanManager.isInTimeSpan(damageEvent.timestamp)

        damageSummaries.push({ healthPercent, damageDone, hasDragonrage, isDeepBreath, timestamp: damageEvent.timestamp })
    }

    return damageSummaries
}