"use client";

import { useMemo, useState } from "react";
import { Mode } from "@/types/heatmap";
import HeatmapWeekdays from "@/components/HeatmapWeekdays";
import HeatmapLegend from "@/components/HeatmapLegend";
import HeatmapMonths from "@/components/HeatmapMonths";
import HeatmapControls from "@/components/HeatmapControls";
import HeatmapGrid from "@/components/HeatmapGrid";
import {generateMockData} from "@/utils/generateMockData";
import {groupByWeeks} from "@/utils/groupByWeeks";
import HeatmapStats from "@/components/HeatmapStats";
import { calculateStreaks } from "@/utils/calculateStreaks";


export default function Home() {
    const [mode, setMode] = useState<Mode>("commits");

    const data = useMemo(
        () => generateMockData(),
        []
    );

    const weeks = useMemo(
        () => groupByWeeks(data),
        [data]
    );

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