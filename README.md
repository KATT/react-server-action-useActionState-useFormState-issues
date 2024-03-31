# Evening-hack alternative to `useActionState()` / `useFormState()`

## Summary

-   **Background:** see the [README of the `main`-branch](https://github.com/KATT/react-server-action-useActionState-useFormState-issues/tree/main)
-   No notion of "default state" when calling the hook
-   No need of returning input values in order to re-render `<input>`s values in SSR
-   No two argument on actions, there's only 1 - your input

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

#### Usage

-   https://github.com/KATT/react-server-action-useActionState-useFormState-issues/blob/bb5c53788973a954c5549c846f711bc0ba15611b/app/page.tsx#L27
-   https://github.com/KATT/react-server-action-useActionState-useFormState-issues/blob/bb5c53788973a954c5549c846f711bc0ba15611b/app/page.tsx#L54

#### Setting it up

> Obviously, I don't think any of this wiring should be needed and that `payload` should be omnipresent in `useFormState()`

-   https://github.com/KATT/react-server-action-useActionState-useFormState-issues/blob/55943159220c0d82b8653747971e4b8662d2cb6f/app/layout.tsx#L22
-   https://github.com/KATT/react-server-action-useActionState-useFormState-issues/blob/55943159220c0d82b8653747971e4b8662d2cb6f/app/page.tsx#L27
-   https://github.com/KATT/react-server-action-useActionState-useFormState-issues/blob/55943159220c0d82b8653747971e4b8662d2cb6f/app/_createUser.tsx#L11

Yay, now I can just use `input?.get("username")`:

https://github.com/KATT/react-server-action-useActionState-useFormState-issues/blob/bb5c53788973a954c5549c846f711bc0ba15611b/app/page.tsx#L54

## How this hack works

-   `createAction()` wrapper hacks into Next.js' request storage and stores an `.actionPayload` with the submitted `FormData`
-   `<UseActionProvider>` is used to populate this to the `useAction()` handler

## What we're missing here

This work is mainly focused on enhancing the "no-JS-experience":

-   `<form>`'s should clear after submission in JS
-   `payload` is always `null` in the client, will be more highlighted when form clears in JS as well
-   `payload` isn't tied to a specific action at the moment - `useAction(x)` shouldn't return payload of `useAction(y)`
-   this is a hack, there's probably more

### Play with it

```sh
git clone git@github.com:KATT/react-server-action-useActionState-useFormState-issues.git
cd react-server-action-useActionState-useFormState-issues
git checkout feat/hack
pnpm i
pnpm dev
```
