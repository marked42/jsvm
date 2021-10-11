import { JSValue, JSValueObject, JSValueUndefined } from "@/LanguageType";

export abstract class EnvironmentRecord {
	abstract HasBinding(name: string): boolean;

	abstract CreateMutableBinding(name: string, deletable: boolean): void;

	// strict默认为false，为true时在绑定初始化之前读取或者初始化之后写入抛出错误。
	abstract CreateImmutableBinding(name: string, strict?: boolean): void;

	abstract InitializeBinding(name: string, value: JSValue): void;

	// strict是true且绑定不能设置的话抛出TypeError错误
	abstract SetMutableBinding(
		name: string,
		value: JSValue,
		strict: boolean
	): void;

	// strict为true的时候进行错误检查
	// 1. 绑定name不存在抛出ReferenceError
	// 2. 绑定name没有初始化抛出ReferenceError
	abstract GetBindingValue(name: string, strict: boolean): JSValue;

	// 存在不能被删除返回false，其余返回true
	abstract DeleteBinding(name: string): boolean;

	abstract HasThisBinding(): boolean;

	abstract HasSuperBinding(): boolean;

	abstract WithBaseObject(): JSValueObject | JSValueUndefined;
}
