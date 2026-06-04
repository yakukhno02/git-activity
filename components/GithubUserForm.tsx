type Props = {
    username: string;
    setUsername: (username: string) => void;
    onLoad: () => void;
    isLoading: boolean;
};

export default function GithubUserForm({username, setUsername, onLoad, isLoading, }: Props) {
    return (
        <div className="flex gap-3 mb-6">
            <input
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        void onLoad();
                    }
                }}
                placeholder="GitHub username"
                className="
                    bg-neutral-900
                    text-white
                    px-4
                    py-2
                    rounded
                    outline-none
                    border
                    border-neutral-800
                "
            />

            <button
                onClick={onLoad}
                disabled={isLoading}
                className="
                    bg-white
                    text-black
                    px-4
                    py-2
                    rounded
                    font-semibold
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
            >
                {isLoading ? "Loading..." : "Load"}
            </button>
        </div>
    );
}