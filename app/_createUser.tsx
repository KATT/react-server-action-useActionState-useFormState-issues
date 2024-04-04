"use server";

import { betterRedirect, createAction } from "use-action";

export type ValidationErrors = {
	username?: string;
};

const usernames = ["john", "jane"];

export const createUser = createAction<FormData>()(async (payload) => {
	console.log("Creating user with payload", payload);
	// wait 300ms
	await new Promise((resolve) => setTimeout(resolve, 300));

	const values = Object.fromEntries(payload);

	const errors: ValidationErrors = {};
	if (usernames.includes((values.username as string).trim().toLowerCase())) {
		errors.username = `Username '${values.username}' is already taken`;
	}

	if (Object.keys(errors).length > 0) {
		// ✅ I don't need to return anything about the payload here
		return {
			errors,
		};
	}

	usernames.push(payload.get("username") as string);

	betterRedirect("/success");
});
