---
title: 'Unleash the curry: the power of closure'
date: '2018-12-15T22:12:03.284Z'
---

Closure is a functional programming tool that allows to **capture** information (aka variable) from a parent function and to completely encapsulate
it in a child function. This way, this information can't be accessed outside the child and is scoped.

In "old" JavaScript, we used to create closures this way:

```javascript
function add(x) {
  return function(n) {
    return n + x
  }
}

var add2 = add(2) // encapsulate the value 2 and create a function
var six = add2(4) // the result is 6
```

With the new ES features, we can use the arrow function notation to make it one line:

```javascript
const add = x => n => n + x
```

Where `x => /* ... */` is the parent function and `n => /* ... */` is the child function.

## Spicy closure with curry

Curry is a principle that allows to use a function that usually takes n arguments by passing only one argument at a time. It strongly relies
on the closure approach to encapsulate the different arguments between the different function calls.

Each call to a curry function will return a new function with one argument. When the number of returned functions reaches the arity (number of arguments)
of the initial function, the real result is returned.

It seems quite complicated but not that much, let's take the example of an `add` function:

```javascript
const add = (x, n) => n + x

// using a standard approach
const seven = add(2, 5)

// using a curry approach
const curry = fn => x => n => fn(x, n)

const curryAdd = curry(add) // "add" is the "fn" in the curry definition
const curryAdd2 = curryAdd(2) // curryAdd is the "x => /*...*/" function
const six = curryAdd2(4) // curryAdd2 is the "n => /*...*/" function
```

## Why to use such a verbose approach?

### Composability

In functional programming it's pretty common to compose multiple functions between them to create new and more complex
ones using the curry approach.

```javascript
const compose = (f, g) => x => f(g(x))

const addOne = x => x + 1

const addTwo = compose(
  addOne, // "f" in the compose definition
  addOne // "g" in the compose definition
)

// addTwo is "x => /* ... */" with f and g encapsulated or "closed"
// "2" is the x in the compose definition
const four = addTwo(2)

const addFour = compose(
  addTwo,
  addTwo
)

const eight = addFour(4)
```

By using composition, we prefer to build simple functions that combine easily together.

And if you have given attention to the previous examples, you've probably seen
that all the functions used own an arity of 1: it's a contract dealing with curry functions that allows such composition.
It would be quite harder to compose functions with multiple arguments.

### Reusability

As mentioned earlier, closures are a way to encapsulate variables and information for later use.

```javascript
const createModulo = x => n => n % x === 0

const isMultipleOfThree = createModulo(3)
const isMultipleOfFive = createModulo(5)

// result is [30, 10, 15]
const newArray = [17, 30, 10, 15].filter(isMultipleOfFive)
```


The contracts of the `isMultipleOfThree` and `isMultipleOfFive` functions are the fact that they accept one
value to be compared and that their outputs have the same type as their inputs. The `x` value is encapsulated and hidden for later use in the closure function.

---

All of this is possible thanks to the open nature of JavaScript. We can apply simple functional programming concepts
to create powerful and maintainable software using stateless approaches with ease.

I suggest you give a try to the functional programming (FP) approach and check how it impacts the way you think and code,
even in a prototype / OOP world.

JavaScript & FP rock together!
