import { JSValue } from "./JSValue";

export class JSValueBoolean extends JSValue {
	constructor(public readonly value: boolean) {
		super("boolean");
	}

	static True = new JSValueBoolean(true);
	static False = new JSValueBoolean(false);
}
