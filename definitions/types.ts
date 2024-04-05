import { Classes } from './Classes';

export const CLASSES: Classes = {
    DeathKnight: {
        Blood: { role: 'Tank' },
        Frost: { role: 'Dps' },
        Unholy: { role: 'Dps' },
    },
    DemonHunter: {
        Havoc: { role: 'Dps' },
        Vengeance: { role: 'Tank' },
    },
    Druid: {
        Balance: { role: 'Dps' },
        Feral: { role: 'Dps' },
        Guardian: { role: 'Tank' },
        Restoration: { role: 'Healer' },
    },
    Evoker: {
        Devastation: { role: 'Dps' },
        Preservation: { role: 'Healer' },
    },
    Hunter: {
        BeastMastery: { role: 'Dps' },
        Marksmanship: { role: 'Dps' },
        Survival: { role: 'Dps' },
    },
    Mage: {
        Arcane: { role: 'Dps' },
        Fire: { role: 'Dps' },
        Frost: { role: 'Dps' },
    },
    Monk: {
        Brewmaster: { role: 'Tank' },
        Mistweaver: { role: 'Healer' },
        Windwalker: { role: 'Dps' },
    },
    Paladin: {
        Holy: { role: 'Healer' },
        Protection: { role: 'Tank' },
        Retribution: { role: 'Dps' },
    },
    Priest: {
        Discipline: { role: 'Healer' },
        Holy: { role: 'Healer' },
        Shadow: { role: 'Dps' },
    },
    Rogue: {
        Assassination: { role: 'Dps' },
        Outlaw: { role: 'Dps' },
        Subtlety: { role: 'Dps' },
    },
    Shaman: {
        Elemental: { role: 'Dps' },
        Enhancement: { role: 'Dps' },
        Restoration: { role: 'Healer' },
    },
    Warlock: {
        Affliction: { role: 'Dps' },
        Demonology: { role: 'Dps' },
        Destruction: { role: 'Dps' },
    },
    Warrior: {
        Arms: { role: 'Dps' },
        Fury: { role: 'Dps' },
        Protection: { role: 'Tank' },
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
