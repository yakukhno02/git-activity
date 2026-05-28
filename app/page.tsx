"use client";

import { useMemo, useState } from "react";
import HeatmapCell from "@/components/HeatmapCell";

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

            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setMode("commits")}
                    className={`
                        px-4 py-2 rounded font-semibold transition-all hover:scale-105
                        ${
                        mode === "commits"
                            ? "bg-green-500 text-black"
                            : "bg-neutral-900 text-white"
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
                            : "bg-neutral-900 text-white"
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
                            : "bg-neutral-900 text-white"
                    }
                    `}
                >
                    Issues
                </button>
            </div>

            <div className="flex gap-[3px] text-xs text-zinc-500 mb-2 ml-[55px] w-fit">
                {weeks.map((week, index) => {
                    const firstRealDay = week.find(Boolean);

                    if (!firstRealDay) {
                        return (
                            <div
                                key={index}
                                className="w-[15px]"
                            />
                        );
                    }

                    const month =
                        firstRealDay.date.toLocaleString(
                            "en",
                            {
                                month: "short",
                            }
                        );

                    const previousWeek =
                        index > 0
                            ? weeks[index - 1].find(Boolean)
                            : null;

                    const previousMonth =
                        previousWeek
                            ? previousWeek.date.toLocaleString(
                                "en",
                                {
                                    month: "short",
                                }
                            )
                            : "";

                    return (
                        <div
                            key={index}
                            className="w-[15px] text-center"
                        >
                            {month !== previousMonth
                                ? month
                                : ""}
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-[3px] w-fit">
                <div className="flex flex-col gap-[3px] text-xs text-zinc-500">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                            <div
                                key={day}
                                className="h-[15px] flex items-center"
                            >
                                {day}
                            </div>
                        )
                    )}
                </div>

                <div className="flex gap-[3px]">
                    {weeks.map((week, weekIndex) => (
                        <div
                            key={weekIndex}
                            className="flex flex-col gap-[3px]"
                        >
                            {week.map((day, dayIndex) => {
                                if (!day) {
                                    return (
                                        <div
                                            key={dayIndex}
                                            className="w-[15px] h-[15px]"
                                        />
                                    );
                                }

                                const value = day[mode];

                                const opacity =
                                    value === 0
                                        ? 0
                                        : Math.log(value + 1) /
                                        Math.log(maxValue + 1);

                                return (
                                    <HeatmapCell
                                        key={`${mode}-${dayIndex}-${weekIndex}`}
                                        value={value}
                                        opacity={opacity}
                                        color={activeColor}
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