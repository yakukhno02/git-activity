type Props = {
    selectedActivities: {
        commits: boolean;
        prs: boolean;
        issues: boolean;
    };

    setSelectedActivities: React.Dispatch<
        React.SetStateAction<{
            commits: boolean;
            prs: boolean;
            issues: boolean;
        }>
    >;
};

export default function HeatmapControls({selectedActivities, setSelectedActivities,}: Props) {
    return (
        <div className="flex gap-3 mb-6">

            <button
                onClick={() =>
                    setSelectedActivities((prev) => ({
                        ...prev,
                        commits: !prev.commits,
                    }))
            }
                className={`
                    px-4 py-2 rounded font-semibold
                    transition-all hover:scale-105
                    ${
                    selectedActivities.commits
                        ? "bg-green-500 text-black"
                        : "bg-neutral-900 text-white"
                    }
                `}
            >
                Commits
            </button>

            <button
                onClick={() => setSelectedActivities((prev) => ({
                    ...prev,
                    prs: !prev.prs,
                }))
            }
                className={`
                    px-4 py-2 rounded font-semibold
                    transition-all hover:scale-105
                    ${
                    selectedActivities.prs
                        ? "bg-blue-500 text-black"
                        : "bg-neutral-900 text-white"
                }
                `}
            >
                PRs
            </button>

            <button
                onClick={() => setSelectedActivities((prev) => ({
                    ...prev,
                    issues: !prev.issues,
                }))
            }
                className={`
                    px-4 py-2 rounded font-semibold
                    transition-all hover:scale-105
                    ${
                    selectedActivities.issues
                        ? "bg-amber-500 text-black"
                        : "bg-neutral-900 text-white"
                }
                `}
            >
                Issues
            </button>
        </div>
    );
}