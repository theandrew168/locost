import { SCCAnalyzer } from "$lib/server/scc";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const path = ".";
	const analyzer = new SCCAnalyzer();
	const report = await analyzer.analyze(path);

	return {
		report,
	};
};
