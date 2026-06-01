import { ActivityDay } from "@/types/heatmap";

export function calculateStreaks(data: ActivityDay[]) {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (const day of data) {
        const hasActivity =
            day.commits > 0 ||
            day.prs > 0 ||
            day.issues > 0;

        if (hasActivity) {
            tempStreak++;
            longestStreak = Math.max(
                longestStreak,
                tempStreak
            );
        } else {
            tempStreak = 0;
        }
    }

    for (let i = data.length - 1; i >= 0; i--) {
        const day = data[i];

        const hasActivity =
            day.commits > 0 ||
            day.prs > 0 ||
            day.issues > 0;

        if (!hasActivity) {
            break;
        }

        currentStreak++;
    }

    return {
        currentStreak,
        longestStreak,
    };
}