<script lang="ts">
	import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

	import Icon from "./Icon.svelte";

	type Props = {
		icon: IconDefinition;
		iconBackgroundColor: string;
		title: string;
		value: string;
	};

	let { icon, iconBackgroundColor, title, value }: Props = $props();
</script>

<article class="summary-card">
	<span class="icon-badge" style="background-color: {iconBackgroundColor}">
		<Icon {icon} />
	</span>
	<div class="summary-content">
		<header class="summary-title">{title}</header>
		<p class="summary-value">{value}</p>
	</div>
</article>

<style>
	.summary-card {
		background-color: var(--color-white);
		padding: 1em;
		box-shadow: var(--shadow);
		border-radius: 0.5em;

		display: flex;
		gap: 1em;
	}
	.icon-badge {
		color: var(--color-white);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1em;
		border-radius: 0.5em;
	}
	.summary-title {
		font-size: 0.9em;
		margin-bottom: 0.5em;
	}
	.summary-value {
		font-size: 1.5em;
		font-weight: bold;
	}
</style>
