import type { SCCReport } from "$lib/types";

import { RepoAnalyzer } from ".";
import type { Repo } from "../repo";

const memoryCache: Map<string, SCCReport> = new Map();

export class MemoryCachedRepoAnalyzer extends RepoAnalyzer {
	override async analyze(repo: Repo) {
		const cachedReport = memoryCache.get(repo.key());
		if (cachedReport) {
			console.log(`Using cached report for repo: ${repo.key()}`);
			return cachedReport;
		}

		const report = await super.analyze(repo);
		memoryCache.set(repo.key(), report);
		return report;
	}
}
