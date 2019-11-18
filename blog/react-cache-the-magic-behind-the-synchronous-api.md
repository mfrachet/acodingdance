---
path: react-cache
date: 2019-05-15T16:34:44.804Z
title: 'react-cache: the magic behind the synchronous API'
tags:
  - react
  - react-native
  - javascript
---

_Before starting, I have to mention that the react-cache library is an unstable library but we can create a similar behavior only dealing with React ;)_

## Why to talk about such a library?

When [Dan Abramov](https://twitter.com/dan_abramov), at [JSConf Iceland 2018](https://2018.jsconf.is/), has presented this new library [coming with Time Slicing and Suspense](https://www.youtube.com/watch?v=nLF0n9SACd4), it was one of the first time I have absolutely no idea how it may work.

## Usual way to fetch data with React

In the pre-hooks era, when we wanted to get remote data inside a component only one time, we used to rely on `componentDidMount`:

```jsx
class Pokemon extends React.Component {
  constructor(props) {
    super(props)

    this.state = { pokemonName: null }
  }

  componentDidMount() {
    fetch(SOME_POKEMON_API_URL)
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemonName: pokemon.name }))
  }

  render() {
    return <div>{this.state.pokemonName || 'Fallback :)'}</div>
  }
}
```

## Fetching data using the react-cache API

Now, let's see how it works using the react-cache library.

```jsx
// importing the library
import { unstable_createResource as createResource } from 'react-cache'

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/'

const pokemonById = id => fetch(POKEMON_API + id).then(res => res.json())

// creating a resource that aims to provide some magic mechanism to the pokemonById function
const ApiResource = createResource(pokemonById)

const Pokemon = ({ number }) => {
  // really fetching the data, with a synchronous API 😱
  const pokemon = ApiResource.read(number)

  return <div>Hello {pokemon.name}</div>
}

const App = () => (
  // React suspense that will display the fallback content while the request is pending
  <Suspense fallback={<div>Let's wait :D</div>}>
    <Pokemon number={2} />
  </Suspense>
)
```

Even if this library looks magic at first, it's forced to rely on a network operation which is something asynchronous. I mean, we don't have any tool in JavaScript that would allow to fetch something and to block the main thread.

This means that there's probably a trick behind the scene that I wanted to understand.

<iframe src="https://codesandbox.io/embed/l78vxv7wz9?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Sum up the information we have

After reading the previous snippet, we know that:

- The library aims to fetch Data
- It owns a cache in its name so... maybe the data is cached somehow?
- It can fetch data in the render function, something that was not possible
- It relies on a synchronous API

Let's put some `console.log` in our component to check how it behaves:

```jsx
const Pokemon = ({ number }) => {
  console.log("I'm passing here two times 🤔")
  const pokemon = ApiResource.read(number)
  console.log("I'm passing here only ONE time 😦")

  return <div>{pokemon.name}</div>
}
```

The result is clear: the first log is printed two times while the second one is run only once. I can now take two other information from there:

- The `Pokemon` (render) function is executed twice
- `ApiRessource.read` breaks the normal program flow, this is why the second log is reached only once

Let's try to see how we can implement such a system.

## Let's code!

### Initializing a new project

I suggest you create a simple project using [`create-react-app`](https://github.com/facebook/create-react-app):

```shell
$ npm i -g create-react-app
$ create-react-app my-synchronous-fetchapp
$ cd my-synchronous-fetchapp
```

---

Now, let's modify our `App.js` file so that it looks like:

```jsx
import React from 'react'
// We re going to implement that module 😎
import {
  unstable_createResource as createResource,
  Suspense,
} from './react-cache'
import { Loader } from './components/Loader'
import { PokemonDetail } from './components/PokemonDetail'
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/'

/* Application */
const pokemonById = id => fetch(POKEMON_API + id).then(res => res.json())

const ApiResource = createResource(pokemonById)

const Pokemon = ({ number }) => {
  const pokemon = ApiResource.read(number)

  return <div>{pokemon.name}</div>
}

export const App = () => (
  <Suspense fallback={<Loader label="Waiting for the pokemons" />}>
    <Pokemon number={6} />
  </Suspense>
)
```

As you've probably mentioned, we're trying to import `./react-cache` which is something that doesn't exist.

### Creating our custom react-cache

Let's now create the not existing `./src/react-cache` folder with an `index.js` inside. According to the thing we've previously used in the example snippets, we can imagine the following module definition in `index.js`:

```jsx
import React from 'react'
/**
 * The usage is:
 * const ApiResource = createResource(fetchFunction)
 * ApiResource.read()
 * We supposed it also exist a ApiResource.write()
 */
export const unstable_createResource = somethingThatFetches => {
  const ApiResource = {
    // Read some data somewhere using some arguments
    read(...args) {},
  }

  return ApiResource
}

/**
 * React Suspense equivalent
 */
export class Suspense extends React.Component {}
```

_For the purpose of the post, I voluntary redefined Suspense inside this library. In reality, Suspense is part of React, not react-cache_.

### Implementing the cache system

Well, react-cache is a library that probably relies on a cache. I think that we should use the least most code to create the simplest possible cache system:

```jsx
import React from 'react'
/**
 * The usage is:
 * const ApiResource = createResource(fetchFunction)
 * ApiResource.read()
 * We supposed it also exist a ApiResource.write()
 */
export const unstable_createResource = somethingThatFetches => {
  // The cache itself
  let cache

  const ApiResource = {
    // Read some data somewhere using some arguments
    read(...args) {
      if (!cache) {
        // fill the cache with something
      }

      return cache
    },
  }

  return ApiResource
}

/**
 * React Suspense equivalent
 */
export class Suspense extends React.Component {}
```

## The tricky part

It's now time to deal with the "tricky" part. Do you remember that react-cache library interrupts the current component rendering?
I know one way to make that interruptions: throwing an error. And this is the way react-cache handles this.

Let's imagine that:

- `ApiResource.read` will try to read its internal cache
- If it exists, it returns the value of the cache
- If not, it throws a `Promise` that the parent can resolve
- The parent will re-render and resolve the `Promise` that **modifies the cached value**

In our scenario:

- Calling `ApiResource.read` will interrupt the `Pokemon` render function by throwing a `Promise`
- Our own definition of `Suspense` will catch that `Promise`, make the HTTP call and set the cache value
- The `Suspense` parent will now be able to re-render its `Pokemon` children with the cached data

### Handling te scenario:

```jsx
import React from 'react'
export const unstable_createResource = somethingThatFetches => {
  let cache

  const ApiResource = {
    read(...args) {
      if (!cache) {
        /**
         * Throws the promise that modifies the cached data
         */
        const toResolve = {
          toResolve: somethingThatFetches(...args).then(data => {
            cache = data
          }),
        }

        throw toResolve
      }

      return cache
    },
  }

  return ApiResource
}
```

The `Suspense` parent is now able to deal with this error:

```jsx
/**
 * React Suspense equivalent
 */
export class Suspense extends React.Component {
  constructor(props) {
    super(props)

    // Creates a simply state verifying that we have an error or not
    this.state = { hasError: false }
  }

  // When we get an error, let's ajust the state in consequence
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // componentDidCatch parameter is an error olding a promise to resolve that will modify the cached value 🤯
  async componentDidCatch(error) {
    await error.toResolve

    this.setState({ hasError: false })
  }

  render() {
    const { children, fallback } = this.props

    // Render the fallback when there is a pending error,
    return this.state.hasError ? fallback : children
  }
}
```

🎉🎉🎉 If you run the code, it should be working and fetches remote data using a synchronous API 😎

---

For a full example, check the https://mfrachet.github.io/react-cache-meetup/ application!