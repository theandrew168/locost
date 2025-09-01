<script>
	import { faChartColumn } from "@fortawesome/free-solid-svg-icons";

	import Icon from "$lib/components/Icon.svelte";
</script>

<section class="page">
	<div class="content">
		<span class="icon">
			<Icon icon={faChartColumn} size={48} />
		</span>
		<h1 class="title">LoCost</h1>
		<p class="description">Analyze your GitHub repositories for lines of code and estimated cost</p>
		<form method="GET" action="/search">
			<input class="search" name="q" placeholder="Search for a repository..." />
		</form>
	</div>
</section>

<style>
	.page {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.content {
		text-align: center;
	}
	.icon {
		display: inline-flex;
		color: var(--color-primary);
	}
	.title {
		font-size: 2.5rem;
		font-weight: 600;
		margin: 0.5em 0;
	}
	.description {
		margin: 1em 0;
	}
	.search {
		padding: 1em;
		border-radius: 4em;
		border: 1px solid gray;
		min-width: 32em;
	}
</style>
