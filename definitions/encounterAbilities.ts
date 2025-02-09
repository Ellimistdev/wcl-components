export namespace EncounterAbilities {
    export namespace Aberrus {
        export enum Rashok {
            ChargedSmash = 400777,
            AncientFury = 405316,
            SearingSlam = 405821,
            Intermission = 406165,
            ShadowlavaBlast = 406333
        }

        export enum Zskarn {
            TacticalDestruction = 406678,
            BlastWave = 403978,
            Traps1 = 411188,
            Traps2 = 405736,
            Bomb = 406725,
            UnstableEmbers = 404007
        }

        export enum Nymue {
            FullBloom = 426775,
            Unravel = 421368
        }

        export enum Tindral {
            FallingStar = 420236,
            MassEntanglement = 428695,
            Supernova = 424140,
            SeedOfFlame = 423265,
            FieryGrowth = 424581,
            Sunflame = 420240
        }

        export enum Sarkareth {
            MassDisintegrate = 401642,
            GlitteringSurge = 401819,
            SearingBreath = 402051
        }
    }

    export namespace NerubarPalace {
        export enum UlgraxTheDevourer { }

        export enum TheBloodboundHorror { }

        export enum SikranCaptainOfTheSurki { }

        export enum Rashanan { }

        export enum BroodtwisterOvinax { }

        export enum NexusPrincessKyveza {
            TwilightMassacreCharge = 438139, // Charge
            TwilightMassacrePlayerTargeted = 438141, // Targeted Debuff
            TwilightMassacreDamageEvent = 438145, // Damage event
            TwilightMassacreGhostTargeting = 438153, // Targeting
            TwilightMassacre = 438245, // Initial cast
            Queensbane = 437343,       // Debuff 
            Regicide1 = 435534,        // Debuff
            Regicide2 = 436596,        // nothing?
            Regicide3 = 436663,        // Debuff
            Regicide4 = 436664,        // Debuff
            Regicide5 = 436665,        // Debuff
            Regicide6 = 436666,        // Debuff
            Regicide7 = 436671,        // Debuff
            RegicideDamageEvent = 436787,        // Damage taken
        }
        
        export enum TheSilkenCourt { }

        export enum QueenAnsurek { }
    }
}

// Companion type for the styling information
export type AbilityStyle = {
    color: string;
    text: string;
    verticalAlign?: "bottom";
    y?: number;
}

export function createAbilityStyle(text: string, color: string, options?: Partial<AbilityStyle>): AbilityStyle {
    return { color, text, ...options};
}

// Style information mapping
export const AbilityStyles: Record<number, AbilityStyle> = {
    [EncounterAbilities.Aberrus.Rashok.ChargedSmash]: createAbilityStyle('Charged Smash', '#F48CBA'),
    [EncounterAbilities.Aberrus.Rashok.AncientFury]: createAbilityStyle('Ancient Fury', '#9E2B25'),
    [EncounterAbilities.Aberrus.Rashok.SearingSlam]: createAbilityStyle('Searing Slam', '#D7CDCC'),
    [EncounterAbilities.Aberrus.Rashok.Intermission]: createAbilityStyle('Intermission', '#5C7457'),
    [EncounterAbilities.Aberrus.Rashok.ShadowlavaBlast]: createAbilityStyle('Shadowlava Blast', '#C69B6D'),

    [EncounterAbilities.Aberrus.Zskarn.TacticalDestruction]: createAbilityStyle('Tactical Destruction', '#F3CA63', {verticalAlign: "bottom", y: 100}),
    [EncounterAbilities.Aberrus.Zskarn.BlastWave]: createAbilityStyle('Blast Wave', '#A52422', {verticalAlign: "bottom", y: 100}),
    [EncounterAbilities.Aberrus.Zskarn.Traps1]: createAbilityStyle('Traps 1', '#D7CDCC', {verticalAlign: "bottom", y: 100}),
    [EncounterAbilities.Aberrus.Zskarn.Traps2]: createAbilityStyle('Traps 2', '#5C7457', {verticalAlign: "bottom", y: 100}),
    [EncounterAbilities.Aberrus.Zskarn.Bomb]: createAbilityStyle('Bomb', '#C69B6D', {verticalAlign: "bottom", y: 100}),
    [EncounterAbilities.Aberrus.Zskarn.UnstableEmbers]: createAbilityStyle('Unstable Embers', '#638CF2', {verticalAlign: "bottom", y: 100}),
    
    [EncounterAbilities.Aberrus.Sarkareth.MassDisintegrate]: createAbilityStyle('Mass Disintegrate', '#D7CDCC'),
    [EncounterAbilities.Aberrus.Sarkareth.GlitteringSurge]: createAbilityStyle('Glittering Surge', '#F48CBA'),
    [EncounterAbilities.Aberrus.Sarkareth.SearingBreath]: createAbilityStyle('Searing Breath', '#D7CDCC'),

    [EncounterAbilities.Aberrus.Nymue.FullBloom]: createAbilityStyle('Full Bloom', '#D7CDCC'),
    [EncounterAbilities.Aberrus.Nymue.Unravel]: createAbilityStyle('Unravel', '#F48CBA'),

    [EncounterAbilities.Aberrus.Tindral.FallingStar]: createAbilityStyle('Falling Star', '#F3CA63'),
    [EncounterAbilities.Aberrus.Tindral.MassEntanglement]: createAbilityStyle('Mass Entanglement', '#A52422'),
    [EncounterAbilities.Aberrus.Tindral.Supernova]: createAbilityStyle('Supernova', '#D7CDCC'),
    [EncounterAbilities.Aberrus.Tindral.SeedOfFlame]: createAbilityStyle('Seed of Flame', '#5C457'),
    [EncounterAbilities.Aberrus.Tindral.FieryGrowth]: createAbilityStyle('Fiery Growth', '#C69B6D'),
    [EncounterAbilities.Aberrus.Tindral.Sunflame]: createAbilityStyle('Sunflame', '#638CF2')
}