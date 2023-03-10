export interface GitHubIssueModel {
    number: number,
    url: string,
    title: string,
    body?: string | null
};