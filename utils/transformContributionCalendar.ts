import { ActivityDay } from "@/types/heatmap";

export function transformContributionCalendar(
    contributionDays: {
        date: string;
        contributionCount: number;
    }[]
): ActivityDay[] {
    return contributionDays.map((day) => ({
        date: new Date(day.date),
        commits: day.contributionCount,
        prs: 0,
        issues: 0,
    }));
}