# Evening-hack alternative to `useActionState()` / `useFormState()`

## Summary

-   No notion of "default state" when calling the hook
-   No need of returning input values in order to re-render `<input>`s values in SSR

### API

```tsx
function useAction<State, Payload extends FormData>(
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
];
```

#### Setting it up

##### `/app/layout.tsx`

> Obviously, I don't think any of this should be needed if React/Next.js provided a more sound primitive

## How this hack works

-   `createAction()` wrapper hacks into Next.js' request storage and stores an `.actionPayload` with the submitted `FormData`
-   `<UseActionProvider>` is used to populate this to the `useAction()` handler
