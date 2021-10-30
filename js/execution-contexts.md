# 执行环境与作用域

语法环境（Lexical Environment）与某种语法结构关联，包括

1. 函数声明（FunctionDeclaration）
1. 块语句（BlockStatement）
1. Try 语句的 Catch 分支（Catch Clause）

环境记录（Environment Record）包含了对应语法环境作用域中的所有标识符绑定（Binding）。

环境记录有 outer 字段指向外层环境记录，

语法环境分类

1. 全局环境（global environment），outer 为 null，包含内置的对象绑定（Math/Object 等）和全局对象（window/global/globalThis/this）
1. 模块环境（module environment），outer 是全局环境，包含了模块中顶层声明创建的标识符和导入的标识符。模块环境全局唯一？
1. 函数环境（function environment），每个函数调用对应一个函数环境，outer 是嵌套的其他语法环境，可能是全局、模块、或者函数。可能包含 this 和 super。

语法环境和环境记录是规范用来描述语言机制的工具，不是具体实现。

1. abstract EnvironmentRecord
    1. DeclarativeEnvironmentRecord var / const / let / class / module / import / function
        1. FunctionEnvironmentRecord top-level declarations within function
        1. ModuleEnvironmentRecord
        1. FunctionDeclaration
        1. VariableDeclaration
        1. CatchClause
    1. ObjectEnvironmentRecord
        1. WithStatement
    1. GlobalEnvironmentRecord script global declarations

Questions

1. 绑定的名称是否可以删除
1. 绑定能否重名
    1. 同名的 var a = 1;与函数定义 function a() {} 的优先级
1. 变量提升是如何实现的？
1. 变量读取
    1. 访问未初始化的变量会有什么结果
    1. 访问不存在的变量有什么结果
1. 变量写入
    1. 写入不存在的变量有什么结果
    1. 写入未初始化的变量有什么结果
    1. 写入 const 变量
1. var a = 1; 和 a = 1; 有什么区别？
1. 为什么要区分 声明和定义，声明和初始化？ created evaluated
1. 绑定的几种状态 none -> uninitialized -> initialized 与对应的抽象操作
    1. none -> uninitialized
        1. CreateImmutableBinding
        1. CreateMutableBinding
    1. uninitialized -> initialized
        1. InitializeBinding
        1. GetBindingValue
    1. initialized -> initialized
        1. SetMutableBinding
    1. initialized -> none
        1. DeleteBinding
    1. HasBinding/HasThisBinding/HasSuperBinding/WithBaseObject
1. strict 模式对于绑定操作的影响
    1. strict 模式如何开启，directive/module/class 默认开启
1. ExecutionContext，LexicalEnvironment ， EnvironmentRecord 的关系
1. EnvironmentRecord 的分类，分别对应哪些语法结构
    1. declarative environment record
        1. function environment record
        1. module environment record
    1. object environment record
    1. global environment record
1. this 关键字如何处理
1. super
1. with base object
    1. with 不存在 const 变量，writable 的属性也可以删除
    1. with 会泄漏对象到全局环境，所以不推荐使用
    1. vue 中对应 with 的使用
1. new target
1. 模块中的绑定是间接的，这和 node 中的绑定效果上有何区别？
    1. 一个模块只对应一个 ModuleRecord，是单例的，那么区分 ModuleRecord 的唯一 id 是什么？
    1. 有办法为同一个模块文件生成多个 ModuleRecord 么，通过不同别名引入的方式？

# 全局作用域环境

逻辑上是一个语法环境，实际上有一个 ObjectEnvironmentRecord 和一个 DeclarativeEnvironmentRecord，语言演变造成等的。

1. Object ObjectRecord 的 base 是全局对象 ，包含了 FunctionDeclaration/GeneratorFunctionDeclaration/VariableStatement 定义的变量，
    1. VarNames 包含 Declaration 声明形式定义的变量名
    1. 其余全局对象上属性是对象写入方式添加的
1. Declarative DeclarativeRecord 其余形式的 Declaration

