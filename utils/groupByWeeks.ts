import { ActivityDay } from "@/types/heatmap";

export function groupByWeeks(data: ActivityDay[]) {
    const firstDay = data[0].date.getDay();

    const shiftedDays = [
        ...Array(firstDay).fill(null),
        ...data,
    ];

    const weeks = [];

    for (let i = 0; i < shiftedDays.length; i += 7) {
        weeks.push(shiftedDays.slice(i, i + 7));
    }

    return weeks;
}