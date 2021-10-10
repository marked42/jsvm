import { JSValue } from "./JSValue";

export class Binding {
	constructor(
		public readonly name: string,
		public value: JSValue,
		public initialized: boolean,
		public deletable: boolean,
		public mutable: boolean
	) {}
}
