<script lang="ts">
	import type { SCCReport } from "$lib/server/scc";

	type Props = {
		report: SCCReport;
	};

	let { report }: Props = $props();
</script>

<h2>COCOMO Metrics</h2>
<p>
	Estimated Cost to Develop (organic): {report.estimatedCost.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	})}
</p>
<p>
	Estimated Schedule Effort (organic): {report.estimatedScheduleMonths.toLocaleString("en-US", {
		maximumFractionDigits: 2,
	})} months
</p>
<p>
	Estimated People Required (organic): {report.estimatedPeople.toLocaleString("en-US", {
		maximumFractionDigits: 2,
	})}
</p>

<h2>Language Summary</h2>

<table>
	<thead>
		<tr>
			<th>Language</th>
			<th>Files</th>
			<th>Lines</th>
			<th>Blanks</th>
			<th>Comments</th>
			<th>Code</th>
			<th>Complexity</th>
		</tr>
	</thead>
	<tbody>
		{#each report.languageSummary as languageSummary}
			<tr>
				<td>{languageSummary.name}</td>
				<td>{languageSummary.count}</td>
				<td>{languageSummary.lines}</td>
				<td>{languageSummary.blank}</td>
				<td>{languageSummary.comment}</td>
				<td>{languageSummary.code}</td>
				<td>{languageSummary.complexity}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border: 1px solid var(--color-black);
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid var(--color-black);
		padding: 4px 8px;
	}
</style>
