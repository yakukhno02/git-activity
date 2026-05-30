import { useState } from "react";
type HeatmapCellProps = {
    value: number;
    opacity: number;
    color: "green" | "blue" | "amber";
    date: Date;
    showTooltip?: boolean;
};

export default function HeatmapCell({value, opacity, color, date, showTooltip = true}: HeatmapCellProps) {
    let intensityClass = "";

    const [hovered, setHovered] = useState(false);
    const colors = {
        green: [
            "bg-[#39d353]/20",
            "bg-[#39d353]/40",
            "bg-[#39d353]/60",
            "bg-[#39d353]/80",
            "bg-[#39d353]",
        ],

        blue: [
            "bg-[#218bff]/20",
            "bg-[#218bff]/40",
            "bg-[#218bff]/60",
            "bg-[#218bff]/80",
            "bg-[#218bff]",
        ],

        amber: [
            "bg-[#f59e0b]/20",
            "bg-[#f59e0b]/40",
            "bg-[#f59e0b]/60",
            "bg-[#f59e0b]/80",
            "bg-[#f59e0b]",
        ],
    };

    if (value === 0) {
        intensityClass = "bg-[#161b22]";
    } else if (opacity < 0.2) {
        intensityClass = colors[color][0];
    } else if (opacity < 0.4) {
        intensityClass = colors[color][1];
    } else if (opacity < 0.6) {
        intensityClass = colors[color][2];
    } else if (opacity < 0.8) {
        intensityClass = colors[color][3];
    } else {
        intensityClass = colors[color][4];
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className={`
                w-[15px] h-[15px]
                rounded-sm
                transition-all duration-200
                cursor-pointer
                ${intensityClass}
            `}
            />

            {hovered && showTooltip && (
                <div
                    className="
                    absolute
                    bottom-6
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded
                    bg-zinc-800
                    px-2
                    py-1
                    text-xs
                    text-white
                    shadow-lg
                    z-50
                    pointer-events-none
                "
                >
                    {value}{" "}
                    {color === "green"
                        ? "commits"
                        : color === "blue"
                            ? "PRs"
                            : "issues"}{" "}
                    on {date.toLocaleDateString()}
                </div>
            )}
        </div>
    );
}