import { getRequestStorage } from "../lib/requestStorage";
import { UseActionProviderValue } from "./shared";

export function getUseActionProviderValue(): UseActionProviderValue | null {
	const storage = getRequestStorage();
	console.log("FROM SERVER", storage.actionPayload);

	if (!("actionPayload" in storage)) {
		return null;
	}

	return [storage.actionPayload];
}
