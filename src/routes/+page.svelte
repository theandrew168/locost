<script>
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import { faChartColumn, faCode, faDollarSign } from "@fortawesome/free-solid-svg-icons";

	import Icon from "$lib/components/Icon.svelte";
	import LinkButton from "$lib/components/LinkButton.svelte";
</script>

<section class="page-content">
	<header class="features-header">
		<span class="features-header-icon">
			<Icon icon={faChartColumn} size={48} />
		</span>
		<h1 class="features-header-title">LoCost</h1>
		<p>Analyze your GitHub repositories for lines of code and estimated cost</p>
	</header>

	<article class="features-card">
		<h2 class="features-list-header">How it works</h2>
		<ul>
			<li class="features-list-item">
				<span class="features-list-item-icon">
					<Icon icon={faGithub} />
				</span>
				Sign in with GitHub to access your repositories
			</li>
			<li class="features-list-item">
				<span class="features-list-item-icon">
					<Icon icon={faCode} />
				</span>
				Select a repository to analyze
			</li>
			<li class="features-list-item">
				<span class="features-list-item-icon">
					<Icon icon={faDollarSign} />
				</span>
				View detailed code metrics and estimated development costs
			</li>
		</ul>
		<LinkButton href="/browse">
			<Icon icon={faGithub} />
			Sign in with GitHub
		</LinkButton>
	</article>
</section>

<style>
	.page-content {
		max-width: 32em;
		margin: 0 auto;
	}
	.features-header {
		margin: 4em 0;
		text-align: center;
	}
	.features-header-icon {
		display: inline-flex;
		color: var(--color-primary);
	}
	.features-header-title {
		font-size: 2.5rem;
		font-weight: 600;
		margin: 0.5em 0;
	}
	.features-card {
		background-color: var(--color-white);
		box-shadow: var(--shadow);
		border-radius: 1em;
		padding: 3em;
	}
	.features-list-header {
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}
	.features-list-item {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 1rem;
	}
	.features-list-item-icon {
		display: inline-flex;
		color: var(--color-primary);
	}
</style>
