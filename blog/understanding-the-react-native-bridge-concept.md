---
path: react-native-bridge
date: 2019-05-15T16:47:52.672Z
title: Understanding the React Native bridge concept
tags:
  - react
  - react-native
  - javascript
---
And why its architecture is awesome, at a top level.

* _[This post has also been published on @medium](https://hackernoon.com/understanding-react-native-bridge-concept-e9526066ddb8)_
* _[Here’s a post concerning the new (future) react-native architecture](../react-native-new-architecture)_

![React Native](/assets/rn.png)

React Native is often presented as a game changer that allows to run JavaScript code inside a mobile environment. Its main strength is that it doesn’t rely on [webviews](https://www.telerik.com/platform-next-level) like other competitors ([Phonegap](https://phonegap.com/), [Ionic](https://ionicframework.com/), [Cordova](https://cordova.apache.org/)…, but on the actual real materials provided by the different platforms. It has built-in access to all the native views and components, and to about 70 specific device APIs by default ([you can extend it](https://facebook.github.io/react-native/docs/native-modules-ios.html)).

When writing React Native apps, we build native UIs. And that’s the key point, we create UIView instances just like we would have with platform specific languages:

![RCTView implements UIView](/assets/xcode.png)

My first assumption on this framework was something like:

> They probably create an AST from the JS code and transform it to make it run on multiple devices.

That would make sense and that’s actually what [Google/Flutter](https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.p) does while building apps (with [Dartlang](https://www.dartlang.org/)). But that’s not the React Native way.

The main problem with this approach is that targeting platforms for compilation based on JavaScript code would imply the creation of new compilers. I don’t know any existing tool accepting JavaScript as entry code that is able to produce code for every targeted platform (eventually see [Jasonette](https://jasonette.com/)).

![NB: some have tried but only for mobile development with opinionated approaches](/assets/compiler.png)

But what currently exist are compilers that target their own specific platform. For example, we have compilers that accept Java / Kotlin code and target Android platform, or Obj-C / Swift targeting iOS platform. It exists many compilers for different languages and targets. They do their job well because **they have been designed** to create optimised artefacts for them.

React Native is built in such a way that **it uses existing compilers**:

![NB: some have tried but only for mobile development with opinionated approaches](/assets/cross-compiler.png)

It’s built with a really opened architecture that allows the code to be run, not only on mobile devices, but also on other platforms:

* [Desktop applications](https://github.com/kusti8/proton-native)
* [Virtual Reality](https://facebook.github.io/react-360/)
* [Many more](https://news.ycombinator.com/item?id=16198843)

It can also be used with other frameworks:

* [Weex](https://github.com/alibaba/weex), a React Native port of Vuejs.
* [a custom Angular renderer that allows to run ng apps in devices, with React Native](https://github.com/angular/react-native-renderer).

So how did the team build such a framework, that is platform and framework agnostic, by using the existing tools & compilers?

## Multiple realms interacting, nothing else

Let’s take a step back and look at the big picture of React Native.

React Native deals with two realms, the JavaScript one and the Native one. Both of them are able to share information. They communicate using a “bridge”, which is definitely the very heart of the React Native architecture, the part that offers so much flexibility.

The bridge is the concept that provides a way for bidirectional and asynchronous communications between these two universes. What’s important here is that they are completely written in different technologies, but **they are able to communicate**.

![JS threads communicates with the native ones through the bridge](/assets/distributed.png)

## Remember your backend side

Let’s remember when we were coding distributed backend applications with multi-service communications.

How do we manage communication between two services that are completely different at a language/platform level ?

We used interoperable languages, such as JSON or XML, and we relied on asynchronous protocols such as [AMQP](https://www.amqp.org/about/what) (or any other like [Kafka](https://kafka.apache.org/)).

![Bidirectional communications between heterogeneous services](/assets/broker.png)

If we want these two services to communicate, we rely on a message queue. The first service pushes some commands inside the queue and the other one has to execute these commands when possible.

React Native behaves the same way. The JavaScript realm sends asynchronous JSON messages describing the action the Native part is supposed to accomplish.

For example, the JavaScript side will send information concerning **the views that must be created by the Native side**. When the Native side is ready, it will effectively create the views:

![JavaScript sends commands asynchronously to the Native side for view management, with JSON](/assets/bridge.png)

In React Native, the bridge endorses the message broker role, handling asynchronous commands between the two different worlds.

It offers multiple possibilities:

* since it’s asynchronous, it’s non blocking, and therefore allows for smooth view management on the screen (~6O fps is the React Native golden goal)
* since it’s decoupled and based on interoperable languages, it’s wide open to other frameworks and rendering systems **provided that they respect the React Native bridge command interface**

The more the bridge’s language is ubiquitous and universal, the more the possibilities are… and it is indeed!

## The bridge implementation

[The bridge is built in C/C++ and thus, can be run on multiple platforms, OS etc...](https://github.com/facebook/react-native/blob/81860c59c3453429bb4e70da2c372c92e66e134c/ReactCommon/cxxreact/NativeToJsBridge.cpp#L29)

It embeds the [Apple JavaScriptCore framework](https://developer.apple.com/documentation/javascriptcore) in, which exposes APIs to access the actual JavacriptCore VM capabilities. Many people use these APIs on the Obj-C and Swift world. But there is a C API, and the Obj-C one is actually just a wrapper.

With this in mind, JavaScript code can be run inside a C/C++ program. It can inject variables, functions and declare globals to enhance the JavaScript existing code. React Native relies on this kind of magic to make JavaScript communicate with the native world and thus [trigger actions in the C/C++ world](https://github.com/facebook/react-native/blob/52f431b4bb29062abd8ce20e01a4e60b47151a80/Libraries/BatchedBridge/MessageQueue.js#L254).

_Injecting stuff inside the JavaScript code also means that functions can be executed by the C/C++ code._

This diagram quickly sums up how the JavaScript world is able to deal with the C/C++ one:

![The JS code is managed by the JSCore framework](/assets/js-side.png)

## The native side

The communication on the native side is “the easiest” part.

Let’s begin with the iOS platform. Since Obj-C is an extension of the C language, it can communicate with it natively. This way, exchanges between the bridge and the Swift / Obj-C world are easy and natural.

![High level diagram of JS interacting with iOS world](/assets/ios.png)

On Android, we need to rely on the [Java Native Interface](https://docs.oracle.com/javase/8/docs/technotes/guides/jni/) to dialog with the bridge.

![High level diagram of JS interacting with Android world](/assets/android.png)

Here’s an old but really awesome and deep post explaining [how the bridge is implemented on iOS by Tadeu Zagallo](https://tadeuzagallo.com/blog/react-native-bridge/).

Let me know if you have further questions regarding React Native internals. I’ll try to provide all that I know on the topic.

Thanks to my mates [@Zenika](https://medium.com/@ZenikaIT) and [@M6Web](https://tech.m6web.fr/) for the reviews!
