---
path: composing-components
date: 2019-05-16T18:47:58.055Z
title: A note on composing components with React
tags:
  - react
  - javascript
---
We often hear about composition when talking about frontend frameworks. Composition is the ability to create complex UIs by assembling components in the less coupled manner as possible.


[Ryan Florence has made a video some years ago](https://www.youtube.com/watch?v=hEGg-3pIHlE) concerning compound components and the benefits of having well-defined and composable APIs.



<iframe width="100%" height="400" src="https://www.youtube.com/embed/hEGg-3pIHlE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



I'm a software developer and I make mistakes. Some years ago, I've released [rn-placeholder](https://github.com/mfrachet/rn-placeholder) using an API that was not extensible enough because of lack of composability.



In this blog post, I will drive you all the way long to learn and understand the impact of having a good composable API and avoid the mistakes I've made with the rn-placeholder library.



## Implementing using a naive approach

Let's take the example of the [Material Design Cards](https://material.io/design/components/cards.html). A "Card" in the Material Design specification is a way to present heterogeneous content using a homogeneous UI representation.

![A card definition from the Material Design Card specification](/assets/mio-design_assets_1ezntdj8h1j0bfkbl23lyzewjjvmzy_uv_cards-elements-2b.png "A card definition from the Material Design Card specification")

As with a naive approach, here's the way I would have defined my API at first:

```jsx
<Card
  avatar="https://some/path.jpg"
  title="My title"
  subtitle="My subtitle"
  image="https://some-other/path.jpg"
  description="Super funky description"
  actionOne={() => console.log('Do job')}
  actionSecond={() => console.log('Do another job')}
  actionLike={() => console.log('Do action like')}
  actionLove={() => console.log('Do action love')}
/>
```

And to be honest, the previous code snippet is a valid code and it can work in real world applications.

The problem comes when you start customizing the Card to handle its variations. As I mentioned above, Card in the Material Design specification is a way to represent heterogeneous information using some homogeneous styles.

Let's imagine that we want to modify the actual card component to look like:

![Another Material Card from their website](/assets/mio-design_assets_0b6xusjjsulxcutqtcvl0wurpww8_cards-dividers-2.png "Another Material Card from their website")

Keeping the actual naive approach, let's imagine that we have modified the card component to achieve this:

```jsx
<Card
  avatar="https://some/path.jpg"
  title="My title"
  subtitle="My subtitle"
  image="https://some-other/path.jpg"
  description="Super funky description"
  //actionOne={() => console.log('Do job')}
  //actionSecond={() => console.log('Do another job')}
  //actionLike={() => console.log('Do action like')}
  //actionLove={() => console.log('Do action love')}
  // new implementation
  footerTitle="Footer title"
  footerSchedules={['5pm', '7am', '2pm']}
  footerAction={() => console.log('Do footer stuff')}
/>
```

As you've probably noticed, each time we want our card to have a different look, we modify its implementation. Now imagine yourself as an owner or maintainer of such a library. Each time people want to have a different organisation on the Card, you are supposed to modify your component, publish it to npm and manage the versions.

It's a lot of work.

## What are we doing wrong?

Here's the problem. For now, we are simply modifying the component we built in a vertical way: by adding a lot of new props on the component, and making a lot of conditional comparisons to determine the look and feel of the card.

There's another problem. Material Design Cards are not defined specifically. I mean, it's not supposed to provide a way to create a `PrimaryCard`, `TinyCard` and so forth. With the Material Design Card specs, you're supposed to be able to create a lots of different types of Cards without that much pain.

What we have done until now actually breaks a part of the [Opened Closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle). This principle tells that a piece of code should be closed to modifications and opened to extensions (aka inheritance or composition).

The idea is to avoid creating one single "thing" with a lot of complex things inside, but separate the concerns by creating multiple entities.

## Material design cards using composition

We have more of experience dealing with React components and we know what we are doing is not sufficiently good for now. It's okay, and we'll see how we can improve the Card component API using the composable nature of React.

First, it's worth noticing that a piece of UI doesn't necessarily means one component. It's not always a one for one matching. I invite you to read [Brad Frost Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) if you want more information about building complex UIs in a more abstract way.

_The design we're going to implement isn't probably the best one but it gives a good idea of the benefits of composition in React._

I've splitted the Card component in a composable manner so we won't have to modify its implementation if we want to create new piece of UI:

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

This is a way to leverage composability to avoid complex and unmaintainable components in React.

In the future, if you have some components that start to grow, here are my "tricks" or at least the code smells (it's opinionated and depends on the use-cases) that indicates I have to split my component on something a bit more composable:

* If a component has more than 5-6 props
* If a component contains more than 100 lines of code
* Can I extract this component and reuse it in another app?
* Do I have to tweak (or can I tweak) the props of the underlying components? (See this issue for more details [rn-placeholder#38](https://github.com/mfrachet/rn-placeholder/issues/38))
* Can I move the underlying component somewhere else in the parent component (top or bottom)? 

But be careful! You have to find the right balance between something fully composable and easy to use. Remember that abstracting is not always a good thing.



If you find yourself writing tons of lines to create a component you know you'll use only one time, it's probably not necessary to find a good abstraction. However if it's a component that will leave in multiple places and that can probably move in terms of shape, you maybe have to think twice while implementing.



And don't forget with the new composable API, we can create a component that just looks like the old one!



Happy coding :blush: :tada: !
