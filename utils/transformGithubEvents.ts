import { ActivityDay } from "@/types/heatmap";

export function transformGithubEvents(events: any[]) {
    const activityMap = new Map();

    for (const event of events) {
        const date = event.created_at.slice(0, 10);

        if (!activityMap.has(date)) {
            activityMap.set(date, {
                date: new Date(date),
                commits: 0,
                prs: 0,
                issues: 0,
            });
        }

        const day = activityMap.get(date);

        switch (event.type) {
            case "PushEvent":
                day.commits++;
                break;

            case "PullRequestEvent":
                day.prs++;
                break;

            case "IssuesEvent":
                day.issues++;
                break;
        }
    }

    return Array.from(activityMap.values()) as ActivityDay[];
}