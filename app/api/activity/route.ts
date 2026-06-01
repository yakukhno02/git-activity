import { generateMockData } from "@/utils/generateMockData";

export async function GET() {
    const data = generateMockData();

    return Response.json(data);
}