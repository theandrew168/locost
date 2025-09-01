import fs from "node:fs";
import path from "node:path";

import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

import type { Repo } from "$lib/server/repo";

export class GitCloner {
	private dataDir: string;

	constructor(dataDir: string = "/tmp/locost_data") {
		this.dataDir = dataDir;
	}

	/**
	 * Clone a Git repository to a local directory.
	 * @param repo The repository to clone.
	 * @returns The local directory where the repository was cloned.
	 */
	async clone(repo: Repo): Promise<string> {
		const dir = path.join(this.dataDir, repo.key());
		const url = repo.url();

		await git.clone({
			fs,
			http,
			dir,
			url,
			depth: 1,
			singleBranch: true,
		});

		return dir;
	}
}
