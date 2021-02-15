---
title: "Strong & personal opinions"
date: 2021-02-14
slug: "/strong-and-personal-opinions"
metaKeywords: "react,react-native,frontend,javascript,testing"
---

This blog post is about strong and personal opinions that I have (and that might change in the future) about the way I like to build a product. Nothing here is a rule of thumb, just a dump of my brain at this specific moment.

## The list


### [react-query](https://react-query.tanstack.com/) / [apollo-graphql](apollo-graphql) instead of a global state management system

**Main Reason**: it simplifies the code greatly and makes things look smoother.

When possible, I will try to avoid a global state management mechanism: they are great in some cases, but most of the time, they are unnecessary, requiring a lot of boilerplate and logic handling that might be avoided. 

Instead of that, I prefer to rely on react-query and apollo-graphql (or equivalent) and rely on their caching mechanisms to share some state across my applications. With them, I have control over the way I want to retrieve and cache data. They provide build-in mechanisms to handle retries, caching mutations, loading and error states, easy optimistic updates and tons of other great things.

### [Cypress](https://www.cypress.io/) is great but [Playwright](http://playwright.dev/) might take the lead

**Main Reason**: [Playwright](https://playwright.dev/docs/core-concepts#browser) is cross-browser by default and allows to access [the AxTree easily](https://playwright.dev/docs/api/class-accessibility/).

Reasons


### Having good (enough) UI primitives is mandatory

Reasons

### Accessibility is not a choice

We should focus on accessibility from day one in our applications. I think it's okay not to know everything, but we need to learn more and to become more inclusive when building products. If you're interested, I've recently come across a set of vidéos from [Rob Dodson](https://twitter.com/rob_dodson) called [A11ycasts](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g).

Also my ex-colleague [Amberley Romo](https://twitter.com/amber1ey), who introduced me to accessibility, owns a blog dealing with accessibility. It's a very great one and people should know about this: [https://a11y.coffee/](https://a11y.coffee/).

### Duplicating code is okay, and often time necessary

Reasons

### Focusing more on use-cases and the business and less on abstractions

Reasons

### [TypeScript](https://www.typescriptlang.org/) over JavaScript, every time it's possible

Reasons

### Testing against components is better than testing against "logic" or helpers

Reasons

### Integration tests offer the most value

Reasons

### Testing against a shallow wrapper is not as good as doing it on a real one

Reasons

### Components with a million props should be split

Reasons

### Compose business components with UI ones

Reasons

### Business components should only have business related props

Reasons

### Avoid central configurations

Reasons

### Server Side Rendering is not always necessary

Reasons

### A flatten project structure is way easier to understand

Reasons

### Avoid ./index.(js|ts) at a module's root

Reasons

### Avoid google-analytics and friends and prefer tools that respect privacy

**Main Reason:** respecting the user.

I don't need to get access to people information nor to provide third parties ways to identify them across the internet. I try, as much as I can, to choose privacy friendly alternatives such as [Plausible Analytics](https://plausible.io/).

### Named export, always, everywhere, every time

Reasons

### Prefer hooks over HOCs and render props when possible

Reasons (being explicit)

### It's okay to use React Context a lot

Reasons

### 100% of the time, I will pick [React](https://reactjs.org/)

Reasons