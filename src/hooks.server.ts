import type { Handle } from "@sveltejs/kit";
import { Octokit } from "octokit";
import { createClient } from "redis";

import { MemoryCachedRepoAnalyzer, RedisCachedRepoAnalyzer } from "$lib/server/analyze/cache";
import { RedisConnection } from "$lib/server/redis";
import { MemoryCachedRepoSearcher, RedisCachedRepoSearcher } from "$lib/server/search/cache";

export const handle: Handle = async ({ event, resolve }) => {
	let redisConnection: RedisConnection | undefined;

	const redisConnectionURL = process.env["LOCOST_REDIS_URL"];
	if (redisConnectionURL) {
		const redisClient = await createClient({ url: redisConnectionURL })
			.on("error", (err) => console.log("Redis Client Error", err))
			.connect();
		redisConnection = new RedisConnection(redisClient);
	}

	const octokit = new Octokit();
	event.locals.repoSearcher = redisConnection
		? new RedisCachedRepoSearcher(octokit, redisConnection)
		: new MemoryCachedRepoSearcher(octokit);
	event.locals.repoAnalyzer = redisConnection
		? new RedisCachedRepoAnalyzer(redisConnection)
		: new MemoryCachedRepoAnalyzer();

	return resolve(event);
};
