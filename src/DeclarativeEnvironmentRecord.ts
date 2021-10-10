import { EnvironmentRecord } from "./EnvironmentRecord";
import { Binding } from "./Binding";
import { assert } from "console";
import { NormalCompletion } from "./CompletionRecord";
import { JSValueUndefined } from "./JSValue";

export class DeclarativeEnvironmentRecord extends EnvironmentRecord {
	public readonly bindings = new Map<string, Binding>();

	HasBinding(name: string): boolean {
		return this.bindings.has(name);
	}

	assertBindingNotExist(name: string) {
		assert(!this.HasBinding(name), `Binding ${name} already exist`);
	}

	CreateMutableBinding(name: string, deletable: boolean) {
		this.assertBindingNotExist(name);

		this.bindings.set(
			name,
			new Binding(name, undefined, false, deletable, true)
		);

		return NormalCompletion();
	}

	CreateImmutableBinding(name: string, strict?: boolean): void {
		this.assertBindingNotExist(name);

		this.bindings.set(
			name,
			new Binding(name, undefined, false, strict, false)
		);
	}

	InitializeBinding(name: string, value: any): void {
		throw new Error("Method not implemented.");
	}
	SetMutableBinding(name: string, value: any, strict: boolean): void {
		throw new Error("Method not implemented.");
	}
	GetBindingValue(name: string, strict: boolean) {
		throw new Error("Method not implemented.");
	}
	DeleteBinding(name: string): boolean {
		throw new Error("Method not implemented.");
	}
	HasThisBinding(): boolean {
		return false;
	}
	HasSuperBinding(): boolean {
		return false;
	}
	WithBaseObject() {
		return JSValueUndefined;
	}
}
