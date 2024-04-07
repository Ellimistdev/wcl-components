import { RpgLogs } from "../definitions/RpgLogs";
import { CLASSES } from "../definitions/types";
import { ClassName, Spec } from "../definitions/Classes";
import Actor = RpgLogs.Actor;
import Fight = RpgLogs.Fight;

export default function getActorRole(fight: Fight, actor: Actor) {
    const actorClass = actor.subType;
    const spec = fight.specForPlayer(actor);
    if (actorClass in CLASSES && spec) {
        const classDetails = CLASSES[actorClass as ClassName];
        const specs = classDetails.specs;
        if (spec in specs) {
            return specs[spec as Spec]?.role;
        }
    }
}