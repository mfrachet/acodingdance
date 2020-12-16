---
title: "The N props syndrome"
date: 2020-09-08
slug: "/the-n-props-syndrome"
metaImage: ./react.png
metaKeywords: "react,react-native,frontend,javascript,props"
---

![Reactjs](./react.png)

If you have already worked on a codebase having components with a lot of `props`, you might have been victim of what I call **"The N props syndrome"**.

Let me explain what I mean by telling you the story of my main Open Source project.

Some years ago, I've released the first version of [rn-placeholder](https://github.com/mfrachet/rn-placeholder) that is a [react-native](https://reactnative.dev/) library aiming to provide UX friendly skeleton loaders as you may see in the Facebook mobile or Slack desktop applications:

![rn-placeholder example](./rn-placeholder.gif)

At that time, if you wanted to use the library, you had to include the following to your codebase:

```jsx
// The v1.0.0 README is available here: https://github.com/mfrachet/rn-placeholder/tree/v1.0.0
// There were some others components like Placeholder.Paragraph for example
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

I know that if a library trying to solve my problems is not easy nor practical, I won't use it and I will take something else that better fits my needs. This is the same as the _User Experience_ when dealing with a product - if the experience is not good enough, people will use another product.

A component with a lot of `props` scares me because it doesn't look easy to use: it seems to do a lot of things with a lot of different settings. I often see very interesting "business" oriented components (they solve complex and isolated problems) but they tend to lack UI customizations. **The platform I'm using aims to provide a visual representation of the business**. Since every product is different, I need to be able to customize the underlying **style of elements** according to my context.

For instance, I don't like this kind of component:

```jsx
<Input
  label="Firstname"
  value={firstName}
  onChange={/*...*/}
  labelStyle={{ color: "gray" }}
/>
```

because they prevent me from having control over the underlying `input` and `label` elements.

What if I have specific accessibility needs for the `input`? Or even for the `label`? I don't have control over them and **this is blocking to me**.

Also notice the `labelStyle` prop exposed: this is an interesting way of solving _some_ of the problems but **it prevents me** from using other tools like [styled-components](https://styled-components.com/).

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
- `animate` is hardcoded, can I customize it?
- Does `position` refer to the squares, or maybe the lines?

These are interesting questions. Some are simple enough to get answered in a github issue, but some other needs attention and potential modifications of the codebase and so, new releases.

### From a maintainer perspective

From a maintainer perspective, having many `props` on the same component means that the component implementation itself has to deal with all of that `props`.

Let's step back from the React ecosystem and think about more "conventional programming".

Functions with a lot of `arguments` often tend to have a lot of computational logic which makes them hard to read and to reason about. It's also a signal that, maybe, the function is doing too much and could be split up in smaller - more maintainable - chunks. This is about the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle): do one thing and do it well.

Looking at the previous statement, component `props` are like function `arguments`. The more you have, the more the implementation may become complex. And if the implementation gets more complex, then there are more places for bugs, implying more time trying to fix them and less time to focus on important things: solving real and interesting problems.

## What I could have done?

There are many roads to improve, but I will go through the one I've chosen to make the experience better. Remember that it's not a perfect solution but the one I chose.

I'm going to start by answering the consumer questions listed above and try to find ways to improve the API accordingly.

### What does the `size` refer to? The square? The line? The whole thing?

The API is not clear and the consumer doesn't know which element is affected by the `size` prop.

Also, this made me realize that a line and a media can have different sizes in the same placeholder and this is actually not possible to differentiate them.

We can imagine solving this issue by adding a `lineSize` and a `mediaSize` props but this will lead us to add another piece of complexity to the existing API that is already bloated enough.

Let's try to approach things differently:

```jsx
import { PlaceholderLine, PlaceholderMedia } from "rn-placeholder";

<>
  <PlaceholderLine width="10%" />
  <PlaceholderMedia radius="50%" width="32px" height="32px" />
</>;
```

With these modifications, we become explicit about sizes and their subjects. As a side effect, we are now able to customize both the line and the media independently: notice the `height` prop added to the `PlaceholderMedia` component but not to the `PlaceholderLine`.

### Prop `lineNumber` is `4` and the component exposes `lastLineWidth` and `firstLineWidth`. How can I modify the third line width or color?

The thing is that the `<Placeholder.ImageContent />` component owns a `lineNumber` prop but we have no way to style a line in particular.

A solution to that problem would be to leverage the new API we have defined and add an additional `color` prop to the `PlaceholderLine` and `PlaceholderMedia` components:

```jsx
import { PlaceholderLine } from "rn-placeholder";

