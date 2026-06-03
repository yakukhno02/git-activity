export type ActivityDay = {
    date: Date;
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
};

export type Mode =
    | "all"
    | "commits"
    | "prs"
    | "issues";

export type Color =
    | "green"
    | "blue"
    | "amber";