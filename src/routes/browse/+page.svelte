<script lang="ts">
	import { faFolder } from "@fortawesome/free-regular-svg-icons";
	import { faStar } from "@fortawesome/free-solid-svg-icons";

	import Icon from "$lib/components/Icon.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<section>
	<header class="browse-header">
		<h1 class="browse-header-title">Your Repositories</h1>
		<input class="browse-header-search" type="text" placeholder="Search repositories..." />
	</header>

	<ul class="browse-list">
		{#each data.repos as repo}
			<li>
				<a class="browse-list-item" href={`/analyze/${repo.full_name}`}>
					<div class="browse-list-item-header">
						<span class="browse-list-item-name">
							<span class="browse-list-item-icon">
								<Icon icon={faFolder} />
							</span>
							<span>{repo.name}</span>
						</span>
						<span class="browse-list-item-language">{repo.language ?? "Unknown"}</span>
					</div>

					<div class="browse-list-item-details">
						<span class="browse-list-item-description">{repo.description}</span>

						<span class="browse-list-item-stars">
							<Icon icon={faStar} size={12} />
							{repo.stargazers_count}
						</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.browse-header {
		max-width: 48em;
		margin: 2em auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.browse-header-title {
		font-size: 1.5rem;
		font-weight: 600;
	}
	.browse-header-search {
		padding: 0.5em;
		border: 1px solid var(--color-light-gray);
		border-radius: 0.25em;
		box-shadow: var(--shadow);
	}
	.browse-list {
		background-color: var(--color-white);
		max-width: 48em;
		margin: 2em auto;
		border-radius: 0.5em;
		box-shadow: var(--shadow);
	}
	.browse-list-item {
		display: block;
		padding: 1em;
	}
	.browse-list-item:hover {
		cursor: pointer;
		background-color: var(--color-light-gray);
	}
	.browse-list-item-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
		margin-bottom: 0.5em;
	}
	.browse-list-item-name {
		display: flex;
		align-items: center;
		gap: 0.5em;
		color: var(--color-primary);
	}
	.browse-list-item-icon {
		display: inline-flex;
		color: var(--color-dark-gray);
	}
	.browse-list-item-language {
		font-size: 0.75rem;
		font-weight: 500;
		background-color: var(--color-mid-gray);
		padding: 0.25em 0.5em;
		border-radius: 1em;
	}
	.browse-list-item-details {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
	}
	.browse-list-item-description {
		font-size: 0.75rem;
		font-weight: 400;
	}
	.browse-list-item-stars {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: 0.25em;
	}
</style>
