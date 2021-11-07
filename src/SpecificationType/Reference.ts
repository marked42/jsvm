import {
	JSValueBoolean,
	JSValueNumber,
	JSValueObject,
	JSValueString,
	JSValueSymbol,
	JSValueUndefined,
} from "@/LanguageType";
import { EnvironmentRecord } from "./EnvironmentRecord";

type BaseType =
	| JSValueUndefined
	| JSValueObject
	| JSValueBoolean
	| JSValueString
	| JSValueSymbol
	| JSValueNumber
	| EnvironmentRecord;

export class Reference {
	public base!: BaseType;
	public referencedName!: JSValueString | JSValueSymbol;
	public strict = false;

	constructor() {}
}

export function GetBase(ref: Reference) {
	return ref.base;
}

export function GetReferencedName(ref: Reference) {
	return ref.referencedName;
}

export function IsStrictReference(ref: Reference) {
	return ref.strict;
}

export function HasPrimitiveBase(ref: Reference) {
	if (ref.base instanceof EnvironmentRecord) {
		return false;
	}

	return ref.base.IsPrimitiveType();
}

export function IsPropertyReference(ref: Reference) {
	if (ref.base instanceof EnvironmentRecord) {
		return false;
	}

	return ref.base.IsPrimitiveType();
}
