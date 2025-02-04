// util/eventUtils.ts
import { RpgLogs } from "../definitions/RpgLogs";
import { EventFilter } from "../definitions/types";

export const isDamageEvent = (event: RpgLogs.AnyEvent): event is RpgLogs.DamageEvent => 
    event.type === 'damage';

export const isApplyDebuffEvent = (event: RpgLogs.AnyEvent): event is RpgLogs.ApplyDebuffEvent => 
    event.type === 'applydebuff';

export const isRemoveDebuffEvent = (event: RpgLogs.AnyEvent): event is RpgLogs.RemoveDebuffEvent => 
    event.type === 'removedebuff';

export const getEventCategory = (filter: EventFilter): RpgLogs.EventCategory => {
    switch (filter.type) {
        case 'damage': return 'damage';
        case 'debuffApply': 
        case 'debuffRemove': 
            return 'aurasGained';
    }
};

export const filterEvents = (events: ReadonlyArray<RpgLogs.AnyEvent>, filter: EventFilter): RpgLogs.AnyEvent[] => {
    return Array.from(events).filter(event => {
        if (!event.ability?.id) return false;
        if (event.ability.id !== filter.abilityId) return false;

        switch (filter.type) {
            case 'damage': 
                return isDamageEvent(event) && 
                       'isTick' in event && 
                       !event.isTick;
            case 'debuffApply': 
                return isApplyDebuffEvent(event);
            case 'debuffRemove': 
                return isRemoveDebuffEvent(event);
        }
    }).filter(event => filter.targetFilter ? filter.targetFilter(event) : true);
};

export function groupEventsByTime(
    events: ReadonlyArray<RpgLogs.AnyEvent>,
    overlap: boolean,
    windowSize: number
): Array<RpgLogs.AnyEvent[]> {
    if (!events.length) return [];
    
    const groups: RpgLogs.AnyEvent[][] = [];
    let currentGroup: RpgLogs.AnyEvent[] = [];
    let windowStart = events[0].timestamp;

    for (const event of events) {
        if (event.timestamp <= windowStart + windowSize) {
            currentGroup.push(event);
        } else {
            if (currentGroup.length > 0) {
                groups.push([...currentGroup]);
            }
            if (overlap) {
                windowStart = event.timestamp;
                currentGroup = [event];
            } else {
                windowStart += windowSize;
                currentGroup = [];
                if (event.timestamp <= windowStart + windowSize) {
                    currentGroup.push(event);
                }
            }
        }
    }

    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
}