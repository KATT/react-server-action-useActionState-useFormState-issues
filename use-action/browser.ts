import { UseActionProviderValue } from "./context/shared";

export const ENV = "browser" as string;

export { useAction, UseActionProvider } from "./context/shared";

export function getUseActionProviderValue(): UseActionProviderValue | null {
	return null;
}
