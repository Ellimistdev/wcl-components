// util/eventUtils.ts
import { RpgLogs } from "../definitions/RpgLogs";
import { EventFilter, MultiEventFilter, SingleEventFilter } from "../definitions/types";

export const isCastEvent = (event: RpgLogs.AnyEvent): event is RpgLogs.CastEvent => 
    event.type === 'damage';

export const isDamageEvent = (event: RpgLogs.AnyEvent): event is RpgLogs.DamageEvent => 
    event.type === 'damage';

export const isApplyDebuffEvent = (event: RpgLogs.AnyEvent): event is RpgLogs.ApplyDebuffEvent => 
    event.type === 'applydebuff';

export const isRemoveDebuffEvent = (event: RpgLogs.AnyEvent): event is RpgLogs.RemoveDebuffEvent => 
    event.type === 'removedebuff';

export const isMultiEventFilter = (filter: EventFilter): filter is MultiEventFilter => 
    filter.type === 'multi';

export const isSingleEventFilter = (filter: EventFilter): filter is SingleEventFilter =>
    filter.type !== 'multi';

export const getEventCategory = (filter: EventFilter): RpgLogs.EventCategory => {
    if (isMultiEventFilter(filter)) {
        // For multi-event filters, return category of first event
        return getEventCategory(filter.events[0]);
    }

    switch (filter.type) {
        case 'cast': return 'casts';
        case 'damage': return 'damage';
        case 'debuffApply': 
        case 'debuffRemove': 
            return 'aurasGained';
        default:
            throw new Error('Unsupported event type');
    }
};

const filterSingleEvent = (event: RpgLogs.AnyEvent, filter: SingleEventFilter): boolean => {
    if (!event.ability?.id) return false;
    if (event.ability.id !== filter.abilityId) return false;

    switch (filter.type) {
        case 'cast':
            return isCastEvent(event);
        case 'damage': 
            return isDamageEvent(event) && 
                   'isTick' in event && 
                   !event.isTick;
        case 'debuffApply': 
            return isApplyDebuffEvent(event);
        case 'debuffRemove': 
            return isRemoveDebuffEvent(event);
        default:
            return false;
    }
};

export const filterEvents = (events: ReadonlyArray<RpgLogs.AnyEvent>, filter: EventFilter): RpgLogs.AnyEvent[] => {
    // For multi-event filters, concatenate results of filtering each individual event type
    if (isMultiEventFilter(filter)) {
        return filter.events.flatMap(eventFilter => 
            Array.from(events).filter(event => 
                filterSingleEvent(event, eventFilter) &&
                (eventFilter.targetFilter ? eventFilter.targetFilter(event) : true)
            )
        );
    }

    // For single event filters
    return Array.from(events)
        .filter(event => filterSingleEvent(event, filter))
        .filter(event => filter.targetFilter ? filter.targetFilter(event) : true);
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