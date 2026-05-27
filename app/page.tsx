"use client";
import { useMemo, useState } from "react";
import HeatmapCell from "@/components/HeatmapCell";

export default function Home() {
    const [mode, setMode] = useState<"commits" | "prs" | "issues">("commits");
    const data = useMemo(
        () =>
            Array.from({ length: 365 }, (_, index) => ({
                date: new Date(2026, 0, index + 1),

                commits: Math.floor(Math.random() * 10),
                prs: Math.floor(Math.random() * 5),
                issues: Math.floor(Math.random() * 3),
            })),
        []
    );
    const average = data.reduce((sum, day) => sum + day[mode], 0) / data.length;
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
                        ${mode === "commits"
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
                        ${mode === "prs"
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
                        ${mode === "issues"
                      ? "bg-amber-500 text-black"
                      : "bg-zinc-800 text-white"
                  }
              `}
              >
                  Issues
              </button>
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-1">
              {data.map((day, index) => {
                  const value = day[mode];

                  const opacity = Math.min(value / (average * 2), 1);

                  return (
                      <HeatmapCell
                          key={index}
                          value={value}
                          opacity={opacity}
                          mode={mode}
                          date={day.date}
                      />
                  );
              })}
          </div>
      </main>
  );
}