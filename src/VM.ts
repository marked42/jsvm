import { ExecutionContext } from "./ExecutionContext";
import { CreateRealm, Realm } from "./Realm";

export class VM {
	realm: Realm;

	executionContextStack: ExecutionContext[];

	get runningExecutionContext() {
		return this.executionContextStack[
			this.executionContextStack.length - 1
		];
	}

	get activeFunctionObject() {
		return this.runningExecutionContext?.Function;
	}

	get currentRealm() {
		return this.runningExecutionContext?.Realm;
	}

	initialization() {
		const realm = CreateRealm();

		const newContext = new ExecutionContext();
		newContext.Function = null;
		newContext.Realm = realm;

		this.executionContextStack.push(newContext);
		const status = this.InitializeHostDefinedRealm(realm);
	}

	InitializeHostDefinedRealm(realm: Realm) {}
}
