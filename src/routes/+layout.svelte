<script lang="ts">
	import { faChartColumn } from "@fortawesome/free-solid-svg-icons";

	import "$lib/assets/css/reset.css";
	import "$lib/assets/css/font.css";
	import "$lib/assets/css/global.css";

	import Icon from "$lib/components/Icon.svelte";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>LoCost - Web App for Analyzing Lines of Code + Cost</title>
	<meta name="description" content="LoCost - Web App for Analyzing Lines of Code + Cost" />
</svelte:head>

<header class="page-header">
	<nav>
		<ul class="nav-links">
			<li class="home-link">
				<a href="/">
					<Icon icon={faChartColumn} size={32} />
					<span class="home-link-text">LoCost</span>
				</a>
			</li>
			<li>
				<a
					href="https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories"
					target="_blank"
				>
					How to Search
				</a>
			</li>
		</ul>
	</nav>
</header>

<main class="page-content">
	{@render children()}
</main>

<footer class="page-footer">
	<p>LoCost - Code Analysis Tool</p>
</footer>

<style>
	.page-header {
		padding: 1.5em;
		border-bottom: 1px solid var(--color-medium-gray);
	}

	.nav-links {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	.home-link {
		margin-right: auto;
	}

	.home-link a {
		color: var(--color-primary);
		font-size: 1.5rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.home-link-text {
		color: var(--color-black);
	}

	.page-content {
		flex-grow: 1;
		flex-basis: 0;
		color: var(--color-black);
		background-color: var(--color-light-gray);
	}

	.page-footer {
		padding: 1.5em;
		border-top: 1px solid var(--color-medium-gray);

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
