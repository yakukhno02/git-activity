type Props = {
    commits: number;
    prs: number;
    issues: number;
};

export default function HeatmapStats({commits, prs, issues,}: Props) {
    return (
        <div className="flex gap-3 mb-5">
            <div className="bg-neutral-900 rounded-lg p-2 min-w-[120px]">
                <p className="text-zinc-400 text-sm">
                    Commits
                </p>

                <p className="text-2xl font-bold text-green-400">
                    {commits}
                </p>
            </div>

            <div className="bg-neutral-900 rounded-lg p-2 min-w-[120px]">
                <p className="text-zinc-400 text-sm">
                    PRs
                </p>

                <p className="text-2xl font-bold text-blue-400">
                    {prs}
                </p>
            </div>

            <div className="bg-neutral-900 rounded-lg p-2 min-w-[120px]">
                <p className="text-zinc-400 text-sm">
                    Issues
                </p>

                <p className="text-2xl font-bold text-amber-400">
                    {issues}
                </p>
            </div>
        </div>
    );
}