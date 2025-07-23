import { Octokit } from "octokit";

import type { GitHubAPIRepo } from "$lib/types";

import type { PageServerLoad } from "./$types";

// TODO: Cache the repos.

async function fetchRepos(octokit: Octokit, q: string): Promise<GitHubAPIRepo[]> {
	const response = await octokit.rest.search.repos({
		q,
		sort: "stars",
		order: "desc",
	});
	return response.data.items.map((item) => ({
		name: item.name,
		full_name: item.full_name,
		description: item.description ?? undefined,
		language: item.language ?? undefined,
		stargazers_count: item.stargazers_count,
	}));
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const q = url.searchParams.get("q") ?? "svelte";
	console.log("Fetching repo data with Octokit...");
	const repos = fetchRepos(locals.octokit, q);
	return { repos };
};
