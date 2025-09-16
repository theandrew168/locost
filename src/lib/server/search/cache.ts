import type { Octokit } from "octokit";

import type { GitHubAPIRepo } from "$lib/types";

import { RepoSearcher } from ".";
import { DEFAULT_TTL_SECONDS, type RedisConnection } from "../redis";

const memoryCache: Map<string, GitHubAPIRepo[]> = new Map();

export class MemoryCachedRepoSearcher extends RepoSearcher {
	constructor(octokit: Octokit) {
		super(octokit);
	}

	override async search(q: string): Promise<GitHubAPIRepo[]> {
		const cachedRepos = memoryCache.get(q);
		if (cachedRepos) {
			console.log(`Using memory-cached result for query: ${q}`);
			return cachedRepos;
		}

		const result = await super.search(q);
		memoryCache.set(q, result);
		return result;
	}
}

export class RedisCachedRepoSearcher extends RepoSearcher {
	private conn: RedisConnection;

	constructor(octokit: Octokit, conn: RedisConnection) {
		super(octokit);
		this.conn = conn;
	}

	override async search(q: string): Promise<GitHubAPIRepo[]> {
		const key = `locost:search:${q}`;

		const cachedRepos = await this.conn.client.GET(key);
		if (cachedRepos) {
			console.log(`Using redis-cached result for query: ${q}`);
			return JSON.parse(cachedRepos);
		}

		const result = await super.search(q);
		this.conn.client.SET(key, JSON.stringify(result), {
			expiration: {
				type: "EX",
				value: DEFAULT_TTL_SECONDS,
			},
		});
		return result;
	}
}