1. 绑定查找顺序，先 DeclarativeRecord 后 ObjectRecord，这样设计的原因？语言演化历史，保持兼容
1. CreateMutableBinding，只检查 DeclarativeRecord 有没有已经存在的 Binding，不检查 ObjectRecord

```js
// 这样的代码属于编译错误，babel编译报错 TODO: 需要查看相关逻辑
var a = 1;
let a = 1;
```

1. HasRestrictedGlobalProperty 全局对象上的属性 a 如果 configurable = false 则不允许声明 DeclarativeRecord 同名变量。在 GlobalDeclarationInstantiation 中调用。

```js
// 编译都ok，运行OK
var undefined = 1;

// 编译ok，运行错误，undefined是global object上configurable = false的属性
let undefined = 2;

// 全局undefined无法写入，重新声明
console.log(undefined);
// undefined是 configurable/writable/enumerable = false，写入无效
var undefined = 1;
console.log(undefined);

// 此处访问的是全局对象上的undefined
{
	var undefined = 1;
	debugger;
	console.log("u: ", undefined);
}

// 此处访问的是局部变量undefined，值为1
{
	let undefined = 1;
	debugger;
	console.log("u: ", undefined);
}
```

1. CanDeclareGlobalVar/CreateGlobalVarBinding
    1. > Logically equivalent to CreateMutableBinding followed by a SetMutableBinding but it allows var declarations to receive special treatment.
    1. 已经存在可以复用，副作用还包括添加到 VarNames 中。
1. CanDeclareGlobalFunction/CreateGlobalFunctionBinding

# 函数作用域

# 局部作用域

# 模块作用域

# this 关键字

通过 ResolveThisBinding 来确定，第一步 GetThisEnvironment，第二部 GetThisBinding

GetThisEnvironment 验证 LexicalEnvironment 的 outer 向上寻找直到第一个 HasThisBinding 为 true 的语法环境

GlobalEnvironment 的 HasThisBinding 为 true，向上寻找 GetThisEnvironment 总会结束， GetThisBinding 返回全局对象
ModuleEnvironment 的 HasBinding 为 true，GetThisBinding 返回 undefined
LexicalEnvironment 的 HasThisBinding 默认为 false，所以局部作用域没有 this
ObjectEnvironmentRecord 的 HasThisBinding 也为 false
FunctionEnvironmentRecord 的 HasThisBinding 普通函数 true，箭头函数 false，返回的是函数环境记录创建时通过 BindThisValue 绑定的 thisValue 值。

上面这几种情况都比较简单，关键是 FunctionEnvironmentRecord 中的绑定 this 值有多种情况。这个 this 值由函数调用决定。

Call(thisArgument, argumentsList) -> OrdinaryCallBindThis(F, calleeContext, thisArgument)这个 thisArgument 就是绑定的 this。

这里分为几种情况

1. fn.bind/fn.call()/fn.apply 对应显式指定 thisArgument
1. 构造函数 Construct 调用 this 是新建对象
1. 其余函数调用情况 12.3.4.1 函数 fn CallExpression 的 Runtime Evaluation

区分被调用的函数值本身的类型

1. Reference 类型
    1. PropertyReference
        1. super reference -> super 的 this
        1. normal reference base object
    1. Record Reference 类型 base 是 Environment Record 类型，调用 envRec.WithBaseObject() 获取 Environment Record 的 base 作为 this
1. Type(fn) 值类型 this 是 undefined

ecma-262 test 收集 语言行为测试用例，测试用例最好能够不约束实现 JS 引擎的语言。

```js
{
	// this是全局对象
	console.log(this);
	with ({ name: 1 }) {
		// TODO: 如果 with statement的 withEnvironment flag为true，那么WithBaseObject应该返回绑定对象，this应该{name: 1}，实际是全局对象，为什么？
		console.log("i: ", this);
	}
}
```

严格模式对 this 的影响

```js
function f() {
	return !this;
} // 返回false，因为"this"指向全局对象，"!this"就是false
function f() {
	"use strict";
	return !this;
} // 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。
```

1. [MDN this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