<>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
  <PlaceholderMedia radius="50%" width="32px" height="32px" color="green" />
</>;
```

Using this new approach, we have total control over any of the lines of the placeholder.

### Prop `animate` is hardcoded, can I customize it?

The problem the consumer is facing is that with `<Placeholder.ImageContent />`, animations had to be part of the library's codebase - **this is a maintainer problem**.

If the consumer wants to add a new animation, they have to:

- clone the project
- create a new animation
- open a pull request
- wait for maintainers validations
- wait for a new version to get released
- use the new animation

This is cumbersome.

Instead, we could imagine a prop in which we would _inject_ a custom animation **from user-lands** that will run seem-less-ly as part of the placeholder.

And this is a very interesting idea because we're shifting the responsibility of creating animations **outside the library's codebase** meaning less problems for maintainers and higher customization potential for the consumer:

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

Historically, I added the prop to create harmony in terms of spacing between the elements on each sides of the "main" content to improve [the user experience in terms of rhythm](https://www.interaction-design.org/literature/article/repetition-pattern-and-rhythm).

Beside being confusing about its subject, the prop prevents us from having control over what kind of component we want to display on each side. What if I don't want to display `PlaceholderMedia` but `PlaceholderLine` on the right?

Let's iterate a last time on the API:

```jsx
import { Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";
import { MyCustomAnimation } from "./user-lands/MyCustomAnimaton";

<Placeholder
  Animation={MyCustomAnimation}
  Left={() => <PlaceholderMedia color="blue" />}
  Right={() => <PlaceholderMedia />}
>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
</Placeholder>;
```

## Summing up

After iterating thanks to the consumer's feedbacks, this is the API we end up with:

```jsx
import { Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";
import { MyCustomAnimation } from "./user-lands/MyCustomAnimaton";

<Placeholder
  Animation={MyCustomAnimation}
  Left={() => <PlaceholderMedia color="blue" />}
  Right={() => <PlaceholderMedia />}
>
  <PlaceholderLine width="10%" />
  <PlaceholderLine width="90%" color="red" />
  <PlaceholderLine width="30%" />
</Placeholder>;
```

Thanks to the refactoring, we split the `Placeholder.ImageContent` that had a lot of props and we:

- made a `PlaceholderLine` component with its own dedicated props
- made a `PlaceholderMedia` component with its own dedicated props
- made a `Placeholder` component representing the whole concept
- tweaked the `animate` prop to make it more powerful

Let's step back and talk about more "conventional programming" again and the situation of the library's codebase after the modifications.

What we did is reducing the amount of logic and complexity of a single and big component (`Placeholder.imageContent`) into smaller chunks. Instead of having a big file with a lot of **very specific** computational logic, we extracted code in other files, creating smaller units (`PlaceholderLine` and `PlaceholderMedia`) and **composed** them to create a complex placeholder.

Apart from answering the consumer's questions, we also have opened doors for the creation of new components like `PlaceholderTriangle` or anything else, both in the library **but also in user-lands**. The consumer is not forced to open a pull request nor to wait for a specific release to be able to use a new animation or a new component anymore - they can use their own **specific ones as part of their codebase**.

We can now say that the library is **closed for modifications** and **open for extensions**: we don't need to _modify_ the core codebase nor to create new releases to _improve_ the experience. The consumer is able to do it in user-lands while still benefiting from what the library exposes. This is about the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

## Last note

While I'm a strong believer on the smaller a component is, the easier it is to manage, **don't forget that writing code is always a matter of tradeoffs**. It's up to you and your team to take decisions on what is the best for you depending on your context.

Everything here are my personal thoughts and this post is not about providing a source of truth. It's about challenging the APIs that we write as often as we can. My main intent being to make people wondering **why they add another prop to a component** and to create connections to new ideas.

If you've just started working on a new project, I won't advice to deeply think about making "incredibly scalable components". Maybe focusing on having a representation of the business is what is important _right now_. If you see and feel patterns emerging, then it could be time to re-think and adjust your codebase - but I would suggest to take time, getting confidence about the business and then adjust.

---

This is a rewrite of my post ["A note on composing components" available on dev.to](https://dev.to/mfrachet/a-note-on-composing-components-with-react-5ee4) that is obsolete and not complete.
