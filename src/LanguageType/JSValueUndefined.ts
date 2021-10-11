import { JSValue } from "./JSValue";

export class JSValueUndefined extends JSValue {
	// singleton
	private constructor() {
		super("undefined");
	}

	static Undefined = new JSValueUndefined();
}

export const Undefined = JSValueUndefined.Undefined;
