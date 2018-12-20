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

```javascript
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
