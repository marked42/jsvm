import { JSValue } from "./JSValue";
import { JSValueString } from "./JSValueString";
import { JSValueUndefined } from "./JSValueUndefined";

/**
 * symbol values are shared by all realms
 */
export class JSValueSymbol extends JSValue {
	public readonly "[[Description]]": JSValueString | JSValueUndefined;

	constructor(public readonly description: JSValueString | JSValueUndefined) {
		super("symbol");

		this["[[Description]]"] = description;
	}
}

export const WellKnownSymbols = {
	asyncIterator: new JSValueSymbol(new JSValueString("Symbol.asyncIterator")),
	hasInstance: new JSValueSymbol(new JSValueString("Symbol.hasInstance")),
	isConcatSpreadable: new JSValueSymbol(
		new JSValueString("Symbol.isConcatSpreadable")
	),
	iterator: new JSValueSymbol(new JSValueString("Symbol.iterator")),
	match: new JSValueSymbol(new JSValueString("Symbol.match")),
	matchAll: new JSValueSymbol(new JSValueString("Symbol.matchAll")),
	replace: new JSValueSymbol(new JSValueString("Symbol.replace")),
	search: new JSValueSymbol(new JSValueString("Symbol.search")),
	species: new JSValueSymbol(new JSValueString("Symbol.species")),
	split: new JSValueSymbol(new JSValueString("Symbol.split")),
	toPrimitive: new JSValueSymbol(new JSValueString("Symbol.toPrimitive")),
	toStringTag: new JSValueSymbol(new JSValueString("Symbol.toStringTag")),
	unscopables: new JSValueSymbol(new JSValueString("Symbol.unscopables")),
};
