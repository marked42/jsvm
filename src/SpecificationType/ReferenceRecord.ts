import {
	JSValue,
	JSValueBoolean,
	JSValueString,
	JSValueSymbol,
} from "@/LanguageType";
import { EmptyValueType } from "./Empty";
import { EnvironmentRecord } from "./EnvironmentRecord";

type BaseType = JSValue | EnvironmentRecord | "unresolvable";

type ReferencedNameType = JSValueString | JSValueSymbol;

export class ReferenceRecord {
	public readonly Base: BaseType;
	public readonly ReferencedName: ReferencedNameType;
	public readonly Strict: JSValueBoolean;
	public readonly ThisValue: EmptyValueType<JSValue>;

	constructor(
		base: BaseType,
		referencedName: ReferencedNameType,
		strict: JSValueBoolean,
		thisValue: EmptyValueType<JSValue>
	) {
		this.Base = base;
		this.ReferencedName = referencedName;
		this.Strict = strict;
		this.ThisValue = thisValue;
	}
}
