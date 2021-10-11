import { JSValue, JSValueObject, JSValueUndefined } from "@/LanguageType";
import { DeclarativeEnvironmentRecord, ObjectEnvironmentRecord } from ".";
import { EnvironmentRecord } from "./EnvironmentRecord";

export class GlobalEnvironmentRecord extends EnvironmentRecord {
	public readonly "[[ObjectRecord]]": ObjectEnvironmentRecord;
	public readonly "[[GlobalThisValue]]": JSValueObject;
	public readonly "[[DeclarativeRecord]]": DeclarativeEnvironmentRecord;
	public readonly "[[VarNames]]": string[];

	constructor() {
		super();
	}

	HasBinding(name: string): boolean {
		throw new Error("Method not implemented.");
	}
	CreateMutableBinding(name: string, deletable: boolean): void {
		throw new Error("Method not implemented.");
	}
	CreateImmutableBinding(name: string, strict?: boolean): void {
		throw new Error("Method not implemented.");
	}
	InitializeBinding(name: string, value: JSValue): void {
		throw new Error("Method not implemented.");
	}
	SetMutableBinding(name: string, value: JSValue, strict: boolean): void {
		throw new Error("Method not implemented.");
	}
	GetBindingValue(name: string, strict: boolean): JSValue {
		throw new Error("Method not implemented.");
	}
	DeleteBinding(name: string): boolean {
		throw new Error("Method not implemented.");
	}
	HasThisBinding(): boolean {
		throw new Error("Method not implemented.");
	}
	HasSuperBinding(): boolean {
		throw new Error("Method not implemented.");
	}
	WithBaseObject(): JSValueObject | JSValueUndefined {
		throw new Error("Method not implemented.");
	}
}
