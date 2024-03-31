import { getRequestStorage } from "../lib/requestStorage";
import { UseActionProviderValue } from "./shared";

export function getUseActionProviderValue(): UseActionProviderValue | null {
	const storage = getRequestStorage();

	if (storage.actionPayload) {
		return null;
	}

	return [storage.actionPayload];
}
