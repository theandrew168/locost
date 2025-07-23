<script lang="ts">
	import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

	import Icon from "./Icon.svelte";
</script>

<section>
	<Icon icon={faCircleNotch} size={64} spin />
</section>

<style>
	section {
		margin-top: 8em;
		text-align: center;
		color: var(--color-primary);
	}
</style>
