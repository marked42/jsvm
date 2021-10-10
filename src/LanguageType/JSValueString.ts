import { JSValue } from "./JSValue";

/**
 * TODO: change representation to 16-bit integer sequence
 */
export class JSValueString extends JSValue {
	constructor(public readonly value: string) {
		super("string");
	}
}
