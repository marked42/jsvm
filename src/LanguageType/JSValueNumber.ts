import { JSValue } from "./JSValue";

export class JSValueNumber extends JSValue {
	constructor(public readonly value: number) {
		super("number");
	}
}
