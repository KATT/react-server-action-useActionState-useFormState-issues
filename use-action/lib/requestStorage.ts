import {
	getExpectedRequestStore,
	RequestStore,
} from "next/dist/client/components/request-async-storage.external";

interface RequestStoreWithActionPayload extends RequestStore {
	actionPayload?: unknown;
}
export function getRequestStorage() {
	console.log("hello--------------");
	const storage = getExpectedRequestStore("getRequestStorage");

	return storage as RequestStoreWithActionPayload;
}

export function storeActionPayload(payload: unknown) {
	const storage = getRequestStorage();
	let store = payload;
	if (payload instanceof FormData) {
		// create copy without File
		store = new FormData();
		for (const [key, value] of payload as any) {
			if (typeof value === "string") {
				// omit e.g. File from new FormData
				(store as FormData).append(key, value);
			}
		}
	}
	storage.actionPayload = store;
}
