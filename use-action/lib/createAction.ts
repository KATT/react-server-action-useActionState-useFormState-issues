import { storeActionPayload } from "./requestStorage";

/**
 * Wraps an action function to store its input as action payload in the request storage.
 */
export function createAction<TInput = FormData>() {
	return function action<TOutput>(fn: (input: TInput) => Promise<TOutput>) {
		return async function wrapper(...args: unknown[]) {
			/**
			 * When you wrap an action with useFormState, it gets an extra argument as its first argument.
			 * The submitted form data is therefore its second argument instead of its first as it would usually be.
			 * The new first argument that gets added is the current state of the form.
			 * @see https://react.dev/reference/react-dom/hooks/useFormState#my-action-can-no-longer-read-the-submitted-form-data
			 */
			let input = args.length === 1 ? args[0] : args[1];

			// store action payload so it can be used in server-side components
			storeActionPayload(input);

			return await fn(input as TInput);
		};
	};
}
