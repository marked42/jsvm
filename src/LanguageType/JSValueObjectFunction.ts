import { JSValueObject, ObjectPropertyMap } from "./JSValueObject";

export class JSValueObjectFunction extends JSValueObject {
	// TODO: what is the [Call] value
	public readonly "[[Call]]": any;

	constructor(
		call: any,
		public readonly value: ObjectPropertyMap = new Map()
	) {
		super(value);

		this["[[Call]]"] = call;
	}
}
