import type { SCCReport } from "$lib/types";

import { RepoAnalyzer } from ".";
import type { Repo } from "../repo";

const cache: Map<string, SCCReport> = new Map();

export class CachedRepoAnalyzer extends RepoAnalyzer {
	override async analyze(repo: Repo) {
		const cachedReport = cache.get(repo.key());
		if (cachedReport) {
			console.log(`Using cached report for repo: ${repo.key()}`);
			return cachedReport;
		}

		const report = await super.analyze(repo);
		cache.set(repo.key(), report);
		return report;
	}
}
