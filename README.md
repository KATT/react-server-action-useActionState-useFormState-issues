Search the code for 😷 to see issues.

## Proposition

Lengthier: https://github.com/facebook/react/pull/28491#issuecomment-2015032940

Maybe?:

```ts
function useActionState<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State,
  initialPayload?: Payload | null,
  permalink?: string,
): [
  dispatch: (payload: Payload) => Promise<State>,
  // "input"
  payload: null | Payload,
  // "output"
  state: State,
  pending: boolean;
];
```

-   Add `payload` to the return of the hook
-   Get rid of `State` as a required argument
-   Add `initialPayload` to `useActionState()`
-   Get rid of the `State` argument on the server actions.
    -   I don't see why it's needed at all, the input payload should be enough
    -   It even requires a disclaimer [like this](https://react.dev/reference/react-dom/hooks/useFormState#my-action-can-no-longer-read-the-submitted-form-data)
    -   It changes the server-side depending on _how_ you call it, which is kinda odd
    -   It gets rid of the State being serialized in the input - why is that even needed
