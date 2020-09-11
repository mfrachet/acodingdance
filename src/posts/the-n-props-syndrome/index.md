---
title: "The N props syndrome"
date: 2020-09-08
slug: "/the-n-props-syndrome"
---

_This is a rewrite of my post ["A note on composing components" available on dev.to](https://dev.to/mfrachet/a-note-on-composing-components-with-react-5ee4) that is obsolete and not complete._

If you have already worked on a codebase having components with a lot of `props`, you might have been victim of what I call **"The N props syndrome"**.

Let me explain what I mean there by telling you the story of my main Open Source project.

Some years ago, I've released the first version of [rn-placeholder](https://github.com/mfrachet/rn-placeholder) that is a [react-native](https://reactnative.dev/) library aiming to provide UX friendly skeleton loaders as you may have already seen in the Facebook mobile application or Slack desktop:

![rn-placeholder example](./rn-placeholder.gif)

At that time, if you wanted to use the library, you had to include the following to your codebase (all the props are listed):

```jsx
// The v1.0.0 README is available here: https://github.com/mfrachet/rn-placeholder/tree/v1.0.0
<Placeholder.ImageContent
  size={60}
  animate="fade"
  lineNumber={4}
  lineSpacing={5}
  firstLineWidth="20%"
  lastLineWidth="30%"
  onReady={this.state.isReady}
  position="both"
>
  <Text>Placeholder has finished :D</Text>
</Placeholder.ImageContent>
```

## Why I do think this is not a good API?

### From a customer perspective

As a developer (and a customer in this situation), I'm using other people tools because I have problems that need to be solved and that I don't want to solve them by myself.

And I know that if a library that tries to solve my problems is not easy or not practical enough, I won't use it and try to find something else that better fits my need. This is the same as the User Experience when building a product - if the experience is not good enough, people will use another product.

Looking at the API with a fresh eye, I have multiple questions coming to mind:

- What does the `size` refer to? The square? The line? The whole thing?
- `animate` looks hardcoded, how can I customize? should I upgrade the library every time a new animation comes out?
- `lineNumber` is `4` and the components exposes `lastLineWidth` and `firstLineWidth`. How can I modify the third line width or color?
- I think `position` refers to the squares, but what if I want a circle and a square?

These are all valid questions, some are simples and can be answered in a github issue, but some other needs attention and maybe a new release with some fixes inside. There are rooms for improvements.

### From a maintainer perspective

From a maintainer perspective, having many `props` on the same component means that the component implementation itself has to deal with all of them.

And if you step back from the React ecosystem, thinking about more "conventional programming": having functions with a lot of `arguments` often tend to have a lot of computational logic inside which makes them hard to read and to reason about. It's also a signal that, maybe, the function is doing too much and should potentially be split in smaller chunks.

If we look at the previous statement, a component `props` is like a function `arguments`: the more you have, the more the implementation may become complex.

If the implementation is complex, then there are places for bugs implying more time trying to fix them and less time to focus on important things: solving customers problems.

## What I could have done?

There are many roads that I could have taken, but I will go through the one I've chosen to improve the experience. Remember that it's not a perfect things and that still needs some love, but I'm happy with the direction taken.

So let's start with the question the customer may have.

### What does the `size` refer to? The square? The line? The whole thing?

What is the real need behind this question? The way I understand this is that the customer wants to make the lines and shapes customizable, being able to decide the line width or heights or even the shape radius etc...

## Last note on this

While I'm a strong believer on the smaller the component is, the easier it is to manage, I think that this approach fits very well for highly composable components like the one we like to use with UI components libraries.

If you work on business oriented components, I think it's important to focus the API on business oriented things.

For example, if you create a new live streaming service, I think it's important to make sure that your `<LiveStream />` component owns the necessary business information (aka: the date, the stream URL, a title, maybe a description, the author etc...) as props to fill the actual need.

This `<LiveStream />` can be written with highly composable components and leverage the things I've shared in this post.
