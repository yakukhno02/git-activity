import { calculateStreaks } from "@/utils/calculateStreaks";

type ActivityDay = {
    date: string;
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
};

function getCellColor(day: ActivityDay) {
    const total =
        day.commits +
        day.prs +
        day.issues;

    if (total === 0) {
        return "#161b22";
    }

    const hasCommits = day.commits > 0;
    const hasPRs = day.prs > 0;
    const hasIssues = day.issues > 0;

    const intensity =
        total >= 10
            ? 4
            : total >= 6
                ? 3
                : total >= 3
                    ? 2
                    : 1;

    if (hasCommits && hasPRs && hasIssues) {
        return [
            "#d1d5db",
            "#e5e7eb",
            "#f3f4f6",
            "#ffffff",
        ][intensity - 1];
    }

    if (hasCommits && hasPRs) {
        return [
            "#0e7490",
            "#0891b2",
            "#06b6d4",
            "#22d3ee",
        ][intensity - 1];
    }

    if (hasCommits && hasIssues) {
        return [
            "#b45309",
            "#d97706",
            "#f59e0b",
            "#fbbf24",
        ][intensity - 1];
    }

    if (hasPRs && hasIssues) {
        return [
            "#6b21a8",
            "#7e22ce",
            "#9333ea",
            "#a855f7",
        ][intensity - 1];
    }

    if (hasCommits) {
        return [
            "#166534",
            "#15803d",
            "#22c55e",
            "#4ade80",
        ][intensity - 1];
    }

    if (hasPRs) {
        return [
            "#1d4ed8",
            "#2563eb",
            "#3b82f6",
            "#60a5fa",
        ][intensity - 1];
    }

    return [
        "#b91c1c",
        "#dc2626",
        "#ef4444",
        "#f87171",
    ][intensity - 1];
}

export async function GET(request: Request) {
    const user = new URL(request.url)
        .searchParams
        .get("user");

    if (!user) {
        return new Response("Missing user", {
            status: 400,
        });
    }

    const baseUrl = new URL(request.url).origin;

    const response = await fetch(
        `${baseUrl}/api/activity?user=${user}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return new Response("User not found", {
            status: 404,
        });
    }

    const data: ActivityDay[] = await response.json();

    const totalCommits = data.reduce(
        (sum, day) => sum + day.commits,
        0
    );

    const totalPRs = data.reduce(
        (sum, day) => sum + day.prs,
        0
    );

    const totalIssues = data.reduce(
        (sum, day) => sum + day.issues,
        0
    );

    const { currentStreak, longestStreak } =
        calculateStreaks(
            data.map((day) => ({
                ...day,
                date: new Date(day.date),
            }))
        );

    const cellSize = 13;
    const gap = 3;
    const startX = 40;
    const startY = 75;

    const cells = data
        .map((day, index) => {
            const week = Math.floor(index / 7);
            const dayOfWeek = index % 7;

            return `
                <rect
                    x="${startX + week * (cellSize + gap)}"
                    y="${startY + dayOfWeek * (cellSize + gap)}"
                    width="${cellSize}"
                    height="${cellSize}"
                    rx="2"
                    fill="${getCellColor(day)}"
                />
            `;
        })
        .join("");

    const svg = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="900"
    height="260"
    viewBox="0 0 950 275"
>
    <rect
        width="920"
        height="225"
        rx="18"
        fill="#050505"
    />

    <text
        x="40"
        y="45"
        fill="#ffffff"
        font-size="25"
        font-weight="700"
        font-family="Arial, sans-serif"
    >
        Git Activity
    </text>

    <!-- Stats -->

<!-- Commits -->

<rect
    x="565"
    y="20"
    width="100"
    height="45"
    rx="10"
    fill="#1a1a1a"
/>

<text
    x="577"
    y="37"
    fill="#a1a1aa"
    font-size="12"
    font-family="Arial, sans-serif"
>
    Commits
</text>

<text
    x="577"
    y="55"
    fill="#22c55e"
    font-size="18"
    font-weight="700"
    font-family="Arial, sans-serif"
>
    ${totalCommits}
</text>

<!-- PRs -->

<rect
    x="675"
    y="20"
    width="100"
    height="45"
    rx="10"
    fill="#1a1a1a"
/>

<text
    x="687"
    y="37"
    fill="#a1a1aa"
    font-size="11"
    font-family="Arial, sans-serif"
>
    PRs
</text>

<text
    x="687"
    y="55"
    fill="#3b82f6"
    font-size="18"
    font-weight="700"
    font-family="Arial, sans-serif"
>
    ${totalPRs}
</text>

<!-- Issues -->

<rect
    x="785"
    y="20"
    width="100"
    height="45"
    rx="10"
    fill="#1a1a1a"
/>

<text
    x="802"
    y="37"
    fill="#a1a1aa"
    font-size="11"
    font-family="Arial, sans-serif"
>
    Issues
</text>

<text
    x="802"
    y="55"
    fill="#ef4444"
    font-size="18"
    font-weight="700"
    font-family="Arial, sans-serif"
>
    ${totalIssues}
</text>

    ${cells}

    <!-- Streak -->

    <text
        x="45"
        y="208"
        fill="#d4d4d8"
        font-size="16"
        font-family="Arial, sans-serif"
    >
        Current streak:
    </text>

    <text
        x="155"
        y="208"
        fill="#ffffff"
        font-size="16"
        font-weight="700"
        font-family="Arial, sans-serif"
    >
        ${currentStreak} days
    </text>

    <text
        x="280"
        y="208"
        fill="#d4d4d8"
        font-size="16"
        font-family="Arial, sans-serif"
    >
        Longest streak:
    </text>

    <text
        x="395"
        y="208"
        fill="#ffffff"
        font-size="16"
        font-weight="700"
        font-family="Arial, sans-serif"
    >
        ${longestStreak} days
    </text>
</svg>
`;

    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "no-store",
        },
    });
}