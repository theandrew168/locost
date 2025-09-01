<script lang="ts">
	import { faCalendar } from "@fortawesome/free-regular-svg-icons";
	import { faCode, faDollarSign, faUsers } from "@fortawesome/free-solid-svg-icons";

	import type { SCCReport } from "$lib/server/report";

	import SummaryCard from "./SummaryCard.svelte";

	type Props = {
		report: SCCReport;
	};

	let { report }: Props = $props();
	const totalLines = report.languageSummary.reduce((sum, lang) => sum + lang.lines, 0);
</script>

<section class="summary-cards">
	<SummaryCard
		icon={faCode}
		iconBackgroundColor="#3b82f6"
		title="Total Lines of Code"
		value={totalLines.toLocaleString("en-US")}
	/>
	<SummaryCard
		icon={faDollarSign}
		iconBackgroundColor="#22c55e"
		title="Estimated Cost"
		value={report.estimatedCost.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		})}
	/>
	<SummaryCard
		icon={faCalendar}
		iconBackgroundColor="#eab308"
		title="Estimated Schedule"
		value={report.estimatedScheduleMonths.toLocaleString("en-US", {
			maximumFractionDigits: 2,
		}) + " months"}
	/>
	<SummaryCard
		icon={faUsers}
		iconBackgroundColor="#a855f7"
		title="Team Size"
		value={report.estimatedPeople.toLocaleString("en-US", {
			maximumFractionDigits: 2,
		}) + ` ${report.estimatedPeople <= 1 ? "person" : "people"}`}
	/>
</section>

<section class="language-summary">
	<header>
		<h2 class="language-summary-header">Language Summary</h2>
		<ul class="language-summary-header-row">
			<li>Language</li>
			<li>Files</li>
			<li>Lines</li>
			<li>Blanks</li>
			<li>Comments</li>
			<li>Code</li>
			<li>Complexity</li>
		</ul>
	</header>
	<ul>
		{#each report.languageSummary as languageSummary}
			<li class="language-summary-row">
				<span>{languageSummary.name}</span>
				<span>{languageSummary.count}</span>
				<span>{languageSummary.lines}</span>
				<span>{languageSummary.blank}</span>
				<span>{languageSummary.comment}</span>
				<span>{languageSummary.code}</span>
				<span>{languageSummary.complexity}</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.summary-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;

		margin-bottom: 1em;
	}
	.language-summary {
		background-color: var(--color-white);
		margin-bottom: 1em;
		border-radius: 1em;
		box-shadow: var(--shadow);
	}
	.language-summary-header {
		font-size: 1.2em;
		font-weight: bold;
		padding: 2em 1em;
	}
	.language-summary-header-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
		border-bottom: 1px solid var(--color-medium-gray);
		padding: 1em;
		background-color: var(--color-light-gray);

		font-weight: bold;
		text-transform: uppercase;
	}
	.language-summary-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
		gap: 0.5em;
		padding: 1em;
	}
	.language-summary-row:nth-child(even) {
		background-color: var(--color-light-gray);
	}
	.language-summary-row:not(:last-child) {
		border-bottom: 1px solid var(--color-medium-gray);
	}
</style>
