import {
	JSValue,
	JSValueUndefined,
	JSValueBoolean,
	JSValueObjectFunction,
} from "../LanguageType";

export type PropertyDescriptorType = "data" | "accessor";

export abstract class PropertyDescriptor {
	public readonly type: PropertyDescriptorType;
	public readonly "[[Configurable]]": JSValueBoolean;
	public readonly "[[Writable]]": JSValueBoolean;
	public readonly "[[Enumerable]]": JSValueBoolean;

	constructor(
		type: PropertyDescriptorType,
		configurable: JSValueBoolean,
		writable: JSValueBoolean,
		enumerable: JSValueBoolean
	) {
		this.type = type;
		this["[[Configurable]]"] = configurable;
		this["[[Writable]]"] = writable;
		this["[[Enumerable]]"] = enumerable;
	}
}

export class DataPropertyDescriptor extends PropertyDescriptor {
	public readonly "[[Value]]": JSValue;

	constructor(
		value: JSValue,
		configurable: JSValueBoolean = JSValueBoolean.False,
		writable: JSValueBoolean = JSValueBoolean.False,
		enumerable: JSValueBoolean = JSValueBoolean.False
	) {
		super("data", configurable, writable, enumerable);

		this["[[Value]]"] = value;
	}
}

export class AccessorPropertyDescriptor extends PropertyDescriptor {
	public readonly "[[Getter]]": JSValueObjectFunction | JSValueUndefined;
	public readonly "[[Setter]]": JSValueObjectFunction | JSValueUndefined;

	constructor(
		getter: JSValueObjectFunction | JSValueUndefined,
		setter: JSValueObjectFunction | JSValueUndefined,
		public configurable: JSValueBoolean = JSValueBoolean.False,
		public writable: JSValueBoolean = JSValueBoolean.False,
		public enumerable: JSValueBoolean = JSValueBoolean.False
	) {
		super("accessor", configurable, writable, enumerable);
		this["[[Getter]]"] = getter;
		this["[[Setter]]"] = setter;
	}
}
