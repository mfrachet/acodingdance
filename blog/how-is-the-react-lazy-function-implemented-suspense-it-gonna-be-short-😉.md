---
path: how-to-react-lazy
date: 2019-07-31T00:04:14.208Z
title: "How is the React lazy function implemented? Suspense... It gonna be short \U0001F609"
tags:
  - react
  - javascript
---

It's been a time since the React's team has introduced Suspense and concurrent rendering. With hooks, it's the new amazing feature that React is providing.

We are "able" (at least in dev-mode) to:

- create applications that manage specific priorities over our asynchronous operations
- manage asynchronous computations just like if they were synchronous
- use functional components everywhere instead of classes

I'm really excited about the future of React!

---

And today, I wanted to talk about a `Suspense` specific feature which is the `lazy` function that was introduced in [React v16.6](https://reactjs.org/blog/2018/10/23/react-v-16-6.html).

This function aims to provide a simple way to rely on bundler's code splitting using some code like:

```jsx
import React, { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./components/myComponent'))

const App = () => (
  <Suspense fallback={<div>Waiting...</div>}>
    <LazyComponent />
  </Suspense>
)
```

## What the?..

It can be a bit disturbing at first, how can we:

- code split our code, which is a build time feature
- make an asychronous computation that creates a component
- use an (async?) component in a render function which aims to be synchronous

using 2-3 lines?...!

![What the?..](https://media.giphy.com/media/Vfie0DJryAde8/giphy.gif)

## Suspense...🤯

This is not _that_ magic and can exist thanks to the `Suspense` component.

This component is a bit special and whenever you will `throw` a `Promise` in one of its children, it will `catch` that promise, resolve it and re-render its children.

_Did you know that you were able to throw something else than errors in JavaScript?!_

This is why it's called `Suspense`: it _suspends_ the normal execution flow of your application thanks to the `throw` keyword, and make some specific computations before "resuming" it. It doesn't resume it at the exact position of your code, but at least, it re-renders its children **which make you feel like you were getting back to the old execution position**.

I tried to write about it in [this Medium post](https://medium.com/free-code-camp/react-cache-time-slicing-and-fetching-with-a-synchronous-api-2a57dc9c2e6d) but without success - my thoughts at that period were not that organised.

I won't keep the "suspense" for now, so let's check _one_ implementation of the `lazy` function I've came across:

```js
import React from 'react'

let IDS = 0
const loaded = {}

export const lazy = modulePathResolver => {
  const id = IDS++

  return props => {
    const LoadedComponent = loaded[id]

    if (LoadedComponent) {
      return <LoadedComponent {...props} />
    }

    throw modulePathResolver().then(lazyModule => {
      const Component = lazyModule.default
      loaded[id] = Component
    })
  }
}
```

**[It's available on github gist if you want to play with it.](https://gist.github.com/mfrachet/a04cc57a500de85170e2ade4b9406305)**

Obviously, this snippet only works if the component is used inside a `Suspense` parent.

The `lazy` function accepts one argument `modulePathResolver` which is a `Promise` that resolved the module containing your _lazy_ component.

The `lazy` function returns a function which is in fact a (functional) component. All the references to `id` exist only to make sure that the component has only loaded once.

If you take a closer look at the code, it really looks like a cache system, but instead of setting the cached value directly, it `throw`s a promise that wraps the cache setting so that the Suspense parent can resolve it, _lazily_.

And you know what? Since it's an asynchronous operation, it can take some time to execute, milliseconds, seconds or even minutes. And what is displayed _during_ the asynchronous resolution? The `fallback` prop of the `Suspense` component is displayed! Nothing more!

## And now, what?

You have an idea of the way the `lazy` function is working but you also now know how `Suspense` is working. You can now imagine every kind of asynchronous resolution without creating `isLoading` states everywhere, every-time. What about lazy image loading with low-high quality pictures 😉?

Jared Palmer is really good advocate of this and has talked about it in multiple talks he has given like the one at [Chain React 2019](https://www.youtube.com/watch?v=u_0ZMiQZr0k)

My point on this feature is that it also pushes the side effect computations we use to make to the edge of our applications. We can make asynchronous stuff using synchronous APIs without headaches. It makes me think of monads and the capability to isolate and compose what causes (side) effects with trivial code.

Isn't this pretty cool?!

Happy coding everyone! React has some beautiful days to come! 🚀
