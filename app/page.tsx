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