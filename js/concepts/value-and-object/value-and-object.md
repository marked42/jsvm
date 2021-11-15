# 值与类型

1. Javascript 的值（value）分为那两大类？
1. Javascript 语言值包含哪些数据类型？
1. Javascript 对象分类？
1. Javascript 对象的原型链构成图
1. Javascript 对象包含哪些数据？
1. 对象属性分为数据属性和访问器属性

全局对象 global object
built-in objects
intrinsic objects
fundamental object
exotic object
host object

### 数据类型与值

1. 基本数据类型（primitive type）string number boolean null undefined symbol
1. 对象类型 String Number Boolean Symbol Object Function Array Date RegExp Error

对象

1. 对象是属性的集合，属性 PropertyDescriptor 有两种，Writable/Enumerable/Configurable 的含义
1. 对象有内置的槽保存信息
1. 使用 `a.b`和 `a[b]`两种形式访问对象属性，key 只能是 string 和 symbol 类型，数字或者其他类型 key 值会被转换成字符串访问。

### 数据类型

1. typeof 12.5.6 /
1. instanceof
    1. InstanceofOperator 12.9.4
    1. OrdinaryHasInstance 7.3.19
    1. @@hasInstance

### 对象与原型链

内容顺序

对象的属性

```js
[[Prototype]]
string index
symbol index: PropertyDescriptor
```

Spec 4.2

使用原型链模拟类

```js
function Person() {}
Person.prototype.dance = function () {};

function Ninja() {}
Ninja.prototype = new Person();

Object.defineProperty(Ninja.prototype, "constructor", {
	enumerable: false,
	value: Ninja,
	writable: true,
});
```

TODO: 查看 Typescript 生成的辅助函数 inherits ?

#### 原型相关的操作

GetPrototypeOf/SetPrototypeOf/instanceof

一个属性只能是数据属性（Data Property）或者访问器属性（Accessor Property）

1. 对象就是一组键值对记录 对应基本操作 Object.keys() [[OwnPropertyKeys]] / GetOwnPropertyNames / GetOwnProperty/HasOwnProperty/DefineOwnProperty/DefineProperties

1. `[[Get]]` 访问对象属性的两种形式 `a.b`，`a[b]`
1. 控制对键值的读写 Writable/Enumerable/Configurable
1. 增加原型[[Prototype]]， GetPrototypeOf, SetPrototypeOf / Get / Set
1. 对于`[[Configurable]]`为`false`的属性值，再次使用`defineProperty`定义`[[Configurable]]`为`true`抛出错误么？
1. 对于`[[Configurable]]`为`false`的属性，哪些属性的操作被限制了？ Data Property/Accessor Property 互转
1. Accessor Property Get/Set

对于原型链上的数据属性，读操作继承，写操作不继承；访问器属性读写操作都继承。

写操作使用 `CreateDataProperty(Receiver, P, V)`，其中`Receiver`永远是写操作的对象

Questions

1. `[[Set]]`操作对于数据属性和访问器属性的处理差别？
1. 为对象新增属性时 `[[Set]]` 和 `[[DefineOwnProperty]]` 的区别
1. Accessor Property 相比于 Data Property 的主要用处？
1. `[[DefineOwnProperty]]`定义的属性已经存在时如何处理？
1. 哪些基本类型能作为对象的键？

对象上的 [[Set]] 语义和 defineProperty 区别

Immutability

### 属性分类

数据属性， 访问器属性

### 属性定义

### 属性读取

### 属性写入

### 属性删除

1. 严格模式下的静态语义 delete a 报错
1. 删除值的时候返回 true，无任何副作用
1. 只能删除 PropertyReference，而且 configurable 为 false 时报错 super.name 不能删除 ReferenceError
1. strict reference
1. EnvironmentRecord 中调用 DeleteBinding 方法

### 引用类型

base 分为几类 GetBase/GetReferencedName/IsStrictReference

1. Primitive IsPropertyReference / HasPrimitiveBase
1. object IsPropertyReference
1. undefined IsUnresolvableReference
1. super IsSuperReference MakeSuperPropertyReference
1. EnvironmentRecord

GetValue/PutValue/GetThisValue/InitializeReferencedBinding

PutValue 中 对于 UnresolvableReference 的处理会造成隐式的在全局对象上添加同名属性，也就是全局变量。

GetThisValue 使用在 GetValue/PutValue/FunctionCall 三个地方，因为 Getter/Setter/Function 三个地方用到 this

### 遍历

Object.keys()/Object.values()/Object.entries

9.1.12 `[[OwnPropertyKeys]]`

### for in

for in 9.1.11 `[[Enumerate]]`() 遍历属性

1. 只遍历`enumerable: true`的 key
1. key 值出现一次，对象 key 隐藏其原型链上的同名属性
1. 遍历过程中属性发生变化的话，尚未被遍历到的属性被删除，该属性不会被遍历到；新增的属性

EnumerableOwnNames

1. 只遍历 string 类型的 key

### for of

https://mp.weixin.qq.com/s/foXbAj3ODqFKYGUP5K8MkQ

### 不变性

#### `[[Extensible]]`

`[[Extensible]]`为`false`的时候，相关操作 `[[SetPrototypeOf]]/[[IsExtensible]]/[[PreventExtensions]]`
默认值为 true

Object.isExtensible/Object.preventExtensions

1. 对象不能添加新的属性 ValidAndApplyPropertyDescriptor 当前属性 current 为 undefined，不能操作
1. 不能修改对象原型`[[Prototype]]`
1. 值不能从`false`修改为`true`，只有`[[PreventExtensions]]`没有逆操作

[[Configurable]] [[Writable]]
Extensible, seal, freeze

configurable 从 false 设置为 true 后不能再重新设置为 false
configurable 为 true 时，writable 可以任意设置，
为 false 时 writable 可以从 true 到 false，
限制 delete operator

#### sealed 和 frozen

```js
Object.seal();
Object.isSealed();
Object.freeze();
Object.isFrozen();

SetIntegrityLevel();
TestIntegrityLevel();
```

sealed 将每一个属性设置为 configurable: false

frozen 将每个属性设置为 configurable: false, writable: false

### 规范值

1. 引用类型
1. Record/List/CompletionRecord/PropertyDesciptor
1. Lexical Environment / EnvironmentRecord

1. 左值、右值

### 类型转换

7.1 Type Conversion 臭名昭著的真值表

1. 什么时候发生类型转换
1. 转换具体过程如何 ToPrimitive
1. 显式的类型转换写法
1. [what is {} + {}](https://2ality.com/2012/01/object-plus-object.html)

```js
Number("1");
!1;
+new Date();
void 0;
Boolean({}); // true

typeof a === undefined;
```

1. 臭名昭著的 Javascript 真值表
1. 一个面试题 valueOf, toString [a == 1 && a == 2 && a == 3](https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true)

隐式类型转换

1. 基础值的自动装箱/拆箱
1. ToPrimitive
1. valueOf
1. toString

1. [ECMA-262-5 in detail. Chapter 1. Properties and Property Descriptors.](http://dmitrysoshnikov.com/ecmascript/es5-chapter-1-properties-and-property-descriptors/)

### 测试与比较操作

7.2 Testing and comparison operations

### 相等性

7.2.9 === == 符号

1. `==`
1. `===` https://tc39.es/ecma262/#sec-strict-equality-comparison
1. `Object.is` https://tc39.es/ecma262/#sec-samevalue

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness

从严格性来讲

SameValueZero

Abstract Equal < StrictEqual < SameValue

SameValue 和 StrictEqual 关于 NaN 和 signed zero 处理不同。
