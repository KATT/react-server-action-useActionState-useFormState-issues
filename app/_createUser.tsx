"use server";

import { redirect } from "next/navigation";

export type CreateUserState = {
	errors?: {
		username?: string;
	};
	input?: {
		username?: string;
	};
};

export async function createUser(
	_: CreateUserState,
	payload: FormData,
): Promise<CreateUserState> {
	console.log("Creating user with payload", payload);
	// wait 300ms
	await new Promise((resolve) => setTimeout(resolve, 300));
	const errors: CreateUserState["errors"] = {};
	if (payload.get("username") === "john") {
		errors.username = "Username is already taken";
	}
	if (Object.keys(errors).length > 0) {
		// 😷 Some issues:
		// What I want to do here is to return the errors and the payload so that the form can be re-rendered with the errors and inputs.
		// return { errors, payload };
		// 👆❌ This doesn't work because:
		//    - File is not serializable (makes sense? it should be automatically omitted?)
		//    - FormData is not serializable (Next.js issue?)

		return {
			errors,
			// 😷 Why do I even need to return this?
			input: {
				username: payload.get("username") as string,
			},
		};
	}

	redirect("/success");
}
