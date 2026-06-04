import HeatmapPage from "@/components/HeatmapPage";

type Props = {
    params: Promise<{
        username: string;
    }>;
};

export default async function UserPage({
                                           params,
                                       }: Props) {
    const { username } = await params;

    return (
        <HeatmapPage
            initialUsername={username}
        />
    );
}