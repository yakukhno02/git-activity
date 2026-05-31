export type ActivityDay = {
    date: Date;
    commits: number;
    prs: number;
    issues: number;
};

export type Mode =
    | "commits"
    | "prs"
    | "issues";

export type Color =
    | "green"
    | "blue"
    | "amber";