import { JSValue } from "./JSValue";

export class JSValueNull extends JSValue {
	// singleton
	private constructor() {
		super("null");
	}

	static Null = new JSValueNull();
}

export const Null = JSValueNull.Null;
