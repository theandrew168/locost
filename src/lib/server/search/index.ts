import type { Octokit } from "octokit";

import type { GitHubAPIRepo } from "$lib/types";

export class RepoSearcher {
	private octokit: Octokit;

	constructor(octokit: Octokit) {
		this.octokit = octokit;
	}

	async search(q: string): Promise<GitHubAPIRepo[]> {
		console.log("Fetching repo data with Octokit...");
		const response = await this.octokit.rest.search.repos({
			q,
			sort: "stars",
			order: "desc",
		});

		const repos = response.data.items.map((item) => ({
			name: item.name,
			full_name: item.full_name,
			description: item.description ?? undefined,
			language: item.language ?? undefined,
			stargazers_count: item.stargazers_count,
		}));
		return repos;
	}
}
