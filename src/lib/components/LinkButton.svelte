<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		href: string;
		children: Snippet;
	};

	let { href, children }: Props = $props();
</script>

<a {href}>
	{@render children()}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;

		padding: 0.5em 1em;
		border-radius: 0.5em;
		background-color: var(--color-primary);
		color: var(--color-white);
		border: none;
		text-decoration: none;
	}

	a:hover {
		opacity: 0.9;
		transition: opacity 0.2s;
	}
</style>
