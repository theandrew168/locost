import { GitHubRepo } from "$lib/server/repo";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
	const { owner, name } = params;
	const repo = new GitHubRepo(owner, name);
	const url = repo.url();
	const report = locals.repoAnalyzer.analyze(repo);
	return { owner, name, url, report };
};
