type HeatmapCellProps = {
    value: number;
    opacity: number;
    color: "green" | "blue" | "amber";
    date: Date;
};

export default function HeatmapCell({
                                        value,
                                        opacity,
                                        color,
                                        date,
                                    }: HeatmapCellProps) {
    let intensityClass = "";

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
            title={`${date.toDateString()} - ${value}`}
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