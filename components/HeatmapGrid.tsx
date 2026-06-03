import HeatmapCell from "./HeatmapCell";

type Props = {
    weeks: any[][];
    selectedActivities: {
        commits: boolean;
        prs: boolean;
        issues: boolean;
    };
    maxValue: number;
};

type HeatmapColor =
    | "green"
    | "blue"
    | "red"
    | "teal"
    | "yellow"
    | "purple"
    | "pink";

export default function HeatmapGrid({weeks, selectedActivities, maxValue,}: Props) {
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

                        const value =
                            (selectedActivities.commits ? day.commits : 0) +
                            (selectedActivities.prs ? day.prs : 0) +
                            (selectedActivities.issues ? day.issues : 0);

                        const hasCommits =
                            selectedActivities.commits &&
                            day.commits > 0;

                        const hasPRs =
                            selectedActivities.prs &&
                            day.prs > 0;

                        const hasIssues =
                            selectedActivities.issues &&
                            day.issues > 0;

                        let color: HeatmapColor = "green";

                        if (hasCommits && !hasPRs && !hasIssues) {
                            color = "green";
                        }

                        else if (!hasCommits && hasPRs && !hasIssues) {
                            color = "blue";
                        }

                        else if (!hasCommits && !hasPRs && hasIssues) {
                            color = "red";
                        }

                        else if (hasCommits && hasPRs && !hasIssues) {
                            color = "teal";
                        }

                        else if (hasCommits && !hasPRs && hasIssues) {
                            color = "yellow";
                        }

                        else if (!hasCommits && hasPRs && hasIssues) {
                            color = "purple";
                        }

                        else if (hasCommits && hasPRs && hasIssues) {
                            color = "pink";
                        }

                        const opacity =
                            value === 0
                                ? 0
                                : Math.log(value + 1) /
                                Math.log(maxValue + 1);

                        return (
                            <HeatmapCell
                                key={`${weekIndex}-${dayIndex}`}
                                value={value}
                                opacity={opacity}
                                color={color}
                                date={day.date}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}