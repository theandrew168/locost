<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<h1>Welcome to LoCost</h1>

{#each data.repos as repo}
	<h2>{repo.name}</h2>
	<p>
		<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
			{repo.html_url}
		</a>
	</p>
	<p>
		<a href={`/analyze/${repo.full_name}`}> Analyze this repository </a>
	</p>
	<p>Stars: {repo.stargazers_count}</p>
{/each}
