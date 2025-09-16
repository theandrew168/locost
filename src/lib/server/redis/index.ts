import { createClient } from "redis";

/**
 * By default, expire cached entries after 24 hours.
 */
export const DEFAULT_TTL_SECONDS = 24 * 60 * 60;

export type RedisClient = ReturnType<typeof createClient>;

export class RedisConnection {
	private static _instance?: RedisConnection;
	readonly client: RedisClient;

	constructor(client: RedisClient) {
		this.client = client;
	}

	static async getInstance(redisConnectionURL: string): Promise<RedisConnection> {
		if (!this._instance) {
			const redisClient = await createClient({ url: redisConnectionURL })
				.on("error", (err) => console.log("Redis Client Error", err))
				.connect();
			this._instance = new RedisConnection(redisClient);
		}

		return this._instance;
	}

	async close(): Promise<void> {
		if (!this.client) {
			return;
		}

		this.client.destroy();
		RedisConnection._instance = undefined;
	}
}
