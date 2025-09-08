export interface DisplayInfo {
    color: string;
    text: string;
    textAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    x?: number;
    y?: number;
    priority?: number; // For chart layering
}

// Different event types that can occur for a single mechanic
type SpellEventType =
    | 'beginCast'     // Begin casting event
    | 'cast'          // Cast completed event  
    | 'damage'        // Damage taken event
    | 'damageTick'    // Individual damage tick
    | 'damageBurst'   // Large damage burst
    | 'buffApply'     // Buff application
    | 'buffRemove'    // Buff removal
    | 'debuffApply'   // Debuff application  
    | 'debuffRemove'  // Debuff removal
    | 'channelStart'  // Channel start
    | 'channelEnd'    // Channel end
    | 'interrupt'     // Spell interrupt
    | 'reflect'       // Spell reflect
    | 'absorb'        // Damage absorbed
    | 'heal'          // Healing event
    | 'summon'        // Summon add/object
    | 'dispel'        // Dispel effect
    | 'trigger'       // Triggers another effect
    | 'auraRefresh';  // Aura refresh

export interface AbilityData {
    id: number;
    name: string;
    description: string;
    castTime?: number; // in milliseconds, undefined for instant
    channeled?: boolean;
    duration?: number; // for buffs/debuffs
    tickInterval?: number; // for periodic effects

    damage?: DamageInfo;
    aura?: AuraInfo;
    relatedEvents?: RelatedEvent[];  // Related spell events
    eventSequence?: EventSequence;  // Event patterns for complex mechanics
    
    usageHints?: {
        defensiveTiming?: 'proactive' | 'reactive' | 'during';
        plotImportance?: 'primary' | 'secondary' | 'detail';
        timelineRelevant?: boolean;
        category?: 'tank' | 'raid' | 'positioning' | 'interrupt' | 'dispel';
    };
    
    display?: DisplayInfo;
}

export interface SpellEvent {
    spellId: number;
    eventType: SpellEventType;
    description?: string;
    notes?: string;

    // Timing information
    castTime?: number;
    duration?: number;
    tickInterval?: number;

    // Relationship to other events
    triggeredBy?: number;  // Spell ID that triggers this
    triggers?: number[];   // Spell IDs this triggers

    // Event-specific metadata
    damage?: DamageInfo;

    aura?: AuraInfo;

    // Component usage hints
    usageHints?: {
        defensiveTiming?: 'proactive' | 'reactive' | 'during';
        plotImportance?: 'primary' | 'secondary' | 'detail';
        timelineRelevant?: boolean;
    };

    display?: DisplayInfo;
}

export interface DamageInfo {
    amount?: number;
    school?: string;
    canCrit?: boolean;
    splitDamage?: boolean;
};

export interface AuraInfo {
    stackable?: boolean;
    maxStacks?: number;
    dispellable?: boolean;
};

export interface Mechanic {
    name: string;
    description?: string;
    events: Record<string, SpellEvent>;
    patterns?: EventSequence;

    metadata?: {
        phase?: number;
        frequency?: string;
        priority?: 'high' | 'medium' | 'low';
        category?: 'tank' | 'raid' | 'positioning' | 'interrupt' | 'dispel';
    };

    display?: {
        primaryColor?: string;
        icon?: string;
        chartStyle?: 'line' | 'area' | 'marker' | 'background';
    };
}

export interface RelatedEvent {
    spellId: number;
    eventType: SpellEventType;
    description?: string;
    notes?: string;
    castTime?: number;
    duration?: number;
    triggeredBy?: number;  // Spell ID that triggers this event
    triggersMain?: boolean; // This event triggers the main ability
}

export interface EventSequence {
    fullSequence?: string[];      // Complete event order
    damageEvents?: string[];      // All damage-related events
    castEvents?: string[];        // All cast-related events
    auraEvents?: string[];        // All aura-related events
    defensiveTimings?: string[];  // Events relevant for defensive timing
};

export interface EncounterData {
    name: string;
    encounterId: number;
    difficulty?: number;
    entities: Record<string, EnemyEntity>;
    phases?: PhaseData[];
    metadata?: EncounterMetaData;
}

export interface EncounterMetaData {
    bossNumber: number;
    raidTier: string;
    releaseDate?: string;
    mythicUnlocked?: string;
    roles?: ('tank' | 'healer' | 'dps')[];
    description?: string;
    strategy?: string;
}

export interface EnemyEntity {
    id: number;
    alternateIds?: number[];
    name: string;
    type: 'main_boss' | 'mini_boss' | 'add' | 'environmental';
    phases?: number[]; 
    
    abilities: {
        damage: Record<string, AbilityData>;
        buffs: Record<string, AbilityData>;
        casts: Record<string, AbilityData>;
    };
}

export interface PhaseData {
    name: string;
    number: number;
    type?: string;
    activeEntities: string[];
    mechanics: string[];
    description?: string;
    triggers?: PhaseTrigger;
    transition?: PhaseTransition;
}

export interface PhaseTrigger {
    healthPercent?: number;
    energyPercent?: number;
    timeElapsed?: number;
    spellId?: number;
}

export interface PhaseTransition {
    from?: number;
    to: number;
    triggerType: 'health' | 'energy' | 'time' | 'spell';
    triggerValue: number;
    description?: string;
}
