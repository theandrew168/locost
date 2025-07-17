import type { Handle } from "@sveltejs/kit";
import { Octokit } from "octokit";

export const handle: Handle = async ({ event, resolve }) => {
	const octokit = new Octokit();
	event.locals.octokit = octokit;
	return resolve(event);
};
