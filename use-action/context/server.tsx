"use client";
import { UseActionContext } from "./shared";
import { getRequestStorage } from "../lib/requestStorage";

console.log("hello i am server");
export function UseActionProvider(props: { children: React.ReactNode }) {
	const storage = getRequestStorage();
	return (
		<UseActionContext.Provider
			value={
				storage.actionPayload
					? [
							//
							storage.actionPayload,
						]
					: null
			}
		>
			{props.children}
		</UseActionContext.Provider>
	);
}
