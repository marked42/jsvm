import { JSValue, JSValueString } from "../LanguageType";
import { EmptyValueType } from "./Empty";

export type CompletionRecordType =
	| "normal"
	| "break"
	| "continue"
	| "return"
	| "throw";

export class CompletionRecord {
	public readonly "[[Type]]": CompletionRecordType;
	public readonly "[[Value]]": EmptyValueType<JSValue>;
	public readonly "[[Target]]": EmptyValueType<JSValueString>;

	constructor(
		type: CompletionRecordType,
		value: EmptyValueType<JSValue>,
		target: EmptyValueType<JSValueString>
	) {
		this["[[Type]]"] = type;
		this["[[Value]]"] = value;
		this["[[Target]]"] = target;
	}
}
