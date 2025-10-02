import { RpgLogs } from "../../definitions/RpgLogs";
import { BuffMap, InstantCasts, VBar } from "../../definitions/types";
import { defensives } from "../../definitions/defensives";
import { referenceCasts } from "../../definitions/referenceCasts";

interface AbilityCount extends RpgLogs.Ability {
    count: number;
}

interface PlayerData {
    subType: string;
    abilities: { [key: string]: AbilityCount };
}

interface DefensiveCounts {
    [key: string]: PlayerData;
}

interface PlayerDefensiveCasts {
    name: string;
    abilities: AbilityCount[];
    totalCasts: number;
}

getComponent = () => {
    // Collect defensive ability cast events
    const defensiveCasts = reportGroup.fights.flatMap((fight, fightIndex) => {
        return fight.eventsByCategoryAndDisposition("casts",
            "friendly")
            .filter(cast => {
                const actor = cast.source;
                const target = cast.target;
                const defensiveAbilities = {
                    ...(actor && defensives[actor.subType] || {}),
                    ...(defensives["Everyone"] || {})
                };

                // Check if this is a valid defensive ability
                if (!defensiveAbilities || 
                    cast.ability === null || 
                    !Object.prototype.hasOwnProperty.call(defensiveAbilities, cast.ability.id)) {
                    return false;
                }

                // For Lay on Hands (633), only count it if cast on self
                if (cast.ability.id === 633) {
                    return actor?.id === target?.id;
                }

                return true;
            })
            .map(cast => ({
                ...cast,
                timestamp: cast.timestamp - fight.startTime,
                playerName: cast.source ? cast.source.name : '',
                abilityName: cast.ability ? cast.ability.name : '',
                fightNumber: fightIndex + 1
            }));
    });

    // return defensiveCasts;

    // Accumulate defensiveCounts
    const defensiveCounts: DefensiveCounts = defensiveCasts.reduce((acc: any, cast) => {
        const { name: playerName, subType } = cast.source || { name: '', subType: '' };
        const { name: abilityName, id, icon } = cast.ability || { name: '', id: 0, icon: '' };
    
        if (!acc[playerName]) {
            acc[playerName] = { subType, abilities: {} };
        }
        if (!acc[playerName].abilities[abilityName]) {
            acc[playerName].abilities[abilityName] = { count: 0, id, icon, name: abilityName };
        }
        acc[playerName].abilities[abilityName].count++;
    
        return acc;
    }, {});

    // return defensiveCounts;

    const playersAndDefensiveCasts: PlayerDefensiveCasts[] = Object.entries(defensiveCounts)
        .map(([playerName, playerData]) => {
            // Extract subType and abilities from the playerData
            const { subType, abilities } = playerData;

            // Filter out abilities with a count of 0 before formatting and calculating totalCasts
            const filteredAbilities = Object.values(abilities).filter(ability => ability.count > 0);

            // Calculate total casts for each player correctly, considering the new structure and filtering
            const totalCasts = filteredAbilities.reduce((sum, ability) => sum + ability.count, 0);

            return {
                name: `<${subType}>${playerName}</${subType}>`,
                abilities: filteredAbilities,
                totalCasts
            };
        })
        .filter(player => player.totalCasts > 0) // Further filter out players with no casts after filtering abilities
        .sort((a, b) => b.totalCasts - a.totalCasts); // Sort by totalCasts

    // return playersAndDefensiveCasts;

    // Convert ability information to a markdown-friendly format with icon
    function convertAbilityToMarkdown(ability: RpgLogs.Ability) {
        return ability ? `<AbilityIcon id="${ability.id}" icon="${ability.icon}">${ability.name}</AbilityIcon>` : '';
    }

    const playersAndDefensiveCastsDescription = playersAndDefensiveCasts
        .map(player => {
            // Process each ability for markdown conversion, considering the updated structure
            const playerAbilitiesFormatted = player.abilities
                .map((ability: AbilityCount) => `${convertAbilityToMarkdown(ability)}: ${ability.count}`)
                .join(', ');

            return `${player.name}: ${playerAbilitiesFormatted}`;
        })
        .join('  \n');

    // return playersAndDefensiveCastsDescription;

    // Add a title and construct the content
    const content = [
        `# Defensives used
        \n\n*Sorted by total number of defensives cast per player.*
        \n\n${playersAndDefensiveCastsDescription}`
    ]

    // return content;
    // Return the updated component with the new content
    return {
        component: 'EnhancedMarkdown',
        props: {
            content
        }
    };
}
