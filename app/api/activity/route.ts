import { fillMissingDates } from "@/utils/fillMissingDates";
import { transformGithubEvents } from "@/utils/transformGithubEvents";

export async function GET(request: Request) {
    const user = new URL(request.url)
        .searchParams
        .get("user");

    console.log("GitHub user:", user);

    const response = await fetch(
        `https://api.github.com/users/${user}/events`
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

    const events = await response.json();

    console.log(events[0]);

    const heatmapData = transformGithubEvents(events);

    const fullYearData = fillMissingDates(heatmapData);

    return Response.json(fullYearData);
}