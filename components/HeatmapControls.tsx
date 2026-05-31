type Mode = "commits" | "prs" | "issues";

type Props = {
    mode: Mode;
    setMode: (mode: Mode) => void;
};

export default function HeatmapControls({mode, setMode,}: Props) {
    return (
        <div className="flex gap-3 mb-6">
            <button
                onClick={() => setMode("commits")}
                className={`
                    px-4 py-2 rounded font-semibold
                    transition-all hover:scale-105
                    ${
                    mode === "commits"
                        ? "bg-green-500 text-black"
                        : "bg-neutral-900 text-white"
                }
                `}
            >
                Commits
            </button>

            <button
                onClick={() => setMode("prs")}
                className={`
                    px-4 py-2 rounded font-semibold
                    transition-all hover:scale-105
                    ${
                    mode === "prs"
                        ? "bg-blue-500 text-black"
                        : "bg-neutral-900 text-white"
                }
                `}
            >
                PRs
            </button>

            <button
                onClick={() => setMode("issues")}
                className={`
                    px-4 py-2 rounded font-semibold
                    transition-all hover:scale-105
                    ${
                    mode === "issues"
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