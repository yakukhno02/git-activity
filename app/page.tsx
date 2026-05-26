import HeatmapCell from "@/components/HeatmapCell";

const data = Array.from({ length: 365 }, (_, index) => ({
    date: new Date(2026, 0, index + 1),

    commits: Math.floor(Math.random() * 10),
    prs: Math.floor(Math.random() * 5),
    issues: Math.floor(Math.random() * 3),
}));

const mode: "commits" | "prs" | "issues" = "prs";

const average = data.reduce((sum, day) => sum + day[mode], 0) / data.length;

export default function Home() {
  return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-8">
          Git Activity
        </h1>

        <div className="grid grid-flow-col grid-rows-7 gap-1">
            {data.map((day, index) => {
                const value = day[mode];

                const opacity = Math.min(
                    Math.max(value / average, 0.15),
                    1
                );

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