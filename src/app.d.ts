import type { RepoAnalyzer } from "$lib/server/analyze";
import type { RepoSearcher } from "$lib/server/search";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			repoSearcher: RepoSearcher;
			repoAnalyzer: RepoAnalyzer;
		}
	}
}

export {};
