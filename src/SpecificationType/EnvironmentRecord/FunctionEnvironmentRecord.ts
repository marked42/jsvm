import {
	JSValue,
	JSValueObject,
	JSValueObjectFunction,
	JSValueUndefined,
} from "@/LanguageType";
import { assert } from "@/Utils";
import { DeclarativeEnvironmentRecord } from "./DeclarativeEnvironmentRecord";

export type ThisBindingStatusType = "initialized" | "uninitialized" | "lexical";

export class FunctionEnvironmentRecord extends DeclarativeEnvironmentRecord {
	private "[[ThisValue]]": JSValue;
	private "[[ThisBindingStatus]]": ThisBindingStatusType;
	private "[[FunctionObject]]": JSValueObjectFunction;
	private "[[NewTarget]]": JSValueObject | JSValueUndefined;

	BindThisValue(value: JSValue) {
		assert(
			this["[[ThisBindingStatus]]"] !== "lexical",
			"Cannot bind this value for lexical type"
		);

		if (this["[[ThisBindingStatus]]"] === "initialized") {
			// TODO: should return error JSValueObjectReferenceError ?
			throw new ReferenceError(
				"Cannot bind this value, this value already initialized"
			);
		}

		this["[[ThisValue]]"] = value;
		this["[[ThisBindingStatus]]"] = "initialized";

		return value;
	}

	HasThisBinding() {
		return this["[[ThisBindingStatus]]"] !== "lexical";
	}

	GetThisBinding() {
		assert(this["[[ThisBindingStatus]]"] !== "lexical", "");

		if (this["[[ThisBindingStatus]]"] === "uninitialized") {
			// TODO: same
			throw new ReferenceError(
				"Cannot bind this value, this value already initialized"
			);
		}

		return this["[[ThisValue]]"];
	}
}
