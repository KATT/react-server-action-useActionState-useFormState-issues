"use client";
import { createContext, use } from "react";
import { useFormState } from "react-dom";

export type UseActionProviderValue = [
	payload: unknown,
	// TODO add info about the action
];
export const UseActionContext = createContext<null | UseActionProviderValue>(
	null,
);

export function useAction<State, Payload extends FormData>(
	action: (state: Awaited<State>, payload: Payload) => State,
	permalink?: string,
): [
	/**
	 * The action to use in a `<form>` element.
	 */
	dispatch: (payload: Payload) => State,
	/**
	 * Will be `null` if no payload is available.
	 */
	payload: null | Payload,
	/**
	 * Will be `null` if no state is available.
	 */
	state: Awaited<State> | null,
] {
	const ctx = use(UseActionContext);
	const [state, dispatch] = useFormState<State>(
		action as any,
		null as any,
		permalink,
	);

	let payload = (ctx?.[0] ?? null) as Payload | null;
	if (payload && !(payload instanceof FormData)) {
		const fd = new FormData();

		for (const [key, value] of payload as any[]) {
			(fd as FormData).append(key, value);
		}
		payload = fd as any;
	}

	return [dispatch as any, payload, state];
}

export function UseActionProvider(props: {
	children: React.ReactNode;
	value: UseActionProviderValue | null;
}) {
	return (
		<UseActionContext.Provider value={props.value}>
			{props.children}
		</UseActionContext.Provider>
	);
}
