import { eventsByCategoryAndDisposition } from "../../util/wrappers/getEventsByTypeAndDisposition";
import { RpgLogs } from "../../definitions/RpgLogs";
import getClassColor from "../../util/getClassColor";
import DeathEvent = RpgLogs.DeathEvent;
import { Class } from "../../definitions/Template";

const RASHOK_ENCOUNTER_ID = 2680
const LAVA_WAVE_ID = 403543
const HEALTH_PERCENT_CUTOFF = 0.95
const MIN_FIGHT_DURATION = 1000 * 45
const LAVA_WAVE_ICON = "<AbilityIcon id={LAVA_WAVE_ID} icon=\"spell_shaman_lavasurge\">Lava Wave</AbilityIcon>"

export default getComponent = () => {

    const deathsWithLavaWaveContribution: NonNullable<DeathEvent["target"]>[] = []

    for (const fight of reportGroup.fights) {
        if (fight.encounterId !== RASHOK_ENCOUNTER_ID) {
            continue
        }

        const fightDuration = fight.endTime - fight.startTime
        if (fightDuration < MIN_FIGHT_DURATION) {
            continue
        }

        const deathOrResurrectionEvents = eventsByCategoryAndDisposition(fight, "deathsAndResurrects", "friendly")

        for (const deathEvent of deathOrResurrectionEvents) {
            if (deathEvent.type !== "death") {
                continue
            }
            if (!deathEvent.target || deathEvent.target.type !== "Player") {
                continue
            }
            if (deathEvent.isFeign) {
                continue
            }
            if (!deathEvent.killer) {
                continue
            }
            if (deathEvent.ability && deathEvent.ability.id === LAVA_WAVE_ID) {
                deathsWithLavaWaveContribution.push(deathEvent.target)
                continue
            }


            const eventsBeforeDeath = fight.eventsPriorToDeath(deathEvent)

            let killingBlow: RpgLogs.DamageEvent | undefined
            for (const event of eventsBeforeDeath) {
                // The last damage event that occurred before death has to be the killing blow
                if (!killingBlow && event.type === "damage") {
                    killingBlow = event
                }

                // If the player that died was healed above the HEALTH_PERCENT_CUTOFF between his death and the lava wave we assume the wave was irrelevant
                if (event.target?.idInReport === deathEvent.target.idInReport &&
                    event.targetResources &&
                    (event.targetResources.hitPoints / event.targetResources.maxHitPoints) >= HEALTH_PERCENT_CUTOFF) {
                    break
                }

                if (event.type === "damage" && event.ability?.id === LAVA_WAVE_ID) {
                    // If the killing blow overkill is bigger than the damage taken from the Lava Wave the Wave was irrelevant
                    if (killingBlow?.overkill && killingBlow.overkill >= event.amount) {
                        continue
                    }

                    deathsWithLavaWaveContribution.push(deathEvent.target)
                    break
                }
            }
        }
    }

    const deathCounts: Record<string, { "y": number, color: string }> = {}
    for (const death of deathsWithLavaWaveContribution) {
        const name = death.name
        if (deathCounts[name]) {
            deathCounts[name]["y"] += 1
            continue
        }
        deathCounts[name] = { y: 1, color: getClassColor(death.subType as Class) }
    }

    const sortList: [string, { "y": number, color: string }][] = []
    for (const actor in deathCounts) {
        sortList.push([actor, deathCounts[actor]])
    }

    sortList.sort((a, b) => {
        return b[1].y - a[1].y
    })

    const sortedDeathCounts: Record<string, { "y": number, color: string }> = {}
    sortList.forEach(entry => sortedDeathCounts[entry[0]] = entry[1])


    return {
        component: "Chart",
        props: {
            chart: {
                type: "column"
            },
            title: {
                text: `Deaths in which ${LAVA_WAVE_ICON} was involved`
            },
            xAxis: {
                categories: Object.keys(sortedDeathCounts),
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Death Count"
                },
                tickInterval: 1
            },
            series: [{
                name: "Deaths",
                data: Object.values(sortedDeathCounts),
                colorByPoint: true
            }]
        }
    }
}