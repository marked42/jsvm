# Javascript

## ES6 Class

`super` keyworkd in class constructor is statically bound, so when class(which is actually a function) prototype changes later, `super` remains the same value.

```javascript
// r1 r2 is executed sequentially
function* foo() {
	var r1 = yield request("http://some.url.1");
	var r2 = yield request("http://some.url.2");

	var r3 = yield request(`http://some.url.3/?v="${r1},${r2}`);

	console.log(r3);
}

// p1 p2 is executed in parallel
function* foo() {
	var p1 = yield request("http://some.url.1");
	var p2 = yield request("http://some.url.2");

	var r1 = yield p1;
	var r2 = yield p2;

	var r3 = yield request(`http://some.url.3/?v="${r1},${r2}`);

	console.log(r3);
}

// p1 p2 is executed in parallel
function* foo() {
	var [r1, r2] = yield Promise.all([
		request("http://some.url.1"),
		request("http://some.url.2"),
	]);

	var r3 = yield request(`http://some.url.3/?v="${r1},${r2}`);

	console.log(r3);
}

// better to hide it in another fuction
function bar(url1, url2) {
	return Promise.all([request(url1), request(url2)]);
}

// p1 p2 is executed in parallel
function* foo() {
	var [r1, r2] = yield bar("http://some.url.1", "http://some.url.2");

	var r3 = yield request(`http://some.url.3/?v="${r1},${r2}`);

	console.log(r3);
}
```

`super` keyworkd in class constructor is statically bound, so when class(which
is actually a function) prototype changes later, `super` remains the same value.

### Operator Precedence

[Operator Precedence MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

```javascript
function Foo() {
	getName = function () {
		console.log(1);
	};
	return this;
}

Foo.getName = function () {
	console.log(2);
};
Foo.prototype.getName = function () {
	console.log(3);
};

var getName = function () {
	console.log(4);
};
function getName() {
	console.log(5);
}

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // Foo() returns global object, returns 4 in chrome, raise error in node cause global.getName === getName is not false.
getName(); // 4
new Foo.getName(); // 2, new (Foo.getName)();
new Foo().getName(); // 3, (new Foo()).getName();
new new Foo().getName(); // 3. new ((new Foo()).getName)();
```

## Generator & Iterator

We don't pass a value to the first `next()` call. Only a paused `yield` could
accept value passed by a `next(...)`.

### Iterator & Iterable

Interface definitions with typescript.

```typescript
interface IteratorResult<T> {
	done: boolean;
	value: T;
}

interface Iterator<T> {
	next(value?: any): IteratorResult<T>;
	return?(value?: any): IteratorResult<T>;
	throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
	[Symbol.iterator](): Iterator<T>;
}
```

Usage of iterable interface

```javascript
let [x, y] = [1, 2]       // destructuring

let chars = [...'hello']  // spread operator, ['h', 'e', 'l', 'l', 'o']

function* () {
  yield* [1, 2, 3]        //  yield*
}

for (let i of [1, 2, 3])  // for ... of loop

Array.from('hello')       // Array.from(Iterable)

new Map([['a', 1], ['b', 2]]) // Map(), Set(), WeakMap(), WeakSet()

Promise.all([1, 2, 3])
Promise.race([1, 2, 3])
```

### yield

1. `yield` cannot be used in normal inside normal function like `Array.ForEach()`, use for loop instead.
1. `yield` must be inside parens to be used as expression, but can be used as function parameter directly.

```javascript
console.log('hello' + yield 'world')  // SyntaxError
console.log('hello', yield 'world')   // OK
```

Generator function returns an iterator object `Iter`, it's property `Iter[Symbol.iterator]` point to itself. So `Iter` is both an `iterator` and an `iterable` object.

1. `n` `yield` keyword divide a generator function into `n+1` sub function sharing same generator function context.
1. `n`th call of `next()` runs the `n`th sub function and execute the expression after the `n`th `yield` keyword, result of expression is used as return value of `next()` call. Yield expression is lazy evaluated, only when corresponding `next()` is then it get evaluated.
1. `n`th call of `next(param)` passes its parameter `param` to `n-1`th `yield` expression as its result, and start execution of `n`th sub function. So the first `next()` has no corresponding `yield` to received passed parameter, and parameters are ignored if there's any.
1. `yield` used by itself returns `undefined` to corresponding `next()`. `next()` with no parameter passes `undefined` to corresponding `yield` expression.

`Generator` function returns a `Generator` object, which implements both `iterable` and `iterator` protocol. It has three methods.

```javascript
Generator.prototype.next();
Generator.prototype.return();
Generator.prototype.throw();
```

`for..of` loop, spread operator `...` and destrcture and `Array.from` all accept object with `iterable` protocol.

```javascript
function* numbers() {
	yield 1;
	yield 2;
	return 3;
	yield 4;
}

