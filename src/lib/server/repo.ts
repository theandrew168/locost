export type Repo = {
	key: () => string;
	url: () => string;
};

export class GitHubRepo implements Repo {
	private owner: string;
	private repo: string;

	constructor(owner: string, repo: string) {
		this.owner = owner;
		this.repo = repo;
	}

	key(): string {
		return `github/${this.owner}/${this.repo}`;
	}

	url(): string {
		return `https://github.com/${this.owner}/${this.repo}`;
	}
}
