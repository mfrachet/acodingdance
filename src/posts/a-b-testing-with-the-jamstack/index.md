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
- it already exists great tools to create amazing sites ([Gatsbyjs](https://www.gatsbyjs.com/), [Nextjs](https://nextjs.org/), [11ty](https://www.11ty.dev/), [etc...](https://jamstack.org/generators/))

## Why do we use A/B testing?

People use A/B testing to measure which variant of a website is more appreciated by their users. The idea is simply to provide different visual representations
of some data and check which one attracts more people.

![Visual representation of two different variants of an A/B tests](./ab-tests.png)

If the visitors of the variant A come more often than the visitors of the variant B, then we can assume that variant A is a more viable solution to represent the data on the page.

## How do we use A/B testing in none JAMstack applications?

In applications that are not built on top of the JAMstack, the idea is quite straightforward.

When opening the application, it will make a request to a remote server to get the different available variants. Then, based on some conditions in the codebase, we are able to display the good variant to the good user.

The following is an example of a client-side based A/B test written with [Reactjs](https://reactjs.org/):

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

As you see in the snippet, the code is executed in the user's browser. Also notice **the loading information while the request is pending** before being able to display the variant content.

## Why A/B testing on the JAMstack is different?

Remember one of the main arguments of building on top of the JAMstack is **fast page loading** (performances).

When using A/B testing using the "standard way", **we need to make an HTTP request to get the different variants**. Making an HTTP request means that **there is a delay** between the moment we ask for the variants and the moment we get them back from the server.

The problem is that **making the HTTP request is so critical** that we can't show anything else than a loading information to the user before resolving the variants and being able to show them the good content.

**In a static environment, we are waiting for a dynamic information to display meaningful information.**

Using A/B the "standard way" using runtime information will **make the application performances worse by increasing the time for the displaying the first meaningful content**. While it could be "instant" on static pages, relying on an HTTP request and an intermediate loading state before displaying the content will take extra time and decrease the experience.

In some scenarios, I've seen [Lighthouse](https://developers.google.com/web/tools/lighthouse) performance score dropping by around `25` points (up to you to determine if it's significant or not).

Also note that some tools helping building applications using the JAMstack **don't even run JavaScript at all**, making runtime computations impossible.

## How to make A/B testing in a JAMstack fashion?

The JAMstack is about **building static pages**. Taking this notion to the extreme, we can imagine creating a dedicated set of static pages for different variants and host them in different places, like for example, different machines.

![Visual representation of two machines hosting two different variants of an A/B test](./machine-ab.png)

**The machine 1** owns all the statically generated HTML pages impacted by the variant A and **the machine 2** owns all of the statically generated HTML pages of the variant B.

The idea now is to rely on some kind of proxy to route the different users to one of the two variants and make sure they always see that variant.

As you remember, **we can't rely on runtime information to store the variant**, like an authenticated user id for example. We need to rely on something else. Hopefully it exists [HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) that allow for a client-server kind of data sharing. We can benefit from them to store the actual variant requested by the users and make sure that they will always get routed to that variant.

![Visual representation of a proxy routing an HTTP request to the good machine for an A/B test](./cookie-ab.png)

## Observations on this approach

_Before going further, I have to mention that since we don't have access to runtime information, it's not possible to target an individual user. Also note that it's more complex to A/B test in a more JAMstack way and that it will potentially cost more money than a runtime solution. It's again about tradeoffs._

## References

On a side note, I think that Netlify is using a similar approach but for something branch based with their [Split-testing product](https://docs.netlify.com/site-deploys/split-testing/).

If you have any other references in mind concerning A/B testing on top of the JAMstack, feel free to drop them on [Twitter](https://twitter.com/mfrachet).
