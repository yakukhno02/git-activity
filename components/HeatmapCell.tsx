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
            "bg-green-900",
            "bg-green-700",
            "bg-green-500",
            "bg-green-400",
            "bg-green-300",
        ],

        blue: [
            "bg-blue-900",
            "bg-blue-800",
            "bg-blue-700",
            "bg-blue-600",
            "bg-blue-500",
        ],

        amber: [
            "bg-amber-900",
            "bg-amber-700",
            "bg-amber-500",
            "bg-amber-400",
            "bg-amber-300",
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