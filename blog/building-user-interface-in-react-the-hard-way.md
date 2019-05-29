---
path: compound-component-implicit-state
date: 2019-05-27T16:18:47.583Z
title: 'Don''t fear the context, compound components and implicit state'
tags:
  - react
  - javascript
---
Building reusable UI components is hard. I'm always banging my head around three times before writing a component that I want to be reusable. It's kind of a game to find the good abstraction and the good way to build them.

In [A note on composing components with React](https://acodingdance.io/a-note-on-composing-components-with-react/), I've briefly talked about my conception of composition by taking as example the [Google Material Design Cards](https://material.io/design/components/cards.html) and how I would have implemented such a thing. Feel free to take a look if you're interested ☺️.

Today, I wanted to share with you my experience while implementing a UI component library based on a design system and how my team and I have managed to build a _bit more complex components_.

So let's talk about components that _share something_.

## Radio _buttons_

I'm going to take the example of radio buttons and this for two reasons.

The first one is that I'm building the UI component library with React Native and that it doesn't provide a built-in Radio component. 

And the second one is because radio buttons are kind of "special". 

By definition, it's as a group of selectable elements where only one element can be selected at a time. [Here's a quick link to the MDN definition of **radio** and **radio groups**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio).

It means that if we want to build a `<Radio />` component, it has to share some information with some other `Radio` "friends".

## Handling the shared behaviours

To handle this kind of shared behaviour, we can rely on different approaches.

We can for example define a state in the parent and handle each child selection from that parent or we can rely on a global state management that will store the actually selected value.

Both the approaches are good and will work in an application.

But there is something that we lost: the linked nature of radio buttons.

In HTML this link is managed by the `input` `name` attribute:

```jsx
// this is from MDN

<input type="radio" name="contact" value="email">

<input type="radio" name="contact" value="phone">

<input type="radio" name="contact" value="mail">
```


