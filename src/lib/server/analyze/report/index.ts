import { exec } from "node:child_process";

import type { SCCReport } from "$lib/types";

type LanguageSummaryJSON = {
	Name: string;
	Bytes: number;
	CodeBytes: number;
	Lines: number;
	Code: number;
	Comment: number;
	Blank: number;
	Complexity: number;
	Count: number;
	WeightedComplexity: number;
	Files: string[];
	LineLength: number | null;
	ULOC: number;
};

type SCCReportJSON = {
	languageSummary: LanguageSummaryJSON[];
	estimatedCost: number;
	estimatedScheduleMonths: number;
	estimatedPeople: number;
};

// Promise-ify child_process.exec
function run(cmd: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				return reject(error);
			}
			if (stderr) {
				return reject(stderr);
			}
			resolve(stdout);
		});
	});
}

/**
 * Analyzes the source code in the given directory and generates a report.
 * @param path The path to the directory to analyze.
 * @returns A promise that resolves to the generated report.
 */
export async function analyze(path: string): Promise<SCCReport> {
	const cmd = `scc --format json2 ${path}`;
	const output = await run(cmd);

	const reportJSON: SCCReportJSON = JSON.parse(output);
	const result: SCCReport = {
		languageSummary: reportJSON.languageSummary.map((lang) => ({
			name: lang.Name,
			bytes: lang.Bytes,
			codeBytes: lang.CodeBytes,
			lines: lang.Lines,
			code: lang.Code,
			comment: lang.Comment,
			blank: lang.Blank,
			complexity: lang.Complexity,
			count: lang.Count,
			weightedComplexity: lang.WeightedComplexity,
			files: lang.Files,
			lineLength: lang.LineLength,
			uloc: lang.ULOC,
		})),
		estimatedCost: reportJSON.estimatedCost,
		estimatedScheduleMonths: reportJSON.estimatedScheduleMonths,
		estimatedPeople: reportJSON.estimatedPeople,
	};
	return result;
}
