<script lang="ts">
	import Report from "$lib/components/Report.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

{#await data.report}
	<p>Cloning and analyzing repo...</p>
{:then value}
	<Report report={value} />
{:catch error}
	<p>Error: {error}</p>
{/await}
