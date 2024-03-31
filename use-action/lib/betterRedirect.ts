import { redirect } from "next/navigation";

/**
 * Like Next.js' redirect but better represents what actually happens
 * When a call to a server action redirects, it will actually `return` `undefined`
 * @see https://github.com/vercel/next.js/issues/63771
 */
export function betterRedirect(...args: Parameters<typeof redirect>) {
	return redirect(...args) as unknown as undefined;
}
