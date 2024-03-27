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

const usernames = ["john", "jane"];

export async function createUser(
	_: CreateUserState,
	payload: FormData,
): Promise<CreateUserState> {
	console.log("Creating user with payload", payload);
	// wait 300ms
	await new Promise((resolve) => setTimeout(resolve, 300));

	const errors: CreateUserState["errors"] = {};
	if (usernames.includes(payload.get("username") as string)) {
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
			// 😷 I have to **pick** values. I can't use `Object.fromEntries(formData)` either since that includes a bunch of junk of React-internals
			input: {
				username: payload.get("username") as string,
			},
		};
	}

	usernames.push(payload.get("username") as string);

	redirect("/success");
}
