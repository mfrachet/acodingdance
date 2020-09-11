---
title: "The N props syndrome"
date: 2020-09-08
slug: "/the-n-props-syndrome"
---

_This is a rewrite of my post ["A note on composing components" available on dev.to](https://dev.to/mfrachet/a-note-on-composing-components-with-react-5ee4) that is obsolete and not complete._

If you are working or if you have worked on a codebase having components with a lot of props, you might have been victim of what I call **"The N props syndrome"**.

Let me explain what I mean there by telling you the story of my main Open Source project.

Some years ago, I've released the first version of [rn-placeholder](https://github.com/mfrachet/rn-placeholder) that is a [react-native](https://reactnative.dev/) library aiming to provide UX friendly skeleton loaders as you may have already seen in the Facebook mobile application or Slack desktop:

![rn-placeholder example](./rn-placeholder.gif)

At that time, if you wanted to use the library, you would have to include the following to your codebase (all the props are listed):

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

As a developer (and a customer in this situation), I'm using other people tools because I have problems that need to be solved and I don't want to solve them by myself.

And I know that if a library that tries to solve my problems is not easy or not practical enough, I won't use it and try to find something else that better fits my need. This is the same as the User Experience when building a product - if the experience is not good enough, people will use another product.

Looking at the API with a fresh eye, I have multiple questions coming to mind:

- What does the `size` refer to? The square? The line? The whole thing?
- `animate` looks hardcoded, how can I customize? should I upgrade the library every time a new animation comes out?
- `lineNumber` is `4` and the components exposes `lastLineWidth` and `firstLineWidth`. How can I modify the third line width or color?
- I think `position` refers to the squares, but what if I want a circle and a square?

### From a maintainer perspective

\$

## What I could have done?
