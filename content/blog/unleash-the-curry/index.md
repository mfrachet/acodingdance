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
var six = add2(6) // the result is 6
```

Using the new ES features, we can take advent of the arrow functions to make it one line:

```javascript
const add = x => n => n + x
```

Where `x => /* ... */` is the parent function and `n => /* ... */` is the child function.

## Spicy closure with curry

Curry is a principle that allows to use a function that usually takes n arguments by passing only one argument at a time. The curry function
returns another function with only one argument until the function reaches the initial arity.

Using currying, an `add` function with n arguments could be used:

```javascript
const add = (x, n) => n + x

// using a standard approach
const seven = add(2, 5)

// using a curry approach
const curry = fn => x => n => fn(x, n)

const curryAdd = curry(add) // "add" is the "fn" in the definition
const curryAdd2 = curryAdd(2) // curryAdd is the "x => /*...*/" function
const six = curryAdd2(4) // curryAdd2 is the "n => /*...*/" function
```

## Why to use such a verbose approach?

### Composability

In functional programming it's pretty common to compose multiple functions between them using an approach like:

```javascript
const compose = (f, g) => x => f(g(x))

const add1 = x => x + 1

const double = compose(
  add1, // "f" in the compose definition
  add1 // "g" in the compose definition
)

const four = double(2) // "2" is the x in the compose definition

const quadruple = compose(
  double,
  double
)

const sixteen = quadruple(4)
```

By using composition, we prefer to build simple functions that combine easily together. It's not that uncommon to build
really complex functions using really smaller ones.

### Reusability

As mentioned earlier, closure are a way to encapsulate variables and information for later use. Remember the previous example where
`curryAdd2` is a variable and thus can be used at any moment. And if you have given attention to the previous examples,
you've probably seen that the function used owns an arity of 1. It's a contract dealing with curry functions.

If we get in mind these two simple principles, building reusable utilities are super easy:

```javascript
const createInEquality = x => n => x > n

const isLessThanFour = createInEquality(4)
const isLessThanTen = createInEquality(10)

const array = [1, 3, 10, 15]

const lessThanFourArray = array.filter(isLessThanFour)
const lessThanTenArray = array.filter(isLessThanTen)
```

As you may have seen, the only contract of the `isLessThanFour` and `isLessThanTen` functions are the fact that they accept one
value to be compared. The `x` value is encapsulated and hidden for later use in the closure function.
