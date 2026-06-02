import { ActivityDay } from "@/types/heatmap";

export function fillMissingDates(
    activity: ActivityDay[]
): ActivityDay[] {
    const map = new Map(
        activity.map((day) => [
            day.date.toISOString().slice(0, 10),
            day,
        ])
    );

    const result: ActivityDay[] = [];

    for (let i = 364; i >= 0; i--) {
        const date = new Date();

        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - i);

        const key =
            date.toISOString().slice(0, 10);

        result.push(
            map.get(key) ?? {
                date,
                commits: 0,
                prs: 0,
                issues: 0,
            }
        );
    }

    return result;
}