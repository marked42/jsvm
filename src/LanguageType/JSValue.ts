export type JSValueType =
	| "number"
	| "string"
	| "boolean"
	| "undefined"
	| "symbol"
	| "null"
	| "object";

export class JSValue {
	constructor(protected readonly type: JSValueType) {}

	IsPrimitiveType() {
		const primitiveTypes = ["number", "string", "boolean", "symbol"];
		return primitiveTypes.includes(this.Type());
	}

	IsUndefined() {
		return this.Type() === "undefined";
	}

	IsNull() {
		return this.Type() === "null";
	}

	IsObject() {
		return this.Type() === "object";
	}

	Type() {
		return this.type;
	}
}
