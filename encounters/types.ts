import type { SpellEvent, Mechanic, EncounterData, SpellEventType } from '../definitions/types';

export interface DisplayInfo {
    color: string;
    text: string;
    textAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    x?: number;
    y?: number;
    priority?: number; // For chart layering
}

export interface EnhancedSpellEvent extends SpellEvent {
    display?: DisplayInfo;
}

export interface EnhancedMechanic extends Omit<Mechanic, 'events'> {
    events: Record<string, EnhancedSpellEvent>;
    display?: {
        primaryColor?: string;
        icon?: string;
        chartStyle?: 'line' | 'area' | 'marker' | 'background';
    };
}

export interface EnhancedEncounterData extends Omit<EncounterData, 'mechanics'> {
    mechanics: Record<string, EnhancedMechanic>;
}
