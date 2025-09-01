import { rm } from "node:fs/promises";

import { GitCloner } from "$lib/server/git";
import { GitHubRepo, type Repo } from "$lib/server/repo";
import { SCCAnalyzer, type SCCReport } from "$lib/server/scc";

import type { PageServerLoad } from "./$types";

const cache: Map<string, SCCReport> = new Map();

async function cloneAndAnalyzeRepo(repo: Repo) {
	if (cache.has(repo.key())) {
		console.log(`Using cached report for repo: ${repo.key()}`);
		return cache.get(repo.key())!;
	}

	console.log(`Cloning ${repo.url()}...`);
	const cloner = new GitCloner();
	const codeDir = await cloner.clone(repo);

	console.log("Analyzing source code complexity...");
	const analyzer = new SCCAnalyzer();
	const report = await analyzer.analyze(codeDir);

	console.log("Cleaning and caching...");
	await rm(codeDir, { recursive: true, force: true });
	cache.set(repo.key(), report);

	return report;
}

export const load: PageServerLoad = async ({ params }) => {
	const { owner, name } = params;
	const repo = new GitHubRepo(owner, name);
	const url = repo.url();
	const report = cloneAndAnalyzeRepo(repo);
	return { owner, name, url, report };
};
