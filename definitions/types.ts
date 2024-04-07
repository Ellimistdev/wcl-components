import { Classes } from './Classes';

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
