---
path: composing-components
date: 2019-05-16T18:47:58.055Z
title: A note on composing components with React
tags:
  - react
  - javascript
---
We often hear about composition when talking about frontend frameworks. Composition is the ability to create complex UIs by assembling component in as less uncoupled manner as possible.

[Ryan Florence has made a video some years ago](https://www.youtube.com/watch?v=hEGg-3pIHlE) concerning compound components and the benefits of having well defined and composable APIs.

Let's take the example of the [Material Design Cards](https://material.io/design/components/cards.html). A "Card" in the Material Design language is a way to present heterogeneous content using a UI representation that looks quite the same.

![A card definition from the Google Material Design Card specification](/assets/mio-design_assets_1ezntdj8h1j0bfkbl23lyzewjjvmzy_uv_cards-elements-2b.png "A card definition from the Google Material Design Card specification")

## Implementing using a naive approach

I'm a software developer and I make  mistakes, like every days. And some years ago, I've released [rn-placeholder](https://github.com/mfrachet/rn-placeholder) using an API that was not extensible because of lack of composability.

As a naive developer, here's the way I would defined my API at first:

```jsx
<Card
  avatar="https://some/path.jpg"
  title="My title"
  subtitle="My subtitle"
  image="https://some-other/path.jpg"
  description="Super funky description"
  actionOne={() => alert('Do job')}
  actionSecond={() => alert('Do another job')}
  actionLike={() => alert('Do action like')}
  actionLove={() => alert('Do action love')}
/>
```

And to be honest, it would have work in this case.

The problems comes when you start to customise the Card to handle its variations. Because as mentioned, Card in the material design language is a way to represent heterogeneous information using some homogeneous styles.

Let's now that we want to modify the actual card component to give it the possibilities to look like:

![Another google material card from their website](/assets/mio-design_assets_0b6xusjjsulxcutqtcvl0wurpww8_cards-dividers-2.png "Another google material card from their website")

Keeping the actual naive approach, let's imagine that we have modified the card component to achieve this:

```jsx
<Card
  avatar="https://some/path.jpg"
  title="My title"
  subtitle="My subtitle"
  image="https://some-other/path.jpg"
  description="Super funky description"
  //actionOne={() => alert('Do job')}
  //actionSecond={() => alert('Do another job')}
  //actionLike={() => alert('Do action like')}
  //actionLove={() => alert('Do action love')}
  // new implementation
  footerTitle="Footer title"
  footerSchedules={['5pm', '7am', '2pm']}
  footerAction={() => alert('Do footer stuff')}
/>
```

So as you've probably mentioned, each time we want our card to have a different look, we modify its implementation. Now let's imagine that you are the owner and maintainer of such a library. Each time people want to have a different organisation on the Card, you are supposed to modify your component, publish it to npm and manage the versions.

It's a lot of work.

## What are we doing wrong?

So here's the problem. For now, we are simply modifying the component we built in a vertical way: by adding a lots of new props on the component, and making a lot of conditional comparisons to determine the look of the card.

There's another problem. Material Design Cards are not defined specifically. I mean, it's not supposed to provide a way to create a `PrimaryCard`, `TinyCard` and so forth. With the Material Design Card specs, you're supposed to be able to create a lots of different types of Cards without that much pain.

What we have done until now actually breaks a part of the [Opened Close principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle). This principle explains that a code should be closed to modifications and opened to extensions (aka inheritance or composition).

The idea is to avoid creating one single "thing" with a lot of complexe things inside, and to separate the concerns by creating multiple files.

## Material design cards using composition

We have now a bit more of experience dealing with React component and we know that what we are doing is not sufficiently good for now. It's okay, and we'll see how we can improve using the composable nature of React.

First, let's point that a piece of UI doesn't necessarily means one component. It's not always a one for one matching. I invite you reading [Brad Frost Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) if you want more information on of to build complex UIs in a more abstract way.

_The design we're going to implement is probably the best one but it gives a good idea of the impact of composition in React._

Let's try to split the Card component in a composable manner so that we don't have to modify its implementation when we want to create new piece of UI:

```jsx
<Card>
  <CardHeader title="My title" subtitle="subtitle" avatar={pathToImage} />
  <CardMedia source={pathToImage} />
  <CardContent>Some content with descriptions</CardContent>
  <CardActions>
    <IconButton name="favorite" onClick={handleFav} />
    <IconButton name="star" onClick={handleStar} />
  </CardActions>
</Card>
```

Using this approach, we're able to build any type of cards:



![Multiple material cards](/assets/cards003.png "Multiple material cards")



## The smell I rely on

So this is a way to rely on composability to avoid getting complicated and unmaintainable components in React.



In the future, if you have some components that start to grow, here are my "tricks" or at least the code smells (it's opinionated and depends on the cases) that indicates that I have to split my component on something a bit more composable:

* \- If a component has more than 5-6 props
* \- If a component is more than 100 LoC
* \- Can I extract this component in isolation to play in another app?
* \- Have I to tweak (or can I tweak) the props of the underlying components? (See this issue for more details [rn-placeholder#38](https://github.com/mfrachet/rn-placeholder/issues/38))
* \- Is it easy to move an underlying component somewhere else? 



But be careful! You have to find a balance between something fully composable but also easy to use. Remember that abstracting is not always a good thing.
