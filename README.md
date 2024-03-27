## Issues with the `useFormState()` & `useActionState()` hooks

One of the key advantages, for me, of `useFormState()`/`useActionState()` and `<form action={action}>` is their ability to create isomorphic/universal forms that are progressively enhanced.

However, the current API lacks some nuance needed for isomorphic forms. This repository aim to showcase those issues.

-   **tl;dr:** Search the code for "😷" to see perceived issues.
-   **tl;dr2:** Most of my headaches would disappear if `useFormState()`/`useActionState()` returned `Payload` which would be the data that was last successfully sent to the server.

> Either I'm dumb or the API needs some refining. Maybe "current" values and errors should be stored in like a session variable? Maybe the server actions API isn't designed for returning anything at all?

## Clone it

```sh
git clone git@github.com:KATT/react-server-action-useActionState-useFormState-issues.git
cd react-server-action-useActionState-useFormState-issues
pnpm i
pnpm dev
```

## Prior art

-   https://allanlasser.com/posts/2024-01-26-avoid-using-reacts-useformstatus
-   https://github.com/facebook/react/pull/28491#issuecomment-2015032940
-   https://github.com/facebook/react/pull/28491#issuecomment-2015585371

## Proposed API

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

-   Make `<form>`s behave the same with JavaScript enabled as they do with JavaScript disabled (confirmed that it will changed by @acdlite [here](https://github.com/facebook/react/pull/28491#issuecomment-2015283772))
-   Add `payload` to the return of the hook
-   Get rid of `State` as a required argument
-   Get rid of the `State` argument on the server actions.
    -   I don't see why it's needed at all, the input payload should be enough
    -   It even requires a disclaimer [like this](https://react.dev/reference/react-dom/hooks/useFormState#my-action-can-no-longer-read-the-submitted-form-data)
    -   It changes the server-side depending on _how_ you call it, which is kinda odd
    -   It goes against React's fundamental idea that components are "Lego bricks" that can be added wherever and the functionality is baked in. Server Actions could be part of npm libraries, but it's frail with the current design.
    -   It gets rid of the State being serialized in the input - why is that even needed
-   Add `initialPayload` to `useActionState()`
