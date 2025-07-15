<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<h1>Welcome to LoCost</h1>

<p>
	Estimated Cost to Develop (organic): {data.report.estimatedCost.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	})}
</p>
<p>
	Estimated Schedule Effort (paid): {data.report.estimatedScheduleMonths.toLocaleString("en-US", {
		maximumFractionDigits: 2,
	})} months
</p>
<p>
	Estimated People Required (organic): {data.report.estimatedPeople.toLocaleString("en-US", {
		maximumFractionDigits: 2,
	})}
</p>

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
		{#each data.report.languageSummary as languageSummary}
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
		border: 1px solid black;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid black;
		padding: 4px 8px;
	}
</style>
