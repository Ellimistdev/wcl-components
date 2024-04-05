export type ClassName = "DeathKnight" | "DemonHunter" | "Druid" | "Evoker" | "Hunter" | "Mage" | "Monk" | "Paladin" | "Priest" | "Rogue" | "Shaman" | "Warlock" | "Warrior";
export type Spec = 'Blood' | 'Frost' | 'Unholy' | 'Havoc' | 'Vengeance' | 'Balance' | 'Feral' | 'Guardian' | 'Restoration' | 'Augmentation' | 'Devastation' | 'Preservation' | 'BeastMastery' | 'Marksmanship' | 'Survival' | 'Arcane' | 'Fire' | 'Brewmaster' | 'Mistweaver' | 'Windwalker' | 'Holy' | 'Protection' | 'Retribution' | 'Discipline' | 'Shadow' | 'Assassination' | 'Outlaw' | 'Subtlety' | 'Elemental' | 'Enhancement' | 'Affliction' | 'Demonology' | 'Destruction' | 'Arms' | 'Fury';
export type Role = 'Tank' | 'Healer' | 'Dps';
export interface SpecDetails { role: Role; }
export type ClassDetails = Partial<{ [spec in Spec]: SpecDetails; }>;
export type Classes = { [className in ClassName]: ClassDetails; };