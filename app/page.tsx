"use client";

import { useMemo, useState } from "react";
import HeatmapCell from "@/components/HeatmapCell";

export default function Home() {
    const [mode, setMode] = useState<
        "commits" | "prs" | "issues"
    >("commits");

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
                            ? 30
                            : Math.floor(Math.random() * 4) + 1,

                issues:
                    Math.random() < 0.8
                        ? 0
                        : Math.random() < 0.008
                            ? 20
                            : Math.floor(Math.random() * 3) + 1,
            })),
        []
    );

    const weeks = [];

    for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
    }

    return (
        <main className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold mb-8">
                Git Activity
            </h1>

            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setMode("commits")}
                    className={`
                        px-4 py-2 rounded font-semibold transition-all hover:scale-105
                        ${
                        mode === "commits"
                            ? "bg-green-500 text-black"
                            : "bg-zinc-800 text-white"
                    }
                    `}
                >
                    Commits
                </button>

                <button
                    onClick={() => setMode("prs")}
                    className={`
                        px-4 py-2 rounded font-semibold transition-all hover:scale-105
                        ${
                        mode === "prs"
                            ? "bg-blue-500 text-black"
                            : "bg-zinc-800 text-white"
                    }
                    `}
                >
                    PRs
                </button>

                <button
                    onClick={() => setMode("issues")}
                    className={`
                        px-4 py-2 rounded font-semibold transition-all hover:scale-105
                        ${
                        mode === "issues"
                            ? "bg-amber-500 text-black"
                            : "bg-zinc-800 text-white"
                    }
                    `}
                >
                    Issues
                </button>
            </div>

            <div className="flex gap-3">
                <div className="flex flex-col gap-[3px] text-xs text-zinc-500">
                    <div className="h-[15px] flex items-center">Thu</div>
                    <div className="h-[15px] flex items-center">Fri</div>
                    <div className="h-[15px] flex items-center">Sat</div>
                    <div className="h-[15px] flex items-center">Sun</div>
                    <div className="h-[15px] flex items-center">Mon</div>
                    <div className="h-[15px] flex items-center">Tue</div>
                    <div className="h-[15px] flex items-center">Wed</div>
                </div>
                <div className="flex gap-[3px]">
                    {weeks.map((week, weekIndex) => (
                        <div
                            key={weekIndex}
                            className="flex flex-col gap-[3px]"
                        >
                            {week.map((day, dayIndex) => {
                                const value = day[mode];

                                const maxValue = Math.max(
                                    ...data.map(
                                        (day) => day[mode]
                                    )
                                );

                                const opacity =
                                    value === 0
                                        ? 0
                                        : Math.log(value + 1) /
                                        Math.log(maxValue + 1);

                                return (
                                    <HeatmapCell
                                        key={dayIndex}
                                        value={value}
                                        opacity={opacity}
                                        mode={mode}
                                        date={day.date}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}