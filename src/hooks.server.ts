import type { Handle, ServerInit } from "@sveltejs/kit";
import { building } from "$app/environment";
import { Octokit } from "octokit";

import { MemoryCachedRepoAnalyzer, RedisCachedRepoAnalyzer } from "$lib/server/analyze/cache";
import { RedisConnection } from "$lib/server/redis";
import { MemoryCachedRepoSearcher, RedisCachedRepoSearcher } from "$lib/server/search/cache";

let redisConnection: RedisConnection | undefined;

// Perform any necessary initialization at application startup.
export const init: ServerInit = async () => {
	// Avoid running initialization steps during the build process.
	// https://svelte.dev/docs/kit/building-your-app#During-the-build
	if (building) {
		return;
	}

	const redisConnectionURL = process.env["LOCOST_REDIS_URL"];
	if (redisConnectionURL) {
		redisConnection = await RedisConnection.getInstance(redisConnectionURL);
	}
};

// Be sure to close the redis connection when the server shuts down.
// Otherwise, the NodeJS process will hang indefinitely.
process.on("sveltekit:shutdown", async () => {
	if (redisConnection) {
		await redisConnection.close();
	}
});

export const handle: Handle = async ({ event, resolve }) => {
	const octokit = new Octokit();

	event.locals.repoSearcher = redisConnection
		? new RedisCachedRepoSearcher(octokit, redisConnection)
		: new MemoryCachedRepoSearcher(octokit);
	event.locals.repoAnalyzer = redisConnection
		? new RedisCachedRepoAnalyzer(redisConnection)
		: new MemoryCachedRepoAnalyzer();

	return resolve(event);
};
