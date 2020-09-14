---
title: "The N props syndrome"
date: 2020-09-08
slug: "/the-n-props-syndrome"
---

_These are my personal thoughts on the topic, not a rule of thumb and remember that taking decisions always depends on context._

If you have already worked on a codebase having components with a lot of `props`, you might have been victim of what I call **"The N props syndrome"**.

Let me explain what I mean by telling you the story of my main Open Source project.

Some years ago, I've released the first version of [rn-placeholder](https://github.com/mfrachet/rn-placeholder) that is a [react-native](https://reactnative.dev/) library aiming to provide UX friendly skeleton loaders as you may have seen in the Facebook mobile application or Slack desktop:

![rn-placeholder example](./rn-placeholder.gif)

At that time, if you wanted to use the library, you had to include the following to your codebase (all the `props` are listed):

```jsx
// The v1.0.0 README is available here: https://github.com/mfrachet/rn-placeholder/tree/v1.0.0
// There were some others components like Placeholder.Paragraph for example
// The following is the most complete one (at that time) in term of experience
<Placeholder.ImageContent
  size={60}
  animate="fade"
  lineNumber={3}
  lineSpacing={12}
  firstLineWidth="80%"
  lastLineWidth="30%"
  onReady={this.state.isReady}
  position="both"
>
  <Text>Loading has finished :D</Text>
</Placeholder.ImageContent>
```

## Why I do think this is not a good API?

### From a consumer perspective

As a developer, I'm using other people tools because they solve problem that I don't want to deal with directly.

I know that if a library trying to solve my problems is not easy nor practical, I won't use it and I will use something else that better fits my needs. This is the same as the _User Experience_ when dealing with a product - if the experience is not good enough, people will use another product.

A component with a lot of `props` scares me because it doesn't look easy to use: it seems to do a lot of things with a lot of different settings. I often see very interesting "business" oriented components (they solve complex and isolated problems) but they tend to lack UI customizations. The platform I'm using aims to provide a visual representation of a product. Since every product is different, I need to be able to customize the underlying styles of elements.

For instance, I don't like components like:

```jsx
<Input
  label="Firstname"
  value={firstName}
  onChange={/*...*/}
  labelStyle={{ color: "gray" }}
/>
```

because they prevent me from having control over the underlying `input` and `label` elements.

What if I have specific accessibility needs for the `input`? Or even for the `label`? I don't have control over them: this is blocking.

