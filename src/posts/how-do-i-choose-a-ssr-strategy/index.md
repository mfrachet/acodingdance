---
title: "How do I choose which SSR strategy to adopt?"
date: 2020-05-25
slug: "/how-do-i-choose-a-ssr-strategy"
---

Server Side Rendering (or SSR) is a big trend. In the React ecosystem, we have plenty of tools that rely on it such as [Gatsbyjs](https://www.gatsbyjs.org/) or [Nextjs](https://nextjs.org/).

Before getting further, let's see what happens when a user makes a request on a site that is not built using SSR:

- The browser makes a request on a specific endpoint
- It downloads an empty HTML file that only owns a bunch of `<script>` tags to load some JavaScript code
- It resolves / parses / compiles the JavaScript code
- It executes the JavaScript code and only then the application can display the content

This is how the good old [Angularjs](https://angularjs.org/) or [JQuery](https://jquery.com/) applications were working. And this is also what happens when we use [create-react-app](https://github.com/facebook/create-react-app).
We say that these applications rely on "Client Side Rendering" (or CSR).

## Why SSR has been invented?

When building an application using CSR, we **always** have to wait for the JavaScript code to be resolved / parsed / compiled / executed **before** displaying anything on the screen.
The JavaScript application is responsible for filling the HTML file dynamically in the browser.
And this can be problematic because:

- CSR applications are not optimized for SEO ([SEO works, but it's a bit more complicated](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#seo))
- We don't benefit from a good media sharing experience
- Displaying the first meaningful content or wait for the application to be interactive can take time when the application is big

I remember having worked on Angularjs applications back in 2013 where it could take around 10 seconds to display the first content on the page.

## How does it solve these problems?

The main idea behind SSR is to generate HTML content and display it to the user the sooner. HTML is easy to understand for browsers, they know how to execute it really fast.

This way, when a user navigates:

- The browser makes a request on a specific endpoint
- It downloads **an already filled HTML content** and can already display it to the user

Which is good enough to solve the 3 problems we had:

```git
- CSR applications are not optimized for SEO
+ HTML is optimized for SEO

- We don't benefit from a good media sharing experience
+ Pre-filled HTML owns the necessary meta to have a good sharing experience

- Displaying the first meaningful content or wait for the application to be interactive can take time
+ Displaying HTML content is probably one of the fastest thing a browser can do
```

This is the most basic idea behind the term SSR and with this in mind, we can create complex and powerful mechanisms (non-exhaustive list):

### Runtime SSR

- Start a NodeJS server
- When a request is made, render static HTML content (string format)
- When the browser is ready, start a client side application for interactivity
- Tools: [Nextjs](https://nextjs.org/)

The first way to rely on SSR we've seen in the React community. Can be complex to put in practice and costs money:
one or several NodeJS servers have to be running in production to manage the requests.

### Static Generation

- At build time (when running `npm run build` or `yarn build`)
- Generate as many **HTML files (.html)** as necessary
- When a request is made, render the associated .html file
- Tools: [Docusaurus](https://docusaurus.io/), [11ty](https://github.com/11ty/eleventy/)
- Performance case study by [Netflix on the landing page](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)

Common in the documentation / blogging area where interactivity is not required. Tools take something like Markdown content in input and create
the associated .html files as output. Not too complex to use in practice, not expensive thanks to CDN hostings.

### Build time SSR / Pre-rendering

- At build time (when running `npm run build` or `yarn build`)
- Generate as many **HTML files (.html)** as necessary
- When a request is made, render the associated .html file
- When the browser is ready, start a client side application for interactivity
- Tools: [Gatsby](https://www.gatsbyjs.org/), [Nextjs](https://nextjs.org/)

Probably my favorite of all the listed solutions. Very scalable, highly interactive, not too complex to use in practice and not expensive thanks to CDN hostings.

## How to choose?

This is where it gets tricky.

**Choosing a strategy is not about finding the best solution**. It's about evaluating trade offs and taking the
technic that provides **the most benefit in our context** than it provides drawbacks.

Also, I'm feeling that the last few years we tend to use SSR almost everywhere and as much as we can.
While it's an amazing tool that helps in many situations, I think
we should keep in mind that **it's just a tool** - not a silver bullet solution. If we don't face the problems it's supposed to solve, I'm not convinced we should introduce it in a project.
**Remember that introducing SSR is not free**, it has a technical cost and a potential infrastructure cost.

Finally we don't have to choose a single way of building an app: we can cross the ideas and create a system that provides the best user experience in our scenario.

The following diagram is one of the mental representations I'm using to determine when I would consider using a technic over another one in a given situation. **It's not a source of truth at all**.

![Mental SSR path to make a choice](./ssr.png)
