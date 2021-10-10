export type JSValueType =
	| "number"
	| "string"
	| "boolean"
	| "undefined"
	| "symbol"
	| "object";

export class JSValue {
	constructor(public readonly type: JSValueType) {}
}
