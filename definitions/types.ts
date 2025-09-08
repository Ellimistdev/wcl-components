import { Classes } from './Classes';
import { RpgLogs } from './RpgLogs';

export const CLASSES: Classes = {
    DeathKnight: {
        color: '#C41E3A',
        specs: {
            Blood: { role: 'Tank' },
            Frost: { role: 'Dps' },
            Unholy: { role: 'Dps' },
        }
    },
    DemonHunter: {
        color: '#A330C9',
        specs: {
            Havoc: { role: 'Dps' },
            Vengeance: { role: 'Tank' },
        }
    },
    Druid: {
        color: '#FF7C0A',
        specs: {
            Balance: { role: 'Dps' },
            Feral: { role: 'Dps' },
            Guardian: { role: 'Tank' },
            Restoration: { role: 'Healer' },
        }
    },
    Evoker: {
        color: '#33937F',
        specs: {
            Devastation: { role: 'Dps' },
            Preservation: { role: 'Healer' },
        }
    },
    Hunter: {
        color: '#AAD372',
        specs: {
            BeastMastery: { role: 'Dps' },
            Marksmanship: { role: 'Dps' },
            Survival: { role: 'Dps' },
        }
    },
    Mage: {
        color: '#3FC7EB',
        specs: {
            Arcane: { role: 'Dps' },
            Fire: { role: 'Dps' },
            Frost: { role: 'Dps' },
        }
    },
    Monk: {
        color: '#00FF98',
        specs: {
            Brewmaster: { role: 'Tank' },
            Mistweaver: { role: 'Healer' },
            Windwalker: { role: 'Dps' },
        }
    },
    Paladin: {
        color: '#F48CBA',
        specs: {
            Holy: { role: 'Healer' },
            Protection: { role: 'Tank' },
            Retribution: { role: 'Dps' },
        }
    },
    Priest: {
        color: '#FFFFFF',
        specs: {
            Discipline: { role: 'Healer' },
            Holy: { role: 'Healer' },
            Shadow: { role: 'Dps' },
        }
    },
    Rogue: {
        color: '#FFF468',
        specs: {
            Assassination: { role: 'Dps' },
            Outlaw: { role: 'Dps' },
            Subtlety: { role: 'Dps' },
        }
    },
    Shaman: {
        color: '#0070DD',
        specs: {
            Elemental: { role: 'Dps' },
            Enhancement: { role: 'Dps' },
            Restoration: { role: 'Healer' },
        }
    },
    Warlock: {
        color: '#8788EE',
        specs: {
            Affliction: { role: 'Dps' },
            Demonology: { role: 'Dps' },
            Destruction: { role: 'Dps' },
        }
    },
    Warrior: {
        color: '#C69B6D',
        specs: {
            Arms: { role: 'Dps' },
            Fury: { role: 'Dps' },
            Protection: { role: 'Tank' },
        }
    },
}

export type Defensives = {
    [Class: string]: {
        [AbilityId: string]: Ability;
    };
};

export type BuffMap = {
    [targetName: string]: {
        [buffId: string]: {
            name: string;
            casts: { applied: number, removed: number | null }[];
        }
    }
};

export type Style = {
    color: string;
};

export type Label = {
    text: string;
    verticalAlign: string;
    textAlign: string;
    align?: string;
    y?: number;
    x?: number;
    style: Style;
};

export type VBar = {
    width: number;
    color: string;
    value?: number,
    label: Label | null;
};

export type InstantCasts = {
    [playerName: string]: {
        [abilityId: string]: {
            name: string;
            target: string;
            spellId: string;
            casts: any[]; // Replace 'any' with the appropriate type
            vbar: VBar;
        }
    }
};

export type ReferenceCasts = {
    [abilityId: string]: {
        color: string;
        text: string;
        verticalAlign?: string;
        y?: number;
    };
};

export type Ability = {
    name: string;
    duration: number;
    cooldown: number;
    color?: string,
    verticalAlign?: string,
    textAlign?: string,
    labelOffsetY?: number,
};

export interface HeartLocation {
    x: number;
    y: number;
    i: number;
    assignment: string;
    name: string;
    fightId: number;
    timestamp: string;
}

export interface PlayerAssignments {
    [key: string]: string;
}

export interface PlotLocation {
    x: number;
    y: number;
    i: number;
    fightId: number;
    timestamp: string;
    name?: string;
    targetId?: number;
    symbol?: PlotSymbol;
    isNPC?: boolean;
    isPlayer?: boolean;
    setStart?: number;
    eventStart?: number;
}

export interface PlotSymbol {
    enabled: boolean;
    symbol?: string;
    height?: number;
    width?: number;
}

export interface ChartSeries {
    name: string;
    data: PlotLocation[];
    tooltip: {
        headerFormat: string;
    };
}

export interface ChartBounds {
    Y_MIN: number; // sets base Y
    Y_MAX: number; // scales Y
    X_MIN: number; // sets base X
    X_MAX: number; // scales X
    NUDGE_X: number; // fine-tune X
    NUDGE_Y: number; // fine-tune Y
}

type BaseEventFilter = {
    abilityId: number;
    sourceFilter?: (event: RpgLogs.AnyEvent) => boolean;
    targetFilter?: (event: RpgLogs.AnyEvent) => boolean;
};

type SingleEventType = 'damage' | 'debuffApply' | 'debuffRemove' | 'cast';

export type SingleEventFilter = BaseEventFilter & {
    type: SingleEventType;
};

export type MultiEventFilter = {
    type: 'multi';
    events: SingleEventFilter[];
};

export type EventFilter = SingleEventFilter | MultiEventFilter;

export type SetDefinition = {
    triggerEvent: SingleEventFilter;
    plotEvent: EventFilter;
    window: number;
}

export interface EventPlotterConfig {
    bossEncounterId: number;
    setDefinition: SetDefinition;
    chartBounds: ChartBounds;
    title: string;
    background: string;
}
