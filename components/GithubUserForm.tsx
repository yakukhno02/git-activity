type Props = {
    username: string;
    setUsername: (username: string) => void;
    onLoad: () => void;
};

export default function GithubUserForm({username, setUsername, onLoad,}: Props) {
    return (
        <div className="flex gap-3 mb-6">
            <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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
                className="
                    bg-white
                    text-black
                    px-4
                    py-2
                    rounded
                    font-semibold
                "
            >
                Load
            </button>
        </div>
    );
}