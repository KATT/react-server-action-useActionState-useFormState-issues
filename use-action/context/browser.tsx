"use client";

import { UseActionContext } from "./shared";

export function UseActionProvider(props: { children: React.ReactNode }) {
	console.log("i am browser an happy");
	return (
		<UseActionContext.Provider
			value={
				// TODO(?): hydrate this somehow?
				null
			}
		>
			{props.children}
		</UseActionContext.Provider>
	);
}
