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

    const lastActiveIndex = data.findLastIndex(
        (day) =>
            day.commits > 0 ||
            day.prs > 0 ||
            day.issues > 0
    );

    if (lastActiveIndex === -1) {
        return {
            currentStreak: 0,
            longestStreak,
        };
    }

    const lastActiveDay = data[lastActiveIndex];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDate = new Date(lastActiveDay.date);
    lastDate.setHours(0, 0, 0, 0);

    const diffDays =
        (today.getTime() - lastDate.getTime()) /
        (1000 * 60 * 60 * 24);

    if (diffDays > 1) {
        return {
            currentStreak: 0,
            longestStreak,
        };
    }

    for (let i = lastActiveIndex; i >= 0; i--) {
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