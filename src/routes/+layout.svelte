<script lang="ts">
	import "$lib/assets/css/reset.css";
	import "$lib/assets/css/font.css";
	import "$lib/assets/css/global.css";

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
			<li class="home-link"><a href="/">LoCost</a></li>
			<!-- TODO: Only show when not authenticated. -->
			<li><a href="/signin">Sign in with GitHub</a></li>
			<!-- TODO: Only show when authenticated. -->
			<li><a href="/signout">Sign out</a></li>
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
		border-bottom: 1px solid black;
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

	.page-content {
		flex-grow: 1;
		flex-basis: 0;
		background-color: var(--color-gray);
	}

	.page-footer {
		padding: 1.5em;
		border-top: 1px solid black;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
