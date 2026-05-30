export default function HeatmapWeekdays() {
    return (
        <div className="flex flex-col gap-[3px] text-xs text-zinc-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day) => (
                    <div
                        key={day}
                        className="h-[15px] flex items-center"
                    >
                        {day}
                    </div>
                )
            )}
        </div>
    );
}