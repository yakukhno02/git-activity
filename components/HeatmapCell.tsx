import { useState } from "react";
type HeatmapCellProps = {
    value: number;
    opacity: number;
    color: | "green" | "blue" | "red" | "teal" | "yellow" | "purple" | "pink";
    date: Date;
    showTooltip?: boolean;
    day: {
        commits: number;
        prs: number;
        issues: number;
    };
};

export default function HeatmapCell({value, opacity, color, date, day, showTooltip = true}: HeatmapCellProps) {
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

        red: [
            "bg-[#ef4444]/20",
            "bg-[#ef4444]/40",
            "bg-[#ef4444]/60",
            "bg-[#ef4444]/80",
            "bg-[#ef4444]",
        ],

        teal: [
            "bg-[#14b8a6]/20",
            "bg-[#14b8a6]/40",
            "bg-[#14b8a6]/60",
            "bg-[#14b8a6]/80",
            "bg-[#14b8a6]",
        ],

        yellow: [
            "bg-[#eab308]/20",
            "bg-[#eab308]/40",
            "bg-[#eab308]/60",
            "bg-[#eab308]/80",
            "bg-[#eab308]",
        ],

        purple: [
            "bg-[#a855f7]/20",
            "bg-[#a855f7]/40",
            "bg-[#a855f7]/60",
            "bg-[#a855f7]/80",
            "bg-[#a855f7]",
        ],

        pink: [
            "bg-[#ec4899]/20",
            "bg-[#ec4899]/40",
            "bg-[#ec4899]/60",
            "bg-[#ec4899]/80",
            "bg-[#ec4899]",
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
                hover:scale-115
                hover:brightness-125
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
                    <div className="font-semibold mb-1">
                        {date.toLocaleDateString()}
                    </div>

                    <div className="text-green-400">
                        Commits: {day.commits}
                    </div>

                    <div className="text-blue-400">
                        PRs: {day.prs}
                    </div>

                    <div className="text-red-400">
                        Issues: {day.issues}
                    </div>

                    <div className="border-t border-zinc-600 mt-1 pt-1">
                        Total: {day.commits + day.prs + day.issues}
                    </div>
                </div>
            )}
        </div>
    );
}