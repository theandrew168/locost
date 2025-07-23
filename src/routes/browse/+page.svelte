<script lang="ts">
	import RepoList from "$lib/components/RepoList.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<section>
	<header class="browse-header">
		<h1 class="browse-header-title">Your Repositories</h1>
		<input class="browse-header-search" type="text" placeholder="Search repositories..." />
	</header>

	{#await data.repos}
		<p>Fetching repositories...</p>
	{:then value}
		<RepoList repos={value} />
	{:catch error}
		<p>Error: {error}</p>
	{/await}
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
</style>
