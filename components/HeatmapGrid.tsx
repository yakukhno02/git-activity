import HeatmapCell from "./HeatmapCell";

type Props = {
    weeks: any[][];
    mode: "commits" | "prs" | "issues";
    activeColor: "green" | "blue" | "amber";
    maxValue: number;
};

export default function HeatmapGrid({weeks, mode, activeColor, maxValue,}: Props) {
    return (
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
                                key={`${mode}-${weekIndex}-${dayIndex}`}
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
    );
}