import { create } from 'domain';
import { RpgLogs } from '../../definitions/RpgLogs';
import { defensives } from '../../definitions/defensives';
import { eventsByCategoryAndDisposition } from '../../util/wrappers/getEventsByTypeAndDisposition';

interface PlayerDefensiveCasts {
    name: string;
    class: string;
    abilities: { [key: string]: number };
}

// Helper type to create ability properties
type AbilityProperties = {
    [K in `ability${string}`]: string;
};

// Main interface
interface VariableAbilityInterface {
    player: string;
    totalCasts: string;
    abilities: { [key: string]: string };
}

// Function to create an object of the interface
function createAbilityObject<T extends number>(name: string, columnMax: number
): VariableAbilityInterface {
    const baseObject: VariableAbilityInterface = {
        player: name,
        totalCasts: "",
        abilities: {
            potions: "Algari Healing Potion",
            healthstone: "Healthstone"
        }
    };

    for (let i = 0; i < columnMax; i++) {
        let abilityKey = `ability${String.fromCharCode(65 + i)}` as keyof AbilityProperties;
        (baseObject.abilities as { [key: string]: string })[abilityKey] = '';
    }

    return baseObject as VariableAbilityInterface;
}

getComponent = () => {
    const defensiveCasts = reportGroup.fights.flatMap(fight =>
        fight.eventsByCategoryAndDisposition("casts", "friendly")
            .filter(cast => {
                const actor = cast.source;
                const defensiveAbilities = {
                    ...(actor && defensives[actor.subType] || {}),
                    ...(defensives["Everyone"] || {})
                };

                return (
                    defensiveAbilities &&
                    cast.ability !== null &&
                    Object.prototype.hasOwnProperty.call(defensiveAbilities, cast.ability.id)
                );
            })
            .map(cast => ({
                playerName: cast.source ? cast.source.name : '',
                playerClass: cast.source ? cast.source.subType : '',
                abilityName: cast.ability ? cast.ability.name : ''
            }))
    );

    // Aggregate data
    const playerData: { [key: string]: PlayerDefensiveCasts } = {};
    defensiveCasts.forEach(cast => {
        const { playerName, playerClass, abilityName } = cast;
        if (!playerData[playerName]) {
            playerData[playerName] = { name: playerName, class: playerClass, abilities: {} };
        }
        playerData[playerName].abilities[abilityName] = (playerData[playerName].abilities[abilityName] || 0) + 1;
    });

    // Group by class and get class-specific abilities
    const classSortedData: { [key: string]: PlayerDefensiveCasts[] } = {};
    const classAbilities: { [key: string]: Set<string> } = {};
    Object.values(playerData).forEach(player => {
        if (!classSortedData[player.class]) {
            classSortedData[player.class] = [];
            classAbilities[player.class] = new Set();
        }
        classSortedData[player.class].push(player);
        Object.keys(player.abilities).forEach(ability => classAbilities[player.class].add(ability));
    });
    console.log('test');
    console.log('test');

    // Prepare table data
    const tableData: any[] = [];
    const sortedClasses = Object.keys(classSortedData).sort();
    const constantAbilities = ["Algari Healing Potion", "Healthstone"];

    sortedClasses.forEach(className => {
        const classPlayers = classSortedData[className].sort((a, b) => 
            Object.values(b.abilities).reduce((sum, count) => sum + count, 0) - 
            Object.values(a.abilities).reduce((sum, count) => sum + count, 0)
        );

        const classSpecificAbilities = [
            ...constantAbilities,
            ...Array.from(classAbilities[className]).filter(a => !constantAbilities.includes(a)).sort()
        ];

        // Class header row
        const classHeaderRow: any = {
            player: className,
            totalCasts: "",
        };
        classSpecificAbilities.forEach(ability => {
            classHeaderRow[ability] = ability;
        });
        tableData.push(classHeaderRow);

        // Player rows
        classPlayers.forEach(player => {
            const totalCasts = Object.values(player.abilities).reduce((sum, count) => sum + count, 0);
            const playerRow: any = {
                player: `<${player.class}>${player.name}</${player.class}>`,
                totalCasts: totalCasts.toString(),
            };
            classSpecificAbilities.forEach(ability => {
                playerRow[ability] = (player.abilities[ability] || "").toString();
            });
            tableData.push(playerRow);
        });

        // Empty row after each class
        const emptyRow: any = { player: "", totalCasts: "" };
        classSpecificAbilities.forEach(ability => {
            emptyRow[ability] = "";
        });
        tableData.push(emptyRow);
    });

    // Remove last empty row
    tableData.pop();

    // Prepare columns for the table
    const columns: any = {
        player: { header: "Player", textAlign: "left" },
        totalCasts: { header: "Total", textAlign: "center" },
    };
    
    // Add columns for all unique abilities across all classes
    const allAbilities = new Set<string>();
    Object.values(classAbilities).forEach(abilities => {
        abilities.forEach(ability => allAbilities.add(ability));
    });
    
    [...constantAbilities, ...Array.from(allAbilities).filter(a => !constantAbilities.includes(a)).sort()].forEach(ability => {
        columns[ability] = { header: "", textAlign: "center" };
    });

    return {
        component: "Table",
        props: {
            columns: {
                title: {
                    header: "Defensives Used",
                    columns: columns
                }
            },
            data: tableData
        }
    };
};
