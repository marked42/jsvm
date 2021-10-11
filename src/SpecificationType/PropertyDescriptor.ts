import {
	JSValue,
	JSValueUndefined,
	JSValueBoolean,
	JSValueObjectFunction,
	Undefined,
	JSValueObject,
} from "@/LanguageType";

export class PropertyDescriptor {
	public readonly Value: JSValue;
	public readonly Get: JSValueObjectFunction | JSValueUndefined;
	public readonly Set: JSValueObjectFunction | JSValueUndefined;
	public readonly Configurable: JSValueBoolean;
	public readonly Writable: JSValueBoolean;
	public readonly Enumerable: JSValueBoolean;

	constructor(options: {
		value: JSValue;
		Get: JSValueObjectFunction | JSValueUndefined;
		Set: JSValueObjectFunction | JSValueUndefined;
		configurable: JSValueBoolean;
		writable: JSValueBoolean;
		enumerable: JSValueBoolean;
	}) {
		const { value, Get, Set, configurable, writable, enumerable } = options;

		this.Value = value;
		this.Get = Get;
		this.Set = Set;
		this.Configurable = configurable;
		this.Enumerable = enumerable;
		this.Writable = writable;
	}
}

export function IsAccessorDescriptor(
	desc: PropertyDescriptor | JSValueUndefined
) {
	if (desc === Undefined) {
		return false;
	}

	if (desc instanceof PropertyDescriptor) {
		if (desc.Get === Undefined && desc.Set === Undefined) {
			return false;
		}
		return true;
	}

	throw new Error(
		"Unreachable Case, desc should be PropertyDescriptor or undefined"
	);
}

export function IsDataDescriptor(desc: PropertyDescriptor | JSValueUndefined) {
	if (desc === Undefined) {
		return false;
	}

	if (desc instanceof PropertyDescriptor) {
		if (desc.Value === Undefined && desc.Writable === Undefined) {
			return false;
		}
		return true;
	}

	throw new Error(
		"Unreachable Case, desc should be PropertyDescriptor or undefined"
	);
}

export function IsGenericDescriptor(
	desc: PropertyDescriptor | JSValueUndefined
) {
	if (desc === Undefined) {
		return false;
	}

	if (!IsAccessorDescriptor(desc) && !IsDataDescriptor(desc)) {
		return true;
	}
	return false;
}

export function FromPropertyDescriptor(
	desc: PropertyDescriptor | JSValueUndefined
) {}

export function ToPropertyDescriptor(obj: JSValueObject) {}

export function CompletePropertyDescriptor(desc: PropertyDescriptor) {}
