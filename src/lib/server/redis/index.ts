import type { createClient } from "redis";

export type RedisClient = ReturnType<typeof createClient>;

export class RedisConnection {
	readonly client: RedisClient;

	constructor(client: RedisClient) {
		this.client = client;
	}
}
