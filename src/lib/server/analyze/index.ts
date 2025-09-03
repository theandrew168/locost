import { rm } from "node:fs/promises";

import { GitCloner } from "../git";
import type { Repo } from "../repo";
import { SCCReporter } from "../report";

export class RepoAnalyzer {
	async analyze(repo: Repo) {
		console.log(`Cloning, analyzing, and cleaning: ${repo.key()}...`);

		const cloner = new GitCloner();
		const codeDir = await cloner.clone(repo);

		const reporter = new SCCReporter();
		const report = await reporter.analyze(codeDir);

		await rm(codeDir, { recursive: true, force: true });

		return report;
	}
}
