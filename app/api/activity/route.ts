import { fillMissingDates } from "@/utils/fillMissingDates";
import { transformGithubEvents } from "@/utils/transformGithubEvents";
import { CONTRIBUTIONS_QUERY } from "./graphql";
import {generateMockData} from "@/utils/generateMockData";
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

    return Response.json(heatmapData);
}