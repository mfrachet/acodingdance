---
title: 'Tagged template literals'
date: '2018-12-17T22:12:03.284Z'
---

Since recently, with the new ES features, it's possible to use back ticks to interpolate variable values inside strings:

```javascript
const name = 'Marvin'

console.log(`Hello ${name}`) // prints "Hello Marvin"
```

It clearly simplifies the way we concatenate information inside a variable text content.

It's a feature known as template literals. The fact is that we often rely only on this string interpolation capabilities but we can actually do really much more using an advanced, related, feature called tagged template literals.

## Tagging a string to create behavior

If you've been working with styled components, you may have seen code that look like:

```javascript
const margin = '0 auto'

const Wrapper = styled.div`
  width: 1024px;
  margin: ${margin};
`
```

On this snippet, the `styled.div` information is a tagged template literal that provides **a specific behavior** to the sticked string.

## Our own definition of a template

A real advantage of using template literals is that they are completely declarative. It's a paradigm that it strongly appreciated by frontend frameworks users.
You may have worked with JSX or HTML like syntaxes. Tagged template literals

Let's imagine that we're building a framework that only uses standard. No JSX, no template compilation, only standard.

Imagine a tagged template that would be used this way:

```javascript
const User = ({ name }) =>
  html`
    <div><h1>Hello ${name}</h1></div>
  `
```
