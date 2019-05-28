---
path: compound-component-implicit-state
date: 2019-05-27T16:18:47.583Z
title: 'Don''t fear the context, compound components and implicit state'
tags:
  - react
  - javascript
---
Building reusable UI components is really hard. I'm always banging my head around three times before writing a component that I want to be reusable. It's kind of a game to find the good abstraction and the good way to build them.

In [A note on composing components with React](https://acodingdance.io/a-note-on-composing-components-with-react/), I've briefly talked about my conception of composition by taking as example the [Google Material Design Cards](https://material.io/design/components/cards.html) and how I would have implemented such a thing. Feel free to talk a look if you're interested ☺️.

Today, I wanted to talk about building UI components. I'm actually implementing a UI component library based on a design system and I wanted to share with you my point on _more complex_ components.

So let's talk about components that _share something_.

## Radio _buttons_

I'm going to take the example of radio buttons in this example. I've taken this one for two reason.

The first one is that I'm building the UI component library with React Native and that we don't have any built-in Radio component, and the second one is that radio buttons are kind of "special".

By definition, they are defined as a group of selectable element where only one element can be selected. [Here's a quick link to the MDN definition of **radio** and **radio groups**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio).

So it means that if we want to build a `<Radio />` component, it has to share some information with its other `Radio` "friends"
