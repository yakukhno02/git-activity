"use client";

import { useEffect, useState } from "react";
import HeatmapWeekdays from "@/components/HeatmapWeekdays";
import HeatmapLegend from "@/components/HeatmapLegend";
import HeatmapMonths from "@/components/HeatmapMonths";
import HeatmapControls from "@/components/HeatmapControls";
import HeatmapGrid from "@/components/HeatmapGrid";
import {groupByWeeks} from "@/utils/groupByWeeks";
import HeatmapStats from "@/components/HeatmapStats";
import { calculateStreaks } from "@/utils/calculateStreaks";
import { ActivityDay, Mode } from "@/types/heatmap";
import { ActivityDayResponse } from "@/types/api";
import GithubUserForm from "@/components/GithubUserForm";

export default function Home() {
    const [data, setData] = useState<ActivityDay[]>([]);
    const [mode, setMode] = useState<Mode>("commits");
    const [username, setUsername] = useState("");

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

    function loadActivity() {
        fetch(`/api/activity?user=${username}`)
            .then((response) => response.json())
            .then((data) =>
                setData(
                    data.map((day: ActivityDayResponse) => ({
                        ...day,
                        date: new Date(day.date),
                    }))
                )
            );
    }

    if (data.length === 0) {
        return (
            <main className="min-h-screen bg-black text-white p-10">
                Loading...
            </main>
        );
    }

    const weeks = groupByWeeks(data);

    const maxValue = Math.max(
        ...data.map((day) => day[mode])
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

    const activeColor =
        mode === "commits"
            ? "green"
            : mode === "prs"
                ? "blue"
                : "amber";

    return (
        <main className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold mb-5">
                Git Activity
            </h1>

            <GithubUserForm
                username={username}
                setUsername={setUsername}
                onLoad={loadActivity}
            />

            <div className="w-fit">
                <div className="flex justify-between items-center mb-6">
                    <HeatmapControls
                        mode={mode}
                        setMode={setMode}
                    />

                    <div className="-mt-2">
                        <HeatmapStats
                            commits={totalCommits}
                            prs={totalPRs}
                            issues={totalIssues}
                        />
                    </div>
                </div>

                <HeatmapMonths weeks={weeks}/>

                <div className="flex gap-[3px] w-fit">
                    <HeatmapWeekdays/>

                    <HeatmapGrid
                        weeks={weeks}
                        mode={mode}
                        activeColor={activeColor}
                        maxValue={maxValue}
                    />

                </div>
                <div className="mt-4 ml-[55px]">
                    <HeatmapLegend color={activeColor}/>
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