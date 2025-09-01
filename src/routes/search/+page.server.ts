import { Octokit } from "octokit";

import type { GitHubAPIRepo } from "$lib/types";

import type { PageServerLoad } from "./$types";

const cache: Map<string, GitHubAPIRepo[]> = new Map();

async function fetchRepos(octokit: Octokit, q: string): Promise<GitHubAPIRepo[]> {
	if (cache.has(q)) {
		console.log(`Using cached repos for query: ${q}`);
		return cache.get(q)!;
	}

	console.log("Fetching repo data with Octokit...");
	const response = await octokit.rest.search.repos({
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
	cache.set(q, repos);

	return repos;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const q = url.searchParams.get("q");
	if (!q) {
		return { repos: [] };
	}

	const repos = fetchRepos(locals.octokit, q);
	return { repos };
};
