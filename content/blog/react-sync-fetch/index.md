---
title: 'react-cache: the magic behind the synchronous API'
date: '2018-12-20T22:12:03.284Z'
---

_Before starting, I have to mention that the react-cache library is an unstable library but we can create a similar behavior only dealing with React ;)_

## Why to talk about such a library?

When [Dan Abramov](https://twitter.com/dan_abramov), at [JSConf Iceland 2018](https://2018.jsconf.is/), has presented this new library [coming with Time Slicing and Suspense](https://www.youtube.com/watch?v=nLF0n9SACd4), it was one of the first time I have absolutely no idea how it may work.

## Usual way to fetch data with React

In the pre-hooks era, when we wanted to get remote data inside a component only one time, we used to rely on `componentDidMount`:

```javascript
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

After reading the previous snippet, we now know that:

- The library aims to fetch Data
- It owns a cache in its name so... maybe the data fetched is cached?
- It can fetch data in the render function, something that was a really bad practice
- It relies on a synchronous API so fetch data

To get a real understanding of the concepts, we're now going to create a possible implementation of the `react-cache` library.

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

```javascript
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

```javascript
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

```javascript
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

  const setCache = (...args) => {
    cache = { ...args }
  }

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
