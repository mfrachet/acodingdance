---
path: scaling-react-app
date: 2019-05-16T04:00:00.000Z
title: My approach to scale React apps
tags:
  - react
  - javascript
---
I'm working in the software industry since 2013 and have worked on different types of codebase. From 10 users apps to 10 millions, I've faced a lot of different ways to approach frontend software development and here's the approach I prefer around all of the ones I've used.

_It's an opinionated post and it doesn't mean this project structure will work everywhere._

## UI Components

I really like simple things. And that's what I want my development to be: a way to assemble little things to create bigger ones. I've discovered the Atomic Design from [Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/) some times ago and can't stick out of it.

At a tool level, I like to rely on [lerna](https://github.com/lerna/lerna) + [storybook](https://storybook.js.org/).

I'm using lerna to define my UI components in their own packages inside a mono-repo so that all of the UI code lives in one place. It allows components to be dependencies between them to create more complex components.

It also enables components to be published as a node package, for a reusability purpose.

Lerna is a great tool because it helps managing the dependency versions using a single command line.

I like to put these components inside their own independent packages because it isolates them in term of behavior and in term of goals. If the components were living in the same codebase as the app, their APIs can be altered in a business oriented manner and will lead to potential code duplication.

How many times have I define a `Button` component because its API has moved in a way that didn't work for me?

### UI components and state management

I've often heard that it's bad to use component state in an application using [redux](https://redux.js.org/), [xState](https://github.com/davidkpiano/xstate) or [mobx](https://github.com/mobxjs/mobx). Just like if it was a bad thing to only have one single location where the state should leave.

In my opinion, state that is not persistent or that only relies on UI elements should stand in the concerned components.

Let's take the example of some UI libs. You don't want to manage any kind of state that UI lib needs to work. What you want is to simply use this library.
We can use this idea to create reusable UI components that manage their own internal state so that the other developers don't have to care about it.

### Composing components

Another thing that goes against scaling in my opinion is the lack of composition in a component API. If you want to see how it can impact the way you code your components, I suggest you take some time to read the talk of [Ryan Florence concerning compount components](https://www.youtube.com/watch?v=hEGg-3pIHlE).

```jsx
export const Tabs = ({ items }) => items.map(item => <div>{item}</div>)
```

This is the approach I've taken while refactoring my [rn-placeholder](https://github.com/mfrachet/rn-placeholder) library.
