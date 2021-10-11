import { JSValue, JSValueObject } from "@/LanguageType";
import { GlobalEnvironmentRecord } from "./SpecificationType";

export class RealmRecord {
	// public readonly '[[Intrinsics]]';

	public readonly "[[GlobalObject]]": JSValueObject;
	public readonly "[[GlobalEnv]]": GlobalEnvironmentRecord;
	// public readonly '[[TemplateMap]]':
	public readonly "[[HostDefined]]": JSValue;
}
