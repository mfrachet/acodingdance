---
title: "The N props syndrome"
date: 2020-09-08
slug: "/the-n-props-syndrome"
---

If you are working or if you have worked on a codebase having components with a lot of props, you might have been victim of what I call **"The N props syndrome"**.

Let's me explain what I mean there by telling you the story of my main OSS project.

Some years ago, I've released [rn-placeholder](https://github.com/mfrachet/rn-placeholder) that is a react-native library aiming to provide some UX friendly skeleton loader like facebook or slack are doing in their mobile applications:

![rn-placeholder example](./rn-placeholder.gif)

At that time, if you wanted to use the library, you would have to include the following to your codebase (this is the most complete way to render this component using all of its props):

```jsx
// The v1.0.0 README is available here: https://github.com/mfrachet/rn-placeholder/tree/v1.0.0
<Placeholder.ImageContent
  size={60}
  animate="fade"
  lineNumber={4}
  lineSpacing={5}
  lastLineWidth="30%"
  onReady={this.state.isReady}
  position="both"
>
  <Text>Placeholder has finished :D</Text>
</Placeholder.ImageContent>
```

## Why I do think this is not a good API?

The first thing that I have in mind is about the consumer experience. I'm feeling that if the consumer is wondering what things actually are, they may not end up having a good experience with the tool.

Here are some question that I could have as a developer that wants to use the library:

- What does the `size` refer to? The square? The line? The whole thing?
- `animate` looks hardcoded, should I upgrade the library every time a new animation comes out?
- `lineNumber` is `4`, but how can I modify the third line width?
- I think `position` refers to the squares, but what if I want circles?
