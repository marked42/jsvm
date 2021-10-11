import { JSValueString } from "./JSValueString";
import { JSValueObject } from "./JSValueObject";
import { JSValueNumber } from ".";

export class JSValueObjectReferenceError extends JSValueObject {
	constructor(
		message: JSValueString,
		fileName: JSValueString,
		lineNumber: JSValueNumber
	) {
		super();

		this.properties.set(new JSValueString("message"), message);
		this.properties.set(new JSValueString("fileName"), fileName);
		this.properties.set(new JSValueString("lineNumber"), lineNumber);
	}
}
