import { generateMockData } from "@/utils/generateMockData";

export async function GET(request: Request) {
    const user = new URL(request.url)
            .searchParams
            .get("user");

    console.log("GitHub user:", user);

    const response = await fetch(
        `https://api.github.com/users/${user}`
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

    const githubUser = await response.json();

    console.log(githubUser.login);

    return Response.json(generateMockData());
}