Also notice the `labelStyle` prop exposed: this an interesting way of solving _some_ of the problems but it prevents me from using other tools like [styled-components](https://styled-components.com/).

Getting back to the rn-placeholder story, let's take some time to analyze the API:

```jsx
<Placeholder.ImageContent
  size={60}
  animate="fade"
  lineNumber={3}
  lineSpacing={12}
  firstLineWidth="80%"
  lastLineWidth="30%"
  onReady={this.state.isReady}
  position="both"
>
  <Text>Loading has finished :D</Text>
</Placeholder.ImageContent>
```

As a consumer, I have some questions:

- What does the `size` refer to? The square? The line? The whole thing?
- `lineNumber` is `4` and the component exposes `lastLineWidth` and `firstLineWidth`. How can I modify the third line width or color?
- `animate` is hardcoded, can we customize it?
- Does `position` refer to the squares, or maybe the lines?

These are all interesting questions. Some are simple enough to get answered in a github issue, but some other needs attention and potentially modifications of the codebase and so, new releases.

### From a maintainer perspective

From a maintainer perspective, having many `props` on the same component means that the component implementation itself has to deal with all of that `props`.

Let's step back from the React ecosystem and think about more "conventional programming".

Functions with a lot of `arguments` often tend to have a lot of computational logic inside which makes them hard to read and to reason about. It's also a signal that, maybe, the function is doing too much and could potentially be split up in smaller - more maintainable - chunks. This is about the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle): do one thing and do it well.

Looking at the previous statement, component `props` are like function `arguments`. The more you have, the more the implementation may become complex. And if the implementation gets more complex, then there are more places for bugs, implying more time trying to fix them and less time to focus on important things: solving real and interesting problems.

## What I could have done?

There are many roads to improve, but I will go through the one I've chosen to make the experience better. Remember that it's not a perfect solution but the one I chose.

I'm going to answer the consumer questions listed above and try to find ways to improve the API according to them.

### What does the `size` refer to? The square? The line? The whole thing?

The API is not clear and the consumer doesn't know which element is concerned by the `size` prop. Also, this leads me to think that a size can be applied on both a line and a shape with different values. Right now, we only provide a vague `size` thing.

We can quickly imagine solving this issue by adding a `lineSize` and a `shapeSize` props but this will lead us to add another piece of complexity to the existing API and I think that it already bloated enough.

Let's try to think of a different way to write it that could solve these problems:

```jsx
import { PlaceholderLine, PlaceholderMedia } from "rn-placeholder";

<>
  <PlaceholderLine width="10%" />
  <PlaceholderMedia radius="50%" width="32px" height="32px" />
</>;
```

With this, we become explicit about sizes and their subjects. As a side effect, we can even become more explicit about the `PlaceholderMedia` sizes and give it an extra `height` prop.

### Prop `lineNumber` is `4` and the component exposes `lastLineWidth` and `firstLineWidth`. How can I modify the third line width or color?

I'm feeling that this problem is less about clarity and more about customization. The real trouble is that the `<Placeholder.ImageContent />` component owns a `lineNumber` prop and we don't have control over every each of the lines - independently.

Something great is that we can leverage the new API we have defined and add an additional `color` prop to the `PlaceholderLine` and `PlaceholderMedia` components:

```jsx
import { PlaceholderLine } from "rn-placeholder";

<>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
  <PlaceholderMedia radius="50%" width="32px" height="32px" color="green" />
</>;
```

Using this new approach, we are explicit about how many lines we want but we are also in a world where customization can be applied at the line or shape level, not only at the top level of the placeholder.

### Prop `animate` is hardcoded, can we customize it?

The real problem the consumer is facing is that with the older API, animations had to be part of the library's codebase - **this is a maintainer problem**.

If the consumer wants to add a new animation, they have to clone the project, create a new animation, open a pull request, wait for maintainers validations, wait for a new version to get released and then be able to use the new animation. This is cumbersome.

Instead of that, we can imagine a prop where we can _inject_ a custom animation **from user-lands** that will run seem-less-ly as part of the placeholder. And this is a very interesting idea because we're shifting the responsibility of creating animations **outside** the codebase meaning less problems for the maintainers and higher customization potential for the consumer:

```jsx
import { Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";
import { MyCustomAnimation } from "./user-lands/MyCustomAnimaton";

<Placeholder Animation={MyCustomAnimation}>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
  <PlaceholderMedia radius="50%" width="32px" height="32px" color="red" />
</Placeholder>;
```

### Does `position` refer to the squares, or maybe the lines?

Historically, I added the prop to create harmony in terms of spacing between the elements on each sides and the "main" placeholder content to improve [the user experience in terms of rhythm](https://www.interaction-design.org/literature/article/repetition-pattern-and-rhythm).

At some points, I found this annoying to only be able to only on a string `left`, `right` or `both`. The idea behind this looked interesting but the customization capability were bloated and not very expressive: is this about the shapes or about the lines positions?

Let's imagine something more explicit for the consumer:

```jsx
import { Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";
import { MyCustomAnimation } from "./user-lands/MyCustomAnimaton";

<Placeholder
  Animation={FaMyCustomAnimationde}
  Left={() => <PlaceholderMedia color="blue" />}
  Right={() => <PlaceholderMedia />}
>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
</Placeholder>;
```

## Summing up

After answering the different customer questions, This is the new API that we have and this is the one you can use in your codebase if you use [rn-placeholder](https://github.com/mfrachet/rn-placeholder):

```jsx
import { Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";
import { MyCustomAnimation } from "./user-lands/MyCustomAnimaton";

<Placeholder
  Animation={FaMyCustomAnimationde}
  Left={() => <PlaceholderMedia color="blue" />}
  Right={() => <PlaceholderMedia />}
>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
</Placeholder>;
```

We have split the `Placeholder.ImageContent` with a lot of props and we:

- made a `PlaceholderLine` component with its own dedicated props
- made a `PlaceholderMedia` component with its own dedicated props
- made a `Placeholder` component representing the whole concept
- tweaked the `animate` prop to make it more powerful

Let's step back and talk back again about more "conventional programming" and the situation of the library's codebase.

What we did is reducing the amount of logic and complexity of a single and big component (`Placeholder.imageContent`) into smaller chunks. Instead of having a big file with a lot of **very specific** computational logic, we extracted code in other files, creating smaller units (`PlaceholderLine` and `PlaceholderMedia`) and **composed** them to create a complex placeholder.

Apart from answering the questions of the consumer, we also have opened doors for the creation of new components like `PlaceholderTriangle` or anything else, both in the library **but also in user lands**. The consumer is not forced to open a pull request or to wait for a specific release to be able to use a new animation or a new component anymore - they can their **specific** ones as part of their codebase.

With the previous statement, we can say that the library is **closed to modifications** and **open for extension**: we don't need to modify the "core" codebase nor to create new releases. The user is able to do it in user-lands while still benefiting from what the library exposes. This is about the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

I have feelings that **composition** is one way to align with the Open-Closed principle and that it works both for UI paradigms and for more conventional programming.

## Last note on this

While I'm a strong believer on the smaller the component is, the easier it is to manage, remember that what we code is always a matter of tradeoffs that we can or that we want to do. This is not a golden rule and we should challenge APIs every time that we can. My main intent with this article is to make people wonder **why** they add props to components.

For example, if you've just started working on a new application, it's probably not the time to think about making "incredibly scalable components". Maybe focusing on having representation of the business is what is important. If you see and feel pattern emerging, they it's maybe time to re-think and adjust the codebase.ve shared in this post.

---

This is a rewrite of my post ["A note on composing components" available on dev.to](https://dev.to/mfrachet/a-note-on-composing-components-with-react-5ee4) that is obsolete and not complete.
