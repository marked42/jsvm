import { JSValueObject, ObjectPropertyMap } from "./JSValueObject";

export class JSValueObjectFunction extends JSValueObject {
	// TODO: what is the [Call] value
	public readonly "[[Call]]": any;

	constructor(
		call: any,
		public readonly properties: ObjectPropertyMap = new Map()
	) {
		super(properties);

		this["[[Call]]"] = call;
	}
}
