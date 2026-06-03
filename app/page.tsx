"use client";

import { useEffect, useState } from "react";
import HeatmapWeekdays from "@/components/HeatmapWeekdays";
import HeatmapMonths from "@/components/HeatmapMonths";
import HeatmapControls from "@/components/HeatmapControls";
import HeatmapGrid from "@/components/HeatmapGrid";
import {groupByWeeks} from "@/utils/groupByWeeks";
import HeatmapStats from "@/components/HeatmapStats";
import { calculateStreaks } from "@/utils/calculateStreaks";
import { ActivityDay} from "@/types/heatmap";
import { ActivityDayResponse } from "@/types/api";
import GithubUserForm from "@/components/GithubUserForm";
import HeatmapLegend from "@/components/HeatmapLegend";

export default function Home() {
    const [data, setData] = useState<ActivityDay[] | null>(null);
    const [selectedActivities, setSelectedActivities] =
        useState({
            commits: true,
            prs: true,
            issues: true,
        });
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch("/api/activity")
            .then((response) => response.json())
            .then((data: ActivityDayResponse[]) =>
                setData(
                    data.map((day) => ({
                        ...day,
                        date: new Date(day.date),
                    }))
                )
            );
    }, []);

    async function loadActivity() {
        setError("");
        setIsLoading(true);

        const response = await fetch(
            `/api/activity?user=${username}`
        );

        if (!response.ok) {
            setError("GitHub user not found");
            setIsLoading(false);
            return;
        }

        const data = await response.json();

        setData(
            data.map((day: ActivityDayResponse) => ({
                ...day,
                date: new Date(day.date),
            }))
        );
        setIsLoading(false);
    }

    if (data === null) {
        return (
            <main className="min-h-screen bg-black text-white p-10">
                Loading...
            </main>
        );
    }

    const weeks = groupByWeeks(data);

    const maxValue = Math.max(
        ...data.map(
            (day) =>
                (selectedActivities.commits ? day.commits : 0) +
                (selectedActivities.prs ? day.prs : 0) +
                (selectedActivities.issues ? day.issues : 0)
        )
    );

    const totalCommits = data.reduce(
        (sum, day) => sum + day.commits, 0
    );

    const totalPRs = data.reduce(
        (sum, day) => sum + day.prs, 0
    );

    const totalIssues = data.reduce(
        (sum, day) => sum + day.issues, 0
    );

    const {currentStreak, longestStreak,} = calculateStreaks(data);

    const activeLegendColor =
        selectedActivities.commits &&
        selectedActivities.prs &&
        selectedActivities.issues
            ? "white"
            : selectedActivities.commits &&
            selectedActivities.prs
                ? "teal"
                : selectedActivities.commits &&
                selectedActivities.issues
                    ? "yellow"
                    : selectedActivities.prs &&
                    selectedActivities.issues
                        ? "purple"
                        : selectedActivities.commits
                            ? "green"
                            : selectedActivities.prs
                                ? "blue"
                                : "red";

    return (
        <main className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold mb-5">
                Git Activity
            </h1>

            <GithubUserForm
                username={username}
                setUsername={setUsername}
                onLoad={loadActivity}
                isLoading={isLoading}
            />

            {error && (
                <p className="text-red-500 mb-4">
                    {error}
                </p>
            )}

            <div className="w-fit">
                <div className="flex justify-between items-center mb-6">
                    <HeatmapControls
                        selectedActivities={selectedActivities}
                        setSelectedActivities={setSelectedActivities}
                    />

                    <div className="-mt-2">
                        <HeatmapStats
                            commits={totalCommits}
                            prs={totalPRs}
                            issues={totalIssues}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-5 text-sm text-zinc-400 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-[#39d353]"/>
                        <span>Commits</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-[#218bff]"/>
                        <span>PRs</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-red-500"/>
                        <span>Issues</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-cyan-400"/>
                        <span>Commits + PRs</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-yellow-400"/>
                        <span>Commits + Issues</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-purple-500"/>
                        <span>PRs + Issues</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-white"/>
                        <span>All Activities</span>
                    </div>


                </div>

                <HeatmapMonths weeks={weeks}/>

                <div className="flex gap-[3px] w-fit">
                    <HeatmapWeekdays/>

                    <HeatmapGrid
                        weeks={weeks}
                        selectedActivities={selectedActivities}
                        maxValue={maxValue}
                    />

                </div>

                <div className="mt-4 ml-[55px]">
                    <HeatmapLegend
                        color={activeLegendColor}
                    />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-lg text-zinc-300">
                    Current streak:{" "}
                    <span className="font-bold text-white">
                        {currentStreak} days
                    </span>

                    <span className="mx-3 text-zinc-600">•</span>

                    Longest streak:{" "}
                    <span className="font-bold text-white">
                        {longestStreak} days
                    </span>
                </p>
            </div>
        </main>
    );
}