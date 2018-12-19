---
title: 'Tagged template literals'
date: '2018-12-17T22:12:03.284Z'
---

Since recently, with the new ES features, it's possible to use back ticks to interpolate variable values inside strings:

```javascript
const name = 'Marvin'

console.log(`Hello ${name}`) // prints "Hello Marvin"
```

It clearly simplifies the way we concatenate information inside a text content variable.

It's a feature known as template literals. In fact, it's only a bit of what we can achieve using template literals.

## Tagging a string to create behavior

If you've been working with styled components, you may have seen code that looks like:

```javascript
const margin = '0 auto'

const Wrapper = styled.div`
  width: 1024px;
  margin: ${margin};
`
```

This syntax is not something that we use to see in other languages. Is this a function? A function call? What does it mean to concatenate such a string just after that `styled.div`?

On this snippet, the `styled.div` information is a tagged template literal that provides **a specific behavior** to the following string. The string only act as a declarative representation and customization of a `styled.div`. We can see this as an argument to the `styled.div` "thing".

## Creating a tagged template literal

One of the thing I really like with template literals is their **declarative** syntax.

Let's use a `html` tagged template:

```javascript
const User = ({ name }) =>
  html`
    <div><h1>Hello ${name}</h1></div>
  `
```

Only by reading the 4 lines snippet, you may have a good idea of what it should do: creating an HTML tree with the concatenate string content.

To create the previously used template, we need to create that specific `html`:

```javascript
const html = (strings, ...interpolated) =>
  strings.reduce((content, currentString, index) => {
    const newValue = interpolated[index] || '' // does it exist an argument for that string position?

    return content + currentString + newValue
  }, '')
```

It's just a function !

`strings` is an array containing all of the strings that are NOT interpolated. The array is built by splitting the content of the block before each information that needs to be interpolated.

`...interpolated` is an array holding all of the interpolated values. As may be have noticed, I've been "forced" to spread information: we don't know how much values we get using tagged template literals. If you know how much information you need to deal with, you're not forced to use this approach.

## Run it in a real context

<iframe src="https://codesandbox.io/embed/7mvjnkpmm0" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
