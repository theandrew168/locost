import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const q = url.searchParams.get("q");
	if (!q) {
		return { repos: [] };
	}

	const repos = locals.repoSearcher.search(q);
	return { repos };
};
