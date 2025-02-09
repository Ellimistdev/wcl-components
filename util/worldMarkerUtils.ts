import { RpgLogs } from "../definitions/RpgLogs";
import { PlotLocation } from "../definitions/types";
import { formatTime } from "../util/utils";

// Map world marker icons to assignments
const markerAssignments: Record<number, string> = {
    0: "★",  // Star
    1: "●",  // Circle
    2: "♦",  // Diamond
    3: "▲",  // Triangle
    4: "☾",  // Moon
    5: "■",  // Square
    6: "✜",  // Cross
    7: "☠"   // Skull
};

export function processWorldMarkers(
    fight: RpgLogs.Fight, 
    setIndex: number,
    setStartTime: number, 
    setEndTime: number
): PlotLocation[] {
    return fight.worldMarkers
        .filter(marker => 
            marker.startTime <= setEndTime && 
            (marker.endTime === null || marker.endTime >= setStartTime)
        )
        .map(marker => ({
            x: marker.x / 100,
            y: marker.y / 100,
            i: setIndex + 1,
            assignment: markerAssignments[marker.icon] || "•",
            name: `World Marker ${marker.icon}`,
            fightId: fight.id,
            timestamp: formatTime(marker.startTime - fight.startTime),
            targetId: marker.icon // Using icon ID as target ID for world markers
        }));
}