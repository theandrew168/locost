export type GitHubAPIRepo = {
	name: string;
	full_name: string;
	description?: string;
	language?: string;
	stargazers_count: number;
};

export type LanguageSummary = {
	name: string;
	bytes: number;
	codeBytes: number;
	lines: number;
	code: number;
	comment: number;
	blank: number;
	complexity: number;
	count: number;
	weightedComplexity: number;
	files: string[];
	lineLength: number | null;
	uloc: number;
};

export type SCCReport = {
	languageSummary: LanguageSummary[];
	estimatedCost: number;
	estimatedScheduleMonths: number;
	estimatedPeople: number;
};
