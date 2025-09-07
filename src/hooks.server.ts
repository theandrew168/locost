import type { Handle } from "@sveltejs/kit";
import { Octokit } from "octokit";

import { MemoryCachedRepoAnalyzer } from "$lib/server/analyze/cache";
import { MemoryCachedRepoSearcher } from "$lib/server/search/cache";

export const handle: Handle = async ({ event, resolve }) => {
	const octokit = new Octokit();
	event.locals.repoSearcher = new MemoryCachedRepoSearcher(octokit);
	event.locals.repoAnalyzer = new MemoryCachedRepoAnalyzer();
	return resolve(event);
};
