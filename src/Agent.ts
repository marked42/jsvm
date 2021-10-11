import { ExecutionContext } from "./ExecutionContext";
import { JSValueObjectFunction } from "./LanguageType";

export class Agent {
	public readonly executionContextStack = [] as ExecutionContext[];

	/**
	 * https://262.ecma-international.org/12.0/#running-execution-context
	 *
	 * The running execution context is always the top element of this stack
	 */
	get runningExecutionContext() {
		if (this.executionContextStack.length > 0) {
			return this.executionContextStack[
				this.executionContextStack.length - 1
			];
		}
	}

	public readonly Function: JSValueObjectFunction | null;
}
