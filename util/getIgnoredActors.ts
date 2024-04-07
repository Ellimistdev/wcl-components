import { RpgLogs } from "../definitions/RpgLogs";
import { Role, Spec } from "../definitions/Classes";
import getActorRole from "./getActorRole";
import CustomLogger from "./debugging/CustomLogger";

export function getIgnoredActors(fight: RpgLogs.Fight, 
    playerFightCount: { [key: string]: number; },
    ignoredRoles: Partial<{ [role in Role]: boolean }>,
    ignoredSpecs: Partial<{ [spec in Spec]: boolean }>,
    LOGGER: CustomLogger) {
    const ignoredActors: { [key: number]: boolean; } = {};

    for (const event of fight.allCombatantInfoEvents) {
        const actor = event.source;
        if (actor && (ignoredRoles[getActorRole(fight, actor) as Role] ||
            ignoredSpecs[fight.specForPlayer(actor) as Spec])) {
            ignoredActors[actor.id] = true;
        } else {
            const playerName = actor?.name;
            if (playerName) {
                if (!playerFightCount[playerName]) {
                    playerFightCount[playerName] = 1;
                }
                playerFightCount[playerName]++;
            }
        }
    }

    LOGGER.addMessage("ignoredActors", ignoredActors);
    return ignoredActors;
}
