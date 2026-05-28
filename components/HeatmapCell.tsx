type HeatmapCellProps = {
    value: number;
    opacity: number;
    mode: "commits" | "prs" | "issues";
    date: Date;
};

export default function HeatmapCell({value, opacity, mode, date,}: HeatmapCellProps) {
    let intensityClass = "";

    const colors = {
        commits: [
            "bg-green-950",
            "bg-green-800",
            "bg-green-600",
            "bg-green-500",
            "bg-green-400",
        ],

        prs: [
            "bg-blue-950",
            "bg-blue-800",
            "bg-blue-600",
            "bg-blue-500",
            "bg-blue-400",
        ],

        issues: [
            "bg-amber-200",
            "bg-amber-300",
            "bg-amber-400",
            "bg-amber-500",
            "bg-amber-600",
        ],
    };

    if (value === 0) {
        intensityClass = "bg-zinc-900";
    } else if (opacity < 0.2) {
        intensityClass = colors[mode][0];
    } else if (opacity < 0.4) {
        intensityClass = colors[mode][1];
    } else if (opacity < 0.6) {
        intensityClass = colors[mode][2];
    } else if (opacity < 0.8) {
        intensityClass = colors[mode][3];
    } else {
        intensityClass = colors[mode][4];
    }

    return (
        <div
            title={`${date.toDateString()} - ${value} ${mode}`}
            className={`
                w-[15px] h-[15px]
                rounded-sm
                transition-all duration-200
                cursor-pointer
                ${intensityClass}
            `}
        />
    );
}