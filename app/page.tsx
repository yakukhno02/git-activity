"use client";

import { useMemo, useState } from "react";
import HeatmapWeekdays from "@/components/HeatmapWeekdays";
import HeatmapLegend from "@/components/HeatmapLegend";
import HeatmapMonths from "@/components/HeatmapMonths";
import HeatmapControls from "@/components/HeatmapControls";
import HeatmapGrid from "@/components/HeatmapGrid";

type Mode = "commits" | "prs" | "issues";

export default function Home() {
    const [mode, setMode] = useState<Mode>("commits");

    const data = useMemo(
        () =>
            Array.from({ length: 365 }, (_, index) => ({
                date: new Date(2026, 0, index + 1),

                commits:
                    Math.random() < 0.6
                        ? 0
                        : Math.random() < 0.015
                            ? 50
                            : Math.floor(Math.random() * 6) + 1,

                prs:
                    Math.random() < 0.75
                        ? 0
                        : Math.random() < 0.01
                            ? 10
                            : Math.floor(Math.random() * 4) + 1,

                issues:
                    Math.random() < 0.8
                        ? 0
                        : Math.random() < 0.008
                            ? 10
                            : Math.floor(Math.random() * 3) + 1,
            })),
        []
    );

    const firstDay = data[0].date.getDay();

    const shiftedDays = [
        ...Array(firstDay).fill(null),
        ...data,
    ];

    const weeks = [];

    for (let i = 0; i < shiftedDays.length; i += 7) {
        weeks.push(shiftedDays.slice(i, i + 7));
    }

    const maxValue = Math.max(
        ...data.map((day) => day[mode])
    );

    const activeColor =
        mode === "commits"
            ? "green"
            : mode === "prs"
                ? "blue"
                : "amber";

    return (
        <main className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold mb-8">
                Git Activity
            </h1>

            <HeatmapControls
                mode={mode}
                setMode={setMode}
            />

            <HeatmapMonths weeks={weeks} />

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
        </main>
    );
}