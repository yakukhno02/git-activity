type HeatmapCellProps = {
    value: number;
    opacity: number;
    mode: "commits" | "prs" | "issues";
    date: Date;
};

export default function HeatmapCell({value, opacity, mode, date,}: HeatmapCellProps) {
    let intensityClass = "";

    if (value === 0) {
        intensityClass = "opacity-0";
    } else if (opacity < 0.2) {
        intensityClass =
            mode === "commits"
                ? "bg-green-900"
                : mode === "prs"
                    ? "bg-blue-900"
                    : "bg-amber-900";
    } else if (opacity < 0.4) {
        intensityClass =
            mode === "commits"
                ? "bg-green-700"
                : mode === "prs"
                    ? "bg-blue-700"
                    : "bg-amber-700";
    } else if (opacity < 0.6) {
        intensityClass =
            mode === "commits"
                ? "bg-green-500"
                : mode === "prs"
                    ? "bg-blue-500"
                    : "bg-amber-500";
    } else if (opacity < 0.8) {
        intensityClass =
            mode === "commits"
                ? "bg-green-400"
                : mode === "prs"
                    ? "bg-blue-400"
                    : "bg-amber-400";
    } else {
        intensityClass =
            mode === "commits"
                ? "bg-green-300"
                : mode === "prs"
                    ? "bg-blue-300"
                    : "bg-amber-300";
    }

    return (
        <div
            title={`${date.toDateString()} - ${value} ${mode}`}
            className={`
                w-[15px] h-[15px] rounded-sm
                transition-all duration-200
                cursor-pointer
                ${intensityClass}
            `}
        />
    );
}