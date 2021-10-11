import { JSValue, JSValueObject, JSValueUndefined } from "@/LanguageType";
import { DeclarativeEnvironmentRecord } from "./DeclarativeEnvironmentRecord";

export class ModuleEnvironmentRecord extends DeclarativeEnvironmentRecord {
	GetBindingValue(name: string, strict: boolean): JSValue {
		throw new Error("Method not implemented.");
	}

	DeleteBinding(name: string): boolean {
		throw new Error("Method not implemented.");
	}

	HasThisBinding(): boolean {
		throw new Error("Method not implemented.");
	}

	GetThisBinding() {}

	CreateImportBinding(
		localName: string,
		moduleRecord: ModuleEnvironmentRecord,
		importName: string
	) {}
}
