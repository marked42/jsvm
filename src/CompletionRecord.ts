import { JSValue } from "./JSValue";

export enum CompletionRecordType {
	Normal = "normal",
	Break = "break",
	Continue = "continue",
	Return = "return",
	Throw = "throw",
}

export type Label = string;

const LabelEmpty: Label = "";

export class CompletionRecord {
	constructor(
		public readonly type: CompletionRecordType,
		public readonly value: JSValue,
		public readonly target: Label
	) {}
}

export function NormalCompletion(value?: JSValue) {
	return new CompletionRecord(CompletionRecordType.Normal, value, LabelEmpty);
}
