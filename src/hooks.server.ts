import type { Handle } from "@sveltejs/kit";
import { Octokit } from "octokit";

import { CachedRepoAnalyzer } from "$lib/server/analyze/cache";
import { CachedRepoSearcher } from "$lib/server/search/cache";

export const handle: Handle = async ({ event, resolve }) => {
	const octokit = new Octokit();
	event.locals.repoSearcher = new CachedRepoSearcher(octokit);
	event.locals.repoAnalyzer = new CachedRepoAnalyzer();
	return resolve(event);
};
