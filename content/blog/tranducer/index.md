---
title: 'Reducing complexity with transducers'
date: '2010-01-15T22:12:03.284Z'
---

Since I'm working with React and its ecosystem, I use to work with a more functional approach.

Some of my favorite functional tools are the different stateless `Array` APIs:

```javascript
const initialArray = [1, 2, 3, 4, 5]

const isEven = x => x % 2 === 0
const double = x => x * 2

const newArray = initialArray.filter(isEven).map(double)

console.log(newArray) // [4, 8]
```

## Array APIs complexity

The problem with these `Array` APIs is that they **browse the entire array** and **create a new array** for each functions.

In the previous example, it means that we browse the full array two times: one for `filter` and one for `map`. In time complexity terms, it represents `O(m time n)` with `m` the number of `Array` operations and `n` the number of entries in the array.

On super tiny arrays, it's not a problem since our computers are fast nowadays.

However, when we start dealing with big arrays, it can be slow and since JavaScript runs in a single thread, it can block that thread and slown the application.

This is where transducers can be helpful.

## Transducer

A `transducer` is a like a combination of some `Array` APIs that would allow not to store intermediate arrays and to browse the array only one time.

Using [ningo/transduce](https://mfrachet.github.com/ningo/#/transduce), the previous code can be expressed this way:

```javascript
const initialArray = [1, 2, 3, 4, 5]

const isEven = x => x % 2 === 0
const double = x => x * 2

const newArray = transduce()
  .map(double)
  .filter(isEven)
  .run(initialArray)

console.log(newArray) // [4, 8]
```
