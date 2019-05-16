---
path: composing-components
date: 2019-05-16T18:47:58.055Z
title: A note on composing components with React
tags: []
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
