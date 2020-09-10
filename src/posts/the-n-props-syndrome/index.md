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

### From a customer perspective

People are using tools because they solve a problem but also because they are easy to use. I have strong feelings that if a library is not easy to use when trying to solve simple problems, the customer will likely find something else. This is the same as the User Experience when building a product.

According to the previous API, a customer might end up having a lot of questions that can frustrate them.

- What does the `size` refer to? The square? The line? The whole thing?
- `animate` looks hardcoded, should I upgrade the library every time a new animation comes out?
- `lineNumber` is `4`, but how can I modify the third line width?
- I think `position` refers to the squares, but what if I want circles?