[...numbers()]; // [1, 2]

Array.from(numbers()); // [1, 2]

let [x, y] = numbers(); // x = 1, y = 2

// 1
// 2
for (let n of numbers()) {
	console.log(n);
}
```

1. An `iterator` has a `throw()` method, which accepts a parameter as error to throw. It throws an error inside generator function at corresponding `yield` position. Thrown error will first be caught by `try...catch` statement inside generator function wrapping that `yield` keyword, otherwise error will be propagated to outer scope to handle.
1. Note that `throw new Error('error')` statement works as normal, differnt from `iterator.throw()` method.
1. If an error thrown inside generator function not caught by itself, iterators are considered done after error propagated outside of generator. Subseqent `it.next()` calls will always return `{value: undefined, done: true}`.
1. Generator function can handle errors thrown by asynchronous step and synchronous step in same synchronous way.

```javascript
var gen = function* gen() {
	try {
		yield console.log("a"); // exception thrown here
		console.log("not executed");
	} catch (e) {
		console.log("caught: ", e);
	}

	yield console.log("b");
	yield console.log("c");
};

var g = gen();
g.next(); // a
g.throw("error"); // b
g.next(); // c
```

1. `Generator.prototype.return(param)` ends `iterator` and returns passed in parameter `{done: param, done: true}`. It will return `undefined` when called with zero arguments.
1. If `yield` expression corrosponding with `Generator.prototype.return()` is wrapped inside a `try...finally` block, generator will return after `finally` block is executed.

### Generator Delegation

Use `yield*` to nest multiple generators

```javascript
function* inner() {
	yield "hello";
}

function* outer1() {
	yield "open";
	yield inner();
	yield "close";
}

var gen = outer1();
gen.next().value; // 'open'
gen.next().value; // an iterator
gen.next().value; // 'close'

function* outer2() {
	yield "open";
	yield* inner();
	yield "close";
}

gen = outer2();
gen.next().value; // 'open'
gen.next().value; // 'hello'
gen.next().value; // 'close'
```

1. `yield*` can accept any object with `iterator` interface.
1. Generator delegation can delegate message, errors, and asynchrounous operation.

```javascript
function* mixGenerator() {
	yield* ["a", "b", "c"];
	yield "hello";
	yield* "hello";
}

var it1 = mixGenerator();
it1.next(); // 'a'
it1.next(); // 'b'
it1.next(); // 'c'
it1.next(); // 'hello'
it1.next(); // 'h'
it1.next(); // 'e'
it1.next(); // 'l'
it1.next(); // 'l'
it1.next(); // 'o'
```

```javascript
function* flattenArray(array) {
	for (let item of array) {
		if (Array.isArray(item)) {
			yield* flattenArray(item);
		} else {
			yield item;
		}
	}
}
const nested = ["a", ["b", ["c", ["d", "e"]]]];
console.log([...flattenArray(nested)]);
// ['a', 'b', 'c', 'd', 'e']
```

New syntax for declaring object function property.

```javascript
let person = {
	name() {
		return "Jane";
	}, // required in object, may omit in class syntax

	*nameCharaters() {
		yield* "Jane";
	},

	// same as above
	lastNameCharacters: function* () {
		yield* "Osteen";
	},
};
console.log(person.name());
let it = person.nameCharacters();
console.log(it.next()); // 'J'
console.log(it.next()); // 'a'
console.log(it.next()); // 'n'
console.log(it.next()); // 'e'
```

A more complicated example on delegation iterator and message passing.

### Yield and Promise

Generators can yield promise or thunk to represent ansynchronous operation. After asynchronous operation is finished, resume execution of generator to continue and complete generator function. We need a utility function called generator runner to help us automize the process of resuming and completing generators with asynchronous operations.

Asychronous flow control by genrators gives us two main advantages.

1. Asynchronous flow control code is almost the same as synchronous counterparts with `yield` keyworkd indicating asynchronous steps. Almost no noise code, very high signal to noise ratio.
1. Both asynchronous and synchronous errors can be handle synchronously inside generator.

One little imperfection.

#### Promise in Concurrency

Pay a little attention to the subtle difference between sequential and concurrent promise.

```javascript
const asyncStep = (numberOfSeconds) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`${numberOfSeconds} seconds later`);
		}, numberOfSeconds * 1000);
	});

// r1, r2 runs sequentially
function* foo() {
	var r1 = yield asyncStep(1);
	var r2 = yield asyncStep(1);

	var r3 = yield asyncStep(r1 + r2);
}

