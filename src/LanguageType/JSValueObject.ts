import { JSValue } from "./JSValue";
import { JSValueString } from "./JSValueString";
import { JSValueSymbol } from "./JSValueSymbol";

export type ObjectPropKey = JSValueString | JSValueSymbol;

export type ObjectPropertyMap = Map<ObjectPropKey, PropertyDescriptor>;

export class JSValueObject extends JSValue {
	// TODO: internal methods and slots
	// public readonly GetPrototypeOf: any;

	constructor(public readonly properties: ObjectPropertyMap = new Map()) {
		super("object");
	}
}
