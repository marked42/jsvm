import { JSValue } from "@/LanguageType";

// TODO: not needed ?
export class List {
	public readonly value: Array<JSValue> = [];

	constructor(size: number) {
		this.value = new Array(size);
	}
}
