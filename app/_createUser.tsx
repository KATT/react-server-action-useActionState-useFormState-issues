"use server";

import { redirect } from "next/navigation";

export type CreateUserState = {
	errors?: {
		username?: string;
	};
	payload?: FormData;
};

export async function createUser(
	_: CreateUserState,
	payload: FormData,
): Promise<CreateUserState> {
	// wait 300ms
	await new Promise((resolve) => setTimeout(resolve, 300));
	const errors: CreateUserState["errors"] = {};
	if (!payload.get("username")) {
		errors.username = "Username is required";
	}
	if (payload.get("username") === "john") {
		errors.username = "Username is already taken";
	}
	if (Object.keys(errors).length > 0) {
		return { errors, payload };
	}

	redirect("/success");
}
