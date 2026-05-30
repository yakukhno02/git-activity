type Props = {
    weeks: (any[])[];
};

export default function HeatmapMonths({ weeks }: Props) {
    return (
        <div className="flex gap-[3px] text-xs text-zinc-500 mb-2 ml-[55px] w-fit">
            {weeks.map((week, index) => {
                const firstRealDay = week.find(Boolean);

                if (!firstRealDay) {
                    return (
                        <div
                            key={index}
                            className="w-[15px]"
                        />
                    );
                }

                const month =
                    firstRealDay.date.toLocaleString("en", {
                        month: "short",
                    });

                const previousWeek =
                    index > 0
                        ? weeks[index - 1].find(Boolean)
                        : null;

                const previousMonth =
                    previousWeek
                        ? previousWeek.date.toLocaleString("en", {
                            month: "short",
                        })
                        : "";

                return (
                    <div
                        key={index}
                        className="w-[15px] text-center"
                    >
                        {month !== previousMonth ? month : ""}
                    </div>
                );
            })}
        </div>
    );
}