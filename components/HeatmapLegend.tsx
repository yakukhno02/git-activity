import HeatmapCell from "./HeatmapCell";

type Props = {
    color: "green" | "blue" | "amber";
};

export default function HeatmapLegend({ color }: Props) {
    return (
        <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>Less</span>

            {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
                <HeatmapCell
                    key={opacity}
                    value={1}
                    opacity={opacity}
                    color={color}
                    date={new Date()}
                    showTooltip={false}
                />
            ))}

            <span>More</span>
        </div>
    );
}