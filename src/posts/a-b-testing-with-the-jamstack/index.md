---
title: "A/B testing with the JAMstack"
date: 2020-05-25
slug: "/a-b-testing-with-the-jamstack"
---

The JAMstack has been talked about in recent years like a way to create static websites that scales very well in many different ways.
Since it becomes more and more mainstream, it made sense to people to think about how to apply older patterns that we like in this
quite particular context.

In this post, I will share with you **my vision** of A/B testing with the JAMstack.

## But first, why do we use the JAMstack?

According to [jamstack.org](https://jamstack.org/), we use it because:

- it's about building **simple static pages** (HTML files)
- most of the job is made at build-time, no potential leak at runtime, it's more **secured**
- static pages are basically HTML and thus **load very fast**
- we benefit from **chip hosting** (putting HTML files on a server and there we go)
- it's **highly scalable**, just put the files on another machine and scaling is done
- it already exists great tools to create amazing applications ([Gatsbyjs](https://www.gatsbyjs.com/), [Nextjs](https://nextjs.org/), [11ty](https://www.11ty.dev/), [etc...](https://jamstack.org/generators/))

## Why do we use A/B testing?

People use A/B testing to measure which variant of a website is more appreciated by their users. The idea is simply to provide different visual representations
of some data and check which one attracts more people.

![Visual representation of two different variants of an A/B tests](./ab-tests.png)

If the visitors of the variant A come more often than the visitors of the variant B, then we can assume that variant A is a more viable solution to represent the data on the page.

## How do we use A/B testing in none JAMstack applications?

In applications that are not built using the JAMstack, the idea is quite straightforward.

When opening the application in the browser, it will make a request to a remote server to get the different available variations. Then, based on some conditions in the codebase, we are able to display the good variation to the user.

Here's a code snippet of a tiny experiment written with React:

```jsx
const App = () => {
  const { variant, isLoading } = useABVariant();

  if (isLoading) {
    return <p>Preparing the application...</p>;
  }

  if (variant === "A") {
    return <div>Here's the A variant!</div>;
  }

  return <div>Here's the B variant!</div>;
};
```

As you see in the snippet, the code is executed in the user's browser. They may notice a loading information while the request is pending before being able to use the application.

## Why A/B testing on the JAMstack is different?

Remember one of the main arguments of building on top of the JAMstack is performances.

While it's technically possible to use the "standard way" to rely on A/B tests (e.g making runtime requests), it will make performances worse and increase the first time to meaningful content on the page **because of the HTTP roundtrip that requires time and a potential UI fallback**. Also, some tools helping building applications using the JAMstack don't even run JavaScript at runtime at all making runtime computations impossible.

- Usual tools make A/B testing at runtime, on HTTP requests or websocket pushes

  - feature activation is done "live", in "realtime", when a user is browsing a site
  - we lose the JAMstack strength about page loading since the UI needs an extra HTTP roundtrip to get the information of which variant to show
    - performance scores can drop by some points (we've seen drops about 20 points in Lighthouse in some cases)

- How can we do A/B testing to be aligned with the JAMStack concepts?

  - Before going further

    - Remember that when requesting a static page, we don't have access to runtime information, like the user currently connected, so voluntary targeted A/B testing can't be achieved
    - Not as easy as runtime A/B testing, and probably not feasible if you don't host your application yourself (or if the service where you host the application doesn't have a service like that)
    - **It can cost money**

  - JAMstack is about generating static websites
  - So let's build whole new static websites for the different variants we have
    - Since A/B testing is based on conditions, multiple sites may have to be build