// r1, r2 runs concurrently
function* foo() {
	var p1 = asyncStep(1);
	var p2 = asyncStep(2);

	var r1 = yield p1;
	var r2 = yield p2;

	var r3 = yield asyncStep(Math.max(r1, r2));
}

// r1, r2 runs concurrently, use Promise.all
function* foo() {
	var [r1, r2] = yield Promise.all([asyncStep(1), asyncStep(2)]);

	var r3 = yield asyncStep(Math.max(r1, r2));
}

// r1, r2 runs concurrently, wraps concurrent steps in bar()
function bar() {
	return Promise.all([asyncStep(1), asyncStep(2)]);
}

function* foo() {
	var [r1, r2] = yield bar();

	var r3 = yield asyncStep(Math.max(r1, r2));
}
```

1. We still need a utility generator runner function to start and complete generator function.

#### Thunk

A thunk is a function that wraps another function inside. When a thunk is called, it forward paramters to wrapped function and call it.

```javascript
function foo(x, y, cb) {
	setTimeout(() => {
		cb(x + y);
	}, 1000);
}

function fooThunk(cb) {
	foo(3, 4, cb);
}

// call thunk
fooThunk((sum) => console.log(`sum ${sum}`));

// thunkify below creates a thunk
const thunkify = (fn, ...args1) => {
	return function (...args2) {
		return fn.call(null, ...args1, ...args2);
	};
};

var fooThunk = thunkify(foo, 3, 4);

// thunkify below returns a thunkory (thunk factory)
const thunkify = (fn) => {
	return (...args1) => {
		return (...args2) => {
			return fn.call(null, ...args1, ...args2);
		};
	};
};

// thunkory below creates thunk
const fooThunkory = thunkify(foo);

var fooThunk = fooThunkory(3, 4);
```

### Generator and this

Generator function always returns an `ItrableIterator` object, it cannot be used as constructor.

```javascript
function F() {
    yield 'a'
}

var f = new F() // TypeError: F is not a constructor
```

### Generator and State Machine

//TODO: refere to YDKJS Async & Performance Page 116.

## Async Function

Async function has multiple forms.

1. function: `async function() {}`
1. function expression: 'const foo = async function() {}`
1. object's function property: `let obj = { async foo() {} }`
1. arrow function: `const foo = async () => {}`

Async function returns a resolved `Promise` if it runs successfully. If a normal object returned, it will be wrapped as a resolved `Promise` as return value.

Async function returns a rejected `Promise` if error thrown and not handled inside async function. Use `try...catch` to handle errors inside async function.

### await

1. `await` can be followed by a `Promise` object or a normal object. Normal object will also be wrapped as a resolved `Promise` object.
1. If following `Promise` is rejected, async function stops execution and return the rejected `Promise` object.
1. Use `try...catch` or `.catch()` to handle rejected promise and catch error object.

    ```javascript
    async function foo() {
    	try {
    		await Promise.reject("error");
    	} catch (err) {
    		console.log("catch: ", err);
    	}
    }

    async function foo() {
    	await Promise.reject("error").catch((err) => {
    		console.log("error: ", err);
    	});
    }
    ```

1. `await` can only be used in async function. `await` is a keyword in ES6, cannot be used as identifier.

```javascript
const asyncStep = (number) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`${number} seconds later`);
		}, number * 1000);
	});

async function foo() {
	let numbers = [1, 2, 3];
	// error, await cannot be used in normal function forEach
	numbers.forEach((number) => await asyncStep(number));
}

// sequential execution
async function foo() {
	let numbers = [1, 2, 3];
	for (let number of numbers) {
		await asyncStep(number);
	}
}

// concurrent execution
async function foo() {
	let numbers = [1, 2, 3];
	// error, await cannot be used in normal function forEach
	numbers.forEach(async (number) => await asyncStep(number)); // all promises started
}

// concurrent execution
async function foo() {
	let numbers = [1, 2, 3];
	const promises = numbers.map((number) => asyncStep(number)); // all promises started

	let results = [];
	for (let promise of promises) {
		results.push(await promise);
	}
	const [r1, r2, r3] = results;
}

// concurrent execution
async function foo() {
	let numbers = [1, 2, 3];
	const promises = numbers.map((number) => asyncStep(number)); // all promises started
	const [r1, r2, r3] = await Promise.all(promises);
}
```

Promise start execution when it's created. So concurrent promises are created without waiting, then `await` is used to wait until they are finished sequentially. Sequential promises are created one at a time, `await` until current one is finished, then create next promise to execute sequentially.
