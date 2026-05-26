type HeatmapCellProps = {
    value: number;
    opacity: number;
    mode: "commits" | "prs" | "issues";
    date: Date;
};

export default function HeatmapCell({
                                        value,
                                        opacity,
                                        mode,
                                        date,
                                    }: HeatmapCellProps) {
    let intensityClass = "";

    if (value === 0) {
        intensityClass = "opacity-0";
    } else if (opacity < 0.2) {
        intensityClass = "opacity-20";
    } else if (opacity < 0.4) {
        intensityClass = "opacity-40";
    } else if (opacity < 0.6) {
        intensityClass = "opacity-60";
    } else if (opacity < 0.8) {
        intensityClass = "opacity-80";
    } else {
        intensityClass = "opacity-100";
    }

    const colorClass =
        mode === "commits"
            ? "bg-green-500"
            : mode === "prs"
                ? "bg-blue-500"
                : "bg-amber-500";

    return (
        <div
            title={`${date.toDateString()} - ${value} ${mode}`}
            className={`
                w-4 h-4 rounded-sm
                transition-all duration-200
                cursor-pointer
                ${colorClass}
                ${intensityClass}
            `}
        />
    );
}