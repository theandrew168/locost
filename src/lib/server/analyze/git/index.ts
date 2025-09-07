import fs from "node:fs";

import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

/**
 * Clone a Git repository to a local directory.
 * @param url The URL of the repository to clone.
 * @param dir The local directory where the repository should be cloned.
 */
export async function clone(url: string, dir: string): Promise<void> {
	await git.clone({
		fs,
		http,
		dir,
		url,
		depth: 1,
		singleBranch: true,
	});
}
