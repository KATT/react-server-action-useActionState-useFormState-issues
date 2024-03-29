"use client";

import { createContext, use } from "react";
import { useFormState } from "react-dom";

type Value = null | {
	formData: FormData;
};
const UseActionContext = createContext<Value>(null);

export function UseActionProvider(props: {
	children: React.ReactNode;
	value: Value;
}) {
	console.log(
		"Provider",
		props.value,
		"FormData?",
		props.value?.formData instanceof FormData,
	);
	return (
		<UseActionContext.Provider value={props.value}>
			{props.children}
		</UseActionContext.Provider>
	);
}

export function useAction<State, Payload extends FormData>(
	action: (state: Awaited<State>, payload: Payload) => State,
	permalink?: string,
): [
	dispatch: (payload: Payload) => State,
	// "input"
	payload: null | Payload,
	// "output"
	state: Awaited<State> | null,
	// pending: boolean;
] {
	const ctx = use(UseActionContext);
	const [state, dispatch] = useFormState<State>(
		action as any,
		null as any,
		permalink,
	);

	let payload = (ctx?.formData ?? null) as Payload | null;
	if (payload && !(payload instanceof FormData)) {
		const fd = new FormData();

		for (const [key, value] of payload as any[]) {
			(fd as FormData).append(key, value);
		}
		payload = fd as any;
	}

	return [dispatch as any, payload, state];
}
