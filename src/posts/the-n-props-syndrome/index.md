---
title: "The N props syndrome"
date: 2020-09-08
slug: "/the-n-props-syndrome"
---

_This is a rewrite of my post ["A note on composing components" available on dev.to](https://dev.to/mfrachet/a-note-on-composing-components-with-react-5ee4) that is obsolete and not complete._

If you have already worked on a codebase having components with a lot of `props`, you might have been victim of what I call **"The N props syndrome"**.

Let me explain what I mean by telling you the story of my main Open Source project.

Some years ago, I've released the first version of [rn-placeholder](https://github.com/mfrachet/rn-placeholder) that is a [react-native](https://reactnative.dev/) library aiming to provide UX friendly skeleton loaders as you may have seen in the Facebook mobile application or Slack desktop:

![rn-placeholder example](./rn-placeholder.gif)

At that time, if you wanted to use the library, you had to include the following to your codebase (all the `props` are listed):

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

### From a consumer perspective

As a developer, I'm using other people tools because I have problems that need to be solved and that I don't want to solve by myself.

I know that if a library that tries to solve my problems is not easy or not practical enough, I won't use it and try to find something else that better fits my needs. This is the same as the User Experience when building a product - if the experience is not good enough, people will use another product.

A component with a lot of `props` scares me in the sense that it doesn't look easy to use but also because I'm feeling that it is trying to expose _some_ customization capabilities - with restrictions. We are limited by what the API is offering and that's all. For example, I don't really like components looking like:

```jsx
<Input
  label="Firstname"
  value={firstName}
  onChange={/*...*/}
  labelStyle={{ color: "gray" }}
/>
```

Since I don't have a total control over the form `label`. How am I supposed to add additional props?

Getting back to the rn-placeholder story, let's analyze its API with a fresh eye. As a consumer of the API, I have multiple questions coming to mind:

- What does the `size` refer to? The square? The line? The whole thing?
- `lineNumber` is `4` and the component exposes `lastLineWidth` and `firstLineWidth`. How can I modify the third line width or color?
- `animate` looks hardcoded, how can I customize? should I upgrade the library every time a new animation comes out?

- I think `position` refers to the squares, or maybe the lines? I don't know

These are all pertinent questions. Some are simple enough to get answered in a github issue, but some other needs attention and potentially modifications of the codebase and so, new releases.

### From a maintainer perspective

From a maintainer perspective, having many `props` on the same component means that the component implementation itself has to deal with all of that `props`.

Let's step back from the React ecosystem and think about more "conventional programming". Functions with a lot of `arguments` often tend to have a lot of computational logic inside which makes them hard to read and to reason about. It's also a signal that, maybe, the function is doing too much and could potentially be split up in smaller - more maintainable - chunks.

Looking at the previous statement, component `props` are like function `arguments`. The more you have, the more the implementation may become complex.

And if the implementation gets more complex, then there are more places for bugs, implying more time trying to fix them and less time to focus on important things: solving real and interesting problems.

## What I could have done?

There are many roads to improve and grow, but I will go through the one I've chosen to make the experience at least a bit better. Remember that it's not a perfect solution but the one I chose.

I'm going to answer the consumer questions listed above and try to find ways to improve the API according to them.

### What does the `size` refer to? The square? The line? The whole thing?

The API is not clear and the consumer doesn't really know on which element the size would be applied on. Also, we can imagine that there are differences between setting a size on a line and setting a size on a shape component. Let's try to write an API that could solve this specific problem:

```jsx
<>
  <PlaceholderLine width="10%" />
  <PlaceholderMedia radius="50%" width="32px" height="32px" />
</>
```

With these APIs, we are explicit about which sizes we are talking about and on which elements they are applied. It provides clarity but also new perspectives concerning customizing the different placeholders.

### Prop `lineNumber` is `4` and the component exposes `lastLineWidth` and `firstLineWidth`. How can I modify the third line width or color?

I'm feeling that this problem is less about clarity and more about cutomization. What is really great is that we can leverage the previously defined APIs, adding a bunch of `PlaceholderLine` and add an additional `color` prop to the components to make them fully customizable:

```jsx
<>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
</>
```

The problem we had before was that the `<Placeholder.ImageContent />` component was having a prop `lineNumber` but we didn't have control over every lines.

Using this new approach, we are explicit about how many lines we want but we are also in a world where customization can be applied at the line level, not only at the top level of the placeholder.

### The `animate` prop looks hardcoded, how can I customize? should I upgrade the library every time a new animation comes out?

Animation in this library is something very important, this is what provides a good UI and good impressions to the end user.

The problem that the consumer is having is that with the older API, the animation had to be part of the library's codebase. If you want to add a new animation, you have to clone the project, create the new animation, open a pull request, wait for maintainers validations, wait for a new version to get released and then you are able to use the new animation. This can take quite some times.

Instead of that, what if we could provide a way to create custom animation and to inject them directly as a prop of the Placeholder?

```jsx
<Placeholder Animation={MyCustomAnimation}>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
  <PlaceholderMedia radius="50%" width="32px" height="32px" color="red" />
</Placeholder>
```

Using this new API, the user is able to provide a custom animation that will act on all the placeholders without waiting for a new release to show off.

### I think `position` refers to the squares, or maybe the lines? I don't know

Historically, I wanted the prop to get some harmony in terms of spacing between the elements on each side and the "main" placeholder content.

But what I find annoying with that is that we don't now if it's the lines that should be positioned or if it's the shape. Let's get more explicit about what should be positioned on the right side or the left side:

```jsx
<Placeholder
  Animation={Fade}
  Left={() => <PlaceholderMedia color="blue" />}
  Right={() => <PlaceholderMedia />}
>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
</Placeholder>
```

This new API is known to be "more composable" than the old one. The old one acts as a standalone block, it was hard to customize it because we only have access to one set of `props` at one level only.

Taking benefit from composition, we can spread the responsibility at different levels where each component has its own API and is responsible for one thing only. Combining all together creates a better experience for the consumer that can basically do whatever it needs but also for the maintainer since everything is in its tiny box with clear responsibilities.

## Last note on this

While I'm a strong believer on the smaller the component is, the easier it is to manage, I think that this approach fits very well for highly composable components like the one we like to use with UI components libraries.

If you work on business oriented components, I think it's important to focus the API on business oriented things.

For example, if you create a new live streaming service, I think it's important to make sure that your `<LiveStream />` component owns the necessary business information (aka: the date, the stream URL, a title, maybe a description, the author etc...) as `props` to fill the actual need.

This `<LiveStream />` can be written with highly composable components and leverage the things I've shared in this post.
