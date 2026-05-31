import { ActivityDay } from "@/types/heatmap";

export function generateMockData(): ActivityDay[] {
    return Array.from(
        { length: 365 },
        (_, index) => ({
            date: new Date(2026, 0, index + 1),

            commits:
                Math.random() < 0.6
                    ? 0
                    : Math.random() < 0.015
                        ? 50
                        : Math.floor(Math.random() * 6) + 1,

            prs:
                Math.random() < 0.75
                    ? 0
                    : Math.random() < 0.01
                        ? 10
                        : Math.floor(Math.random() * 4) + 1,

            issues:
                Math.random() < 0.8
                    ? 0
                    : Math.random() < 0.008
                        ? 10
                        : Math.floor(Math.random() * 3) + 1,
        })
    );
}