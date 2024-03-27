"use client";

import { useFormState } from "react-dom";
import { createUser } from "./_createUser";
import { useEffect } from "react";
import toast from "react-hot-toast";

/**
 * When JavaScript is available, this component will render a toast.
 * When JavaScript is not available, this component will render a box.
 */
function ErrorToastOrBox(props: { children: JSX.Element }) {
	useEffect(() => {
		const timeout = setTimeout(() => {
			toast.error(props.children);
		});
		return () => clearTimeout(timeout);
	}, [props.children]);

	return (
		<noscript className="text-red p-4 bg-red-200">
			{props.children}
		</noscript>
	);
}
function CreateUserForm() {
	const [state, action] = useFormState(
		createUser,
		// 😷 How come I have to define a default state? Default input/payload would make sense for setting default values
		{},
	);

	return (
		// 😷 `<form action={action}>` makes the form work differently with or without JS enabled (inputs should clear)
		<form action={action} className="space-y-4 shadow p-4">
			{/* 😷 State is serialized as a hidden input here -- unnecessary payload, `<input type="hidden" name="$ACTION_1:0" value="{&quot;id&quot;:&quot;4a156bb69b4bf838c9c71c23a01294921f53ff23&quot;,&quot;bound&quot;:&quot;$@1&quot;}">`  */}
			{state.errors && (
				<ErrorToastOrBox>
					<>Errors: {JSON.stringify(state.errors, null, 2)}</>
				</ErrorToastOrBox>
			)}
			<div className="flex flex-col space-y-1">
				<label
					htmlFor="username"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					username
				</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="john"
					// 😷 why do I have to return this from the
					defaultValue={state.input?.username}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required
				/>
			</div>
			<div className="flex flex-col space-y-1">
				<label
					htmlFor="avatar"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					avatar
				</label>
				<input type="file" id="avatar" name="avatar" accept="image/*" />
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				Submit
			</button>
		</form>
	);
}

export default function Home() {
	return (
		<div className="space-y-8 p-4">
			<h1 className="font-extrabold leading-none tracking-tight text-gray-900 text-2xl">
				Home
			</h1>
			<CreateUserForm />
			<ul className="space-y-2 list-disc list-inside">
				<li>
					Adding a user with the username <code>john</code> will
					result in an error.
				</li>
				<li>Try disabling JavaScript to see that the page works</li>
				<li>
					See the{" "}
					<a
						className="underline"
						href="https://github.com/KATT/react-server-action-useformstate-issues"
					>
						README on GitHub
					</a>
				</li>
			</ul>
		</div>
	);
}
