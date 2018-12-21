---
title: 'React synchronous fetch'
date: '2018-12-20T22:12:03.284Z'
---

At [JSConf Iceland 2018](https://2018.jsconf.is/), [Dan Abramov](https://twitter.com/dan_abramov) has presented different new features such as Time Slicing, Suspense and an API that would allow to fetch some information using a synchronous API. ([link to the video](https://www.youtube.com/watch?v=nLF0n9SACd4))

If you use to work with JavaScript on the client side, you probably know that `fetch` returns a `Promise` and thus is asynchronous. When you enter in an asynchronous "world", with a callback, timer or promise, you have to stand in that world:

```javascript
const getBulbasaur = () =>
  fetch('https://pokeapi.co/api/v2/pokemon/1/')
    .then(res => res.json())
    .then(({ name ) =>{
		// we only reach this part when the information is received
	})
```

## React cache API

The API that I've mentioned earlier is called `react-cache` and is actually experimental. We can use it inside a component like:

```jsx
// create an API resource from something asynchronous
const ApiResource = createResource(getBulbasaur)

const Component = () => {
  // make a synchronous call on the ApiResource and get the information
  const bulbasaur = ApiResource.read()

  return <div>Hello {bulbasaur.name}</div>
}
```

The first time I've been a bit confused. But here's a working [codesandbox sample fetching Bulbasaur](https://codesandbox.io/s/6y0jpl802k).

After digging a bit and trying to understand what's happening under the hood, I've finally (nope, [@swiip](https://twitter.com/swiip) and I) how it may work.

## React render is stateless

Since [fiber](https://github.com/acdlite/react-fiber-architecture), the new architecture, React computation has been divided in multiple phases:

<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">I just made this diagram of modern React lifecycle methods. Hope you’ll find it helpful! <a href="https://t.co/LJNMae58rp">pic.twitter.com/LJNMae58rp</a></p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/981712092611989509?ref_src=twsrc%5Etfw">5 avril 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

An important thing to notice is that the render phase is stateless and has no side effects. It's an important concept because we are now able to call it multiple time while being sure that it won't affect the current DOM representation directly.

## Synchronous fetch

### Our own component definition

For the sake of simplicity, we'll rely on simple and standard concepts to give an idea of how it may be implemented.

Let's say that we have a component defined this way:

```javascript
import { createComponent } from './framework'
import { customFetch } from './custom-fetch'

const Pokemon = createComponent(({ id }) => {
  const pokemon = customFetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)

  return html`
    <div><h1>${pokemon.name}</h1></div>
  `
})
```

Where `html` is defined:

```javascript
const html = (strings, ...interpolated) =>
  strings.reduce((content, currentString, index) => {
    const newValue = interpolated[index] || ''

    return content + currentString + newValue
  }, '')
```

### customFetch implementation

The idea behind this synchronous call is to abuse the render phase of React: we will do asynchronous operations **in between** of two render calls. An important thing to notice is that we will **interrupt** the render call to handle the asynchronous function somewhere else.

Let's imagine the following scenario:

- first render the component, and interrupt the function when the synchronous fetch is detected
- fetch some data **outside** the component
- second render with the asynchronous data resolved

Here's a way to implement `customFetch` to handle the interrupting responsibility:

```javascript
let cache

export const customFetch = url => {
  if (cache) {
    return cache
  }

  throw { type: 'FETCH', url }
}

// This will be called later to actually make the customFetch not throwing
export const setCache = data => {
  cache = data
}
```

With the previous snippet and the different functions exposed by the module, it's possible to interrupt a function while it's executing or to simply let it pass and return the `cache` content **when it's filled**.

### Handling the "error"

`createComponent` is our way to define a custom components. It's a bit like the `extends React.Component` thing.

The idea is to manage the "error" thrown by the component and to make a real world fetch:

```javascript
// using a simple root element
const root = document.getElementById('app')

export const createComponent = Component => props => {
  try {
    // This should throw the first time, but not the second time
    // because the customFetch cache is filled
    root.innerHTML = Component(props)
  } catch (action) {
    if (action.type === 'FETCH') {
      fetch(action.url)
        .then(res => res.json())
        .then(res => {
          // This line allows to NOT throw on second render
          setCache(res)
          root.innerHTML = Component(props)
        })
    }
  }
}
```

The first thing we `try` to do is simply to render the component. If it throws, like in our case, we can trigger some specific computations based on the message we receive. If the message is a `FETCH` type, we concretely use a real world fetch and we re-render our component.

The way we're sending information somewhere to the top and waiting for a specific behavior is commonly called [Algebraic effects](https://www.eff-lang.org/handlers-tutorial.pdf). There's the effect: the `throw` statement, and there's the effect handler: the `catch` block in a parent.

## Run it for real

Here's a Codesandbox that shows how it work for real:

<iframe src="https://codesandbox.io/embed/30z2mwn1om?autoresize=1&fontsize=12&module=%2Fsrc%2Fframework.js&view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
