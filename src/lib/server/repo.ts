export type Repo = {
	key: () => string;
	url: () => string;
};

export class GitHubRepo implements Repo {
	private owner: string;
	private name: string;

	constructor(owner: string, name: string) {
		this.owner = owner;
		this.name = name;
	}

	key(): string {
		return `github/${this.owner}/${this.name}`;
	}

	url(): string {
		return `https://github.com/${this.owner}/${this.name}`;
	}
}
