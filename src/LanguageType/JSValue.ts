export type JSValueType =
	| "number"
	| "string"
	| "boolean"
	| "undefined"
	| "symbol"
	| "object";

export class JSValue {
	constructor(public readonly type: JSValueType) {}

	IsPrimitiveType() {
		const primitiveTypes = ["number", "string", "boolean", "symbol"];
		return primitiveTypes.includes(this.Type());
	}

	Type() {
		return this.type;
	}
}
