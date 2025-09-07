import type { GitHubAPIRepo } from "$lib/types";

import { RepoSearcher } from ".";

const memoryCache: Map<string, GitHubAPIRepo[]> = new Map();

export class MemoryCachedRepoSearcher extends RepoSearcher {
	override async search(q: string): Promise<GitHubAPIRepo[]> {
		const cachedRepos = memoryCache.get(q);
		if (cachedRepos) {
			console.log(`Using cached result for query: ${q}`);
			return cachedRepos;
		}

		const result = await super.search(q);
		memoryCache.set(q, result);
		return result;
	}
}
