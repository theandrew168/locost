import fs from "node:fs";

import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

import { SCCAnalyzer } from "$lib/server/scc";

import type { PageServerLoad } from "./$types";

async function cloneAndAnalyzeRepo(owner: string, repo: string) {
	const dir = `/tmp/locost_data/${owner}/${repo}`;
	const url = `https://github.com/${owner}/${repo}`;

	console.log(`Cloning ${owner}/${repo}...`);
	await git.clone({
		fs,
		http,
		dir,
		url,
		depth: 1,
		singleBranch: true,
	});

	console.log("Analyzing source code complexity...");
	const analyzer = new SCCAnalyzer();
	const report = await analyzer.analyze(dir);

	return report;
}

export const load: PageServerLoad = async ({ params }) => {
	const { owner, repo } = params;
	const report = cloneAndAnalyzeRepo(owner, repo);
	return { report };
};
