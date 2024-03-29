# Challenges with the `useFormState()` & `useActionState()` hooks

One of the key advantages, for me, of `useFormState()`/`useActionState()` and `<form action={action}>` is their ability to create isomorphic/universal forms that are progressively enhanced (fancy words for saying that forms work well with and without JS).

However, the current API lacks some nuance needed for isomorphic forms. This repository aims to showcase those issues.

-   **tl;dr:** Search the code for "😷" to see my perceived issues.
-   **tl;dr2:** Most of my headaches would disappear if `useFormState()`/`useActionState()` returned `Payload` which would be the data that was last successfully sent to the server.

> Either I'm dumb or the API needs some refining. Maybe "current" values and errors should be stored in like a session variable? Maybe the server actions API isn't designed for returning anything at all? Should it be a Redirect ([Post/Get/Redirect](https://en.wikipedia.org/wiki/Post/Redirect/Get)) on every response? But then it will be weird when JS is enabled.

## Clone it the example

```sh
git clone git@github.com:KATT/react-server-action-useActionState-useFormState-issues.git
cd react-server-action-useActionState-useFormState-issues
pnpm i
pnpm dev
```

## Prior art on discussion

-   https://allanlasser.com/posts/2024-01-26-avoid-using-reacts-useformstatus
-   https://github.com/facebook/react/pull/28491#issuecomment-2015032940
-   https://github.com/facebook/react/pull/28491#issuecomment-2015585371
-   _[... something I'm missing?]_

## Proposed API

```ts
function useActionState<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State,
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
    -   it's good to use to set `defaultValue={}`
    -   serializing the payload from the action is gnarly as shown in this example
    -   returning payload for setting `defaultValue` is unnecessary
    -   (payload can be stripped from e.g. `File` etc which can't really be hydrated)
-   Get rid of `State` as a required argument
-   Get rid of the `State` argument on the server actions.
    -   It gets rid of the `State` being serialized in the input that is passed back-and-forth (that to me isn't even needed?)
    -   It even requires a disclaimer [like this](https://react.dev/reference/react-dom/hooks/useFormState#my-action-can-no-longer-read-the-submitted-form-data)
    -   It changes the server-side depending on _how_ you call it, which is kinda odd
    -   It goes against React's fundamental idea that components are "Lego bricks" that can be added wherever and the functionality is baked in. Server Actions could be part of npm libraries, but it's frail with the current design.

Additional:

-   Make `<form>`s with JavaScript mimic the behavior they have with JavaScript disabled (confirmed that it will changed by [@acdlite here](https://github.com/facebook/react/pull/28491#issuecomment-2015283772))
-   Maybe make `useActionState()` return an options object instead? 4 tuple values is a lot to keep track of (but that's easy to build abstractions that does)

> With the above API, it will be possible to make great forms in React without using any form libraries
