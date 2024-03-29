import {
	getExpectedRequestStore,
	RequestStore,
} from "next/dist/client/components/request-async-storage.external";

interface RequestStoreWithFormData extends RequestStore {
	formData?: FormData;
}
export function getRequestStorage() {
	const storage = getExpectedRequestStore("getRequestStorage");

	return storage as RequestStoreWithFormData;
}

export function storeFormData(formData: FormData) {
	// create copy
	const copy = new FormData();
	for (const [key, value] of formData as any) {
		if (typeof value === "string") {
			// omit e.g. File from new FormData
			copy.append(key, value);
		}
	}
	const storage = getRequestStorage();
	storage.formData = copy;
}
