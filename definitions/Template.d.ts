import { RpgLogs } from "./RpgLogs";


interface ComponentDimensions {
    /**
     * Width of the component, default 1 if not specified
     */
    w?: number;

    /**
     * Height of the component, default 2 if not specified
     */
    h?: number;
}

interface ComponentConfig extends ComponentDimensions {
    /**
     * Optional static ID for the component
     * If not provided, a random ID will be generated
     */
    i?: string;
}

type RecursiveComponentMap = {
    [key: string]: ComponentConfig | RecursiveComponentMap;
};

interface TemplateConfig {
    /**
     * Config options for the included custom plugins.
     * Omitting a plugin or assigning a falsy value will deactivate it.
     */
    plugins: {
        clearSource?: false | ClearSourcePluginOptions
        exportString?: boolean
        autoTest?: false | AutoTestPluginOption
    },
    /**
     * Component configuration including dimensions and optional static IDs.
     * Supports nested organization of components.
     */
    components: RecursiveComponentMap
}

interface AutoTestPluginOption {
    active: boolean
    loginMethod: "WCL" | "USA" | "EUROPE" | "KOREA" | "TAIWAN"
    /**This url has to lead directly to the component view (ends with &view=components)*/
    components: { [componentName: string]: string }
}

interface ClearSourcePluginOptions {
    /**
     * If true the source code will be LZString compressed and Base64Encoded
     */
    compress: boolean
}

export interface Component {
    /**
     * The component's UUID (either provided in config or generated)
     */
    i: string

    /**
     * Final width of the component (config value or default)
     */
    w: number

    /**
     * Final height of the component (config value or default)
     */
    h: number

    component: {
        /**
         * Base64 encoded LZString compressed code of the component
         */
        script: string
    }
}

export type { 
    TemplateConfig,
    ComponentConfig,
    ComponentDimensions,
    AutoTestPluginOption,
    ClearSourcePluginOptions 
};

type actorFilter = Partial<RpgLogs.Actor>;
type abilityFilter = Omit<Partial<RpgLogs.Ability>, "id">;

export type ManagerOptions = {
    targetFilters?: actorFilter[];
    sourceFilters?: actorFilter[];
    abilityFilters?: abilityFilter[];
}

export type ApplyBuffOrDebuff = RpgLogs.ApplyBuffEvent | RpgLogs.ApplyDebuffEvent
export type RemoveBuffOrDebuff = RpgLogs.RemoveBuffEvent | RpgLogs.RemoveDebuffEvent
export type RemoveBuffOrDebuffStack = RpgLogs.RemoveBuffStackEvent | RpgLogs.RemoveDebuffStackEvent
export type ApplyBuffOrDebuffStack = RpgLogs.ApplyBuffStackEvent | RpgLogs.ApplyDebuffStackEvent
export type RefreshBuffOrDebuff = RpgLogs.RefreshBuffEvent | RpgLogs.RefreshDebuffEvent
export type BuffOrDebuffEvents = ApplyBuffOrDebuff | RemoveBuffOrDebuff | ApplyBuffOrDebuffStack | RemoveBuffOrDebuffStack | RefreshBuffOrDebuff

export type EventTypeUnions<T extends RpgLogs.EventCategory> =
    T extends "damage" ? RpgLogs.DamageEvent :
    T extends "healing" ? RpgLogs.HealingEvent | RpgLogs.AbsorbedEvent | RpgLogs.RemoveBuffEvent :
    T extends "casts" ? RpgLogs.CastEvent | RpgLogs.BeginCastEvent :
    T extends "aurasGained" ? BuffOrDebuffEvents :
    T extends "aurasCast" ? BuffOrDebuffEvents :
    T extends "interrupts" ? RpgLogs.InterruptEvent :
    T extends "resourceGain" ? RpgLogs.ResourceChangeEvent :
    T extends "dispels" ? RpgLogs.DispelEvent :
    T extends "deathsAndResurrects" ? RpgLogs.DeathEvent | RpgLogs.DestroyEvent | RpgLogs.InstakillEvent :
    T extends "summons" ? RpgLogs.SummonEvent :
    T extends "combatResurrects" ? RpgLogs.ResurrectEvent :
    T extends "healingAbsorbed" ? RpgLogs.HealAbsorbedEvent :
    T extends "aggro" ? RpgLogs.ApplyDebuffEvent | RpgLogs.CastEvent | RpgLogs.DeathEvent :
    T extends "calculatedDamage" ? RpgLogs.DamageEvent :
    T extends "calculatedHealing" ? RpgLogs.HealingEvent | RpgLogs.AbsorbedEvent | RpgLogs.RemoveBuffEvent :
    RpgLogs.AnyEvent;
