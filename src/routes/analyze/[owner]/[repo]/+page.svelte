<script lang="ts">
	import Loader from "$lib/components/Loader.svelte";
	import Report from "$lib/components/Report.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<section class="report">
	<h1 class="report-title">Project Metrics</h1>

	{#await data.report}
		<Loader />
	{:then value}
		<Report report={value} />
	{:catch error}
		<p>Error: {error.message}</p>
	{/await}
</section>

<style>
	.report {
		max-width: 64em;
		margin: 0 auto;
		padding: 0 1em;
	}
	.report-title {
		font-size: 2em;
		margin: 1em 0;
	}
</style>
