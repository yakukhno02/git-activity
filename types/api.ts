import {ActivityDay} from "@/types/heatmap";

export type ActivityDayResponse =
    Omit<ActivityDay, "date"> & {
    date: string;
};