<script lang="ts">
	import { faFolder } from "@fortawesome/free-regular-svg-icons";
	import { faStar } from "@fortawesome/free-solid-svg-icons";

	import type { GitHubAPIRepo } from "$lib/types";

	import Icon from "./Icon.svelte";

	type Props = {
		repos: GitHubAPIRepo[];
	};

	let { repos }: Props = $props();
</script>

<ul class="repo-list">
	{#each repos as repo}
		<li class="repo-list-border">
			<a class="repo-list-item" href={`/analyze/${repo.full_name}`}>
				<div class="repo-list-item-header">
					<span class="repo-list-item-name">
						<span class="repo-list-item-icon">
							<Icon icon={faFolder} size={20} />
						</span>
						<span>{repo.name}</span>
					</span>
					<span class="repo-list-item-language">{repo.language ?? "Unknown"}</span>
				</div>

				<div class="repo-list-item-details">
					<span class="repo-list-item-description">{repo.description}</span>

					<span class="repo-list-item-stars">
						<Icon icon={faStar} size={12} />
						{repo.stargazers_count}
					</span>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.repo-list {
		background-color: var(--color-white);
		max-width: 48em;
		margin: 2em auto;
		border-radius: 0.5em;
		box-shadow: var(--shadow);
	}
	/* TODO: Pick a better class name for this. */
	.repo-list-border:not(:last-child) {
		border-bottom: 1px solid var(--color-medium-gray);
	}
	.repo-list-item {
		display: block;
		padding: 1em;
	}
	.repo-list-item:hover {
		cursor: pointer;
		background-color: var(--color-light-gray);
	}
	.repo-list-item:not(:last-child) {
		border-bottom: 1px solid var(--color-medium-gray);
	}
	.repo-list-item-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
		margin-bottom: 0.5em;
	}
	.repo-list-item-name {
		display: flex;
		align-items: center;
		gap: 0.5em;
		color: var(--color-primary);
	}
	.repo-list-item-icon {
		display: inline-flex;
		color: var(--color-dark-gray);
	}
	.repo-list-item-language {
		font-size: 0.75rem;
		font-weight: 500;
		background-color: var(--color-medium-gray);
		padding: 0.25em 0.5em;
		border-radius: 1em;
	}
	.repo-list-item-details {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
	}
	.repo-list-item-description {
		font-size: 0.75rem;
		font-weight: 400;
	}
	.repo-list-item-stars {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: 0.25em;
	}
</style>
