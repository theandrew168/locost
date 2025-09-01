import type { GitHubAPIRepo } from "$lib/types";

import { RepoSearcher } from ".";

const cache: Map<string, GitHubAPIRepo[]> = new Map();

export class CachedRepoSearcher extends RepoSearcher {
	override async search(q: string): Promise<GitHubAPIRepo[]> {
		const cachedRepos = cache.get(q);
		if (cachedRepos) {
			console.log(`Using cached result for query: ${q}`);
			return cachedRepos;
		}

		const result = await super.search(q);
		cache.set(q, result);
		return result;
	}
}
