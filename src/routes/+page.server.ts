import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	// console.log("Fetching repo data with Octokit...");
	// const repos = await locals.octokit.rest.search.repos({
	// 	q: "svelte",
	// 	sort: "stars",
	// 	order: "desc",
	// });

	return { repos: [] };
};
