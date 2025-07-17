import fs from "node:fs";
import path from "node:path";

import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

import { SCCAnalyzer } from "$lib/server/scc";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	console.log("Fetching repo data with Octokit...");
	const owner = "theandrew168";
	const repo = "locost";
	// const repoData = await locals.octokit.rest.repos.get({
	// 	owner: "theandrew168",
	// 	repo: "locost",
	// });

	const dir = path.join("data", owner, repo);
	const url = "https://github.com/theandrew168/locost";

	console.log(`Cloning repository ${url} into ${dir}...`);
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

	return { report };
};
