import { RepoAnalyzer } from ".";
import type { Repo } from "../repo";
import type { SCCReport } from "../report";

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
