import { CONTRIBUTIONS_QUERY } from "./graphql";
import {transformContributionCalendar} from "@/utils/transformContributionCalendar";

export async function GET(request: Request) {
    const user = new URL(request.url)
        .searchParams
        .get("user");

    if (!user) {
        return Response.json([]);
    }

    console.log("GitHub user:", user);

    const response = await fetch(
        "https://api.github.com/graphql",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: CONTRIBUTIONS_QUERY,
                variables: {
                    username: user,
                },
            }),
        }
    );

    if (!response.ok) {
        return Response.json(
            {
                error: "User not found",
            },
            {
                status: 404,
            }
        );
    }

    const result = await response.json();

    const weeks =
        result.data.user
            .contributionsCollection
            .contributionCalendar
            .weeks;

    const contributionDays = weeks.flatMap(
        (week: {
            contributionDays: {
                date: string;
                contributionCount: number;
            }[];
        }) => week.contributionDays
    );

    const heatmapData = transformContributionCalendar(contributionDays);

    const pullRequests =
        result.data.user
            .contributionsCollection
            .pullRequestContributions
            .nodes;

    for (const pr of pullRequests) {
        const date = pr.occurredAt.slice(0, 10);

        const day = heatmapData.find(
            (item) =>
                item.date.toISOString().slice(0, 10) === date
        );

        if (day) {
            day.prs++;
        }
    }

    const issues =
        result.data.user
            .contributionsCollection
            .issueContributions
            .nodes;

    for (const issue of issues) {
        const date = issue.occurredAt.slice(0, 10);

        const day = heatmapData.find(
            (item) =>
                item.date.toISOString().slice(0, 10) === date
        );

        if (day) {
            day.issues++;
        }
    }

    const reviews =
        result.data.user
            .contributionsCollection
            .pullRequestReviewContributions
            .nodes;

    for (const review of reviews) {
        const date = review.occurredAt.slice(0, 10);

        const day = heatmapData.find(
            (item) =>
                item.date.toISOString().slice(0, 10) === date
        );

        if (day) {
            day.reviews++;
        }
    }

    for (const day of heatmapData) {
        day.commits = Math.max(
            day.commits - day.prs - day.issues - day.reviews, 0);
    }

    return Response.json(heatmapData);
}