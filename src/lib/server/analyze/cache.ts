import type { SCCReport } from "$lib/types";

import { RepoAnalyzer } from ".";
import type { RedisConnection } from "../redis";
import type { Repo } from "../repo";

const memoryCache: Map<string, SCCReport> = new Map();

export class MemoryCachedRepoAnalyzer extends RepoAnalyzer {
	override async analyze(repo: Repo): Promise<SCCReport> {
		const cachedReport = memoryCache.get(repo.key());
		if (cachedReport) {
			console.log(`Using memory-cached report for repo: ${repo.key()}`);
			return cachedReport;
		}

		const report = await super.analyze(repo);
		memoryCache.set(repo.key(), report);
		return report;
	}
}

export class RedisCachedRepoAnalyzer extends RepoAnalyzer {
	private conn: RedisConnection;

	constructor(conn: RedisConnection) {
		super();
		this.conn = conn;
	}

	override async analyze(repo: Repo): Promise<SCCReport> {
		const key = `locost:analyze:${repo.key()}`;

		const cachedReport = await this.conn.client.GET(key);
		if (cachedReport) {
			console.log(`Using redis-cached report for repo: ${repo.key()}`);
			return JSON.parse(cachedReport);
		}

		const result = await super.analyze(repo);
		this.conn.client.SET(key, JSON.stringify(result));
		return result;
	}
}
