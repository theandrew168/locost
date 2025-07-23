<script lang="ts">
	import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

	type Props = {
		icon: IconDefinition;
		size?: number;
		color?: string;
		spin?: boolean;
	};

	let { icon, size = 24, color = "currentColor", spin = false }: Props = $props();

	const [width, height, _ligatures, _unicode, path] = icon.icon;
	if (Array.isArray(path)) {
		console.warn("duotone:", icon.iconName);
	}
</script>

<svg
	width={size}
	height={size}
	fill={color}
	role="img"
	viewBox="0 0 {width} {height}"
	xmlns="http://www.w3.org/2000/svg"
	class={spin ? "spin" : ""}
>
	<title>{icon.iconName}</title>
	<path d={typeof path === "string" ? path : path[1]} />
</svg>

<style>
	.spin {
		animation: spin 2s linear infinite;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
