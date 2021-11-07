# 值与类型

### 数据类型与值

1. 基本数据类型（primitive type）string number boolean null undefined symbol
1. 对象类型 String Number Boolean Symbol Object Function Array Date RegExp Error

对象

1. 对象是属性的集合，属性 PropertyDescriptor 有两种，Writable/Enumerable/Configurable 的含义
1. 对象有内置的槽保存信息
1. 使用 `a.b`和 `a[b]`两种形式访问对象属性，key 只能是 string 和 symbol 类型，数字或者其他类型 key 值会被转换成字符串访问。

### 对象与原型链

内容顺序

对象的属性

```js
[[Prototype]]
string index
symbol index: PropertyDescriptor
```

一个属性只能是数据属性（Data Property）或者访问器属性（Accessor Property）

1. 对象就是一组键值对记录 对应基本操作 Object.keys() [[OwnPropertyKeys]] / GetOwnPropertyNames / GetOwnProperty/HasOwnProperty/DefineOwnProperty/DefineProperties

1. 控制对键值的读写 Writable/Enumerable/Configurable
1. 增加原型[[Prototype]]， GetPrototypeOf, SetPrototypeOf / Get / Set
1. 对于`[[Configurable]]`为`false`的属性值，再次使用`defineProperty`定义`[[Configurable]]`为`true`抛出错误么？
1. 对于`[[Configurable]]`为`false`的属性，哪些属性的操作被限制了？ Data Property/Accessor Property 互转
1. Accessor Property Get/Set

1. 左值、右值
1. 相等性判断
1. 类型转换

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
