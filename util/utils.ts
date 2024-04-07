import { RpgLogs } from "../definitions/RpgLogs";

export const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export const removeSpaces = (text: string) => {
    return text.replace(/\s+/g, '');
};

export const unslug = (slug: string) => {
    // Insert spaces before capital letters, except for the first character
    let result: string = slug.replace(/([A-Z])/g, (match, p1, offset) => {
        return offset === 0 ? p1 : ' ' + p1;
    });

    return result;
};

export const binarySearch = (events: readonly RpgLogs.AnyEvent[], time: number, left: number, right: number) => {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midTimestamp = events[mid].timestamp;

        if (midTimestamp < time) {
            left = mid + 1;
        } else if (midTimestamp > time) {
            right = mid - 1;
        } else {
            return mid;
        }
    }

    return left;
};

