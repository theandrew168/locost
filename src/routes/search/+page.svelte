<script lang="ts">
	import { page } from "$app/state";

	import Loader from "$lib/components/Loader.svelte";
	import RepoList from "$lib/components/RepoList.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	let q = $derived(page.url.searchParams.get("q") ?? "");
</script>

<section>
	<header class="browse-header">
		<h1 class="browse-header-title">Repositories</h1>
		<search>
			<form method="GET" action="/search">
				<input class="browse-header-search" type="text" name="q" value={q} placeholder="Search repositories..." />
			</form>
		</search>
	</header>

	{#await data.repos}
		<Loader />
	{:then value}
		<RepoList repos={value} />
	{:catch error}
		<p>Error: {error.message}</p>
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
