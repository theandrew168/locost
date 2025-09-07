import { realpathSync } from "node:fs";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import type { Repo } from "../repo";
import { clone } from "./git";
import { analyze } from "./report";

export class RepoAnalyzer {
	private dataDir: string;

	constructor(dataDirName: string = "locost_data") {
		const tempDir = realpathSync(tmpdir());
		this.dataDir = path.join(tempDir, dataDirName);
	}

	async analyze(repo: Repo) {
		console.log(`Cloning, analyzing, and cleaning: ${repo.key()}...`);

		const cloneURL = repo.url();
		const cloneDir = path.join(this.dataDir, repo.key());

		try {
			// These operations need to be awaited here (and not returned as a promise) because
			// otherwise the clone dir will likely get removed before the analysis can run.
			await clone(cloneURL, cloneDir);
			const report = await analyze(cloneDir);
			return report;
		} finally {
			await rm(cloneDir, { recursive: true, force: true });
		}
	}
}
