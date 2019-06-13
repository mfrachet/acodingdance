---
path: compound-component-implicit-state
date: 2019-05-27T16:18:47.583Z
title: The story of bounded components
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

I think that we can call these **compound semantic elements**

---

In React, it's possible to mimic this behaviour with a strong parent / children relationship.

Depending on the kind of component I'm working on, I use to rely on two approaches:

- The React context for components that share informations
- `React.cloneElement` for structural and layout components

Let's dig into these two ones.

## The React context

Let's continue talking about the `Radio` components. For this exercise, I have imagined an API that would look like:

```jsx
const MyComponent = () => {
  const [selected, setSelected] = useState('first')

  return (
    <RadioGroup selected={selected} onChange={setSelected}>
      <View style={styles.someStyle}>
        <Radio name="first" />
      </View>

      <View style={styles.someDifferentStyle}>
        <Radio name="second" />
      </View>
    </RadioGroup>
  )
}
```

Where `RadioGroup` is the link between all of its `Radio` children. Its role is to ensure that only one element can be selected inside its own context, which is its children tree.

It owns a `selected` property that corresponds to the **unique name** of the selected radio component.

Using the context of React in that specific case allows to keep consistency between the components but it also doesn't block the composability nature of React: I can position my radio element almost anywhere without losing the current form state.

This is what we call _implicit state passing_. We manage the state in a way that the user doesn't have to care about.


#### The `Stepper` example

To take another example, let's imagine something like a page `Stepper`: display a view based on an id, something like:

```jsx
const Component = () => {
  const [currentStep, setStep] = useState(0)

  return (
    <View>
      <Button onPress={() => setStep(0)} title="First Element!" />
      <Button onPress={() => setStep(1)} title="Second Element!" />
      
      {currentStep === 0 ? <FirstComponent />}
      {currentStep === 1 ? <SecondComponent />}
    </View>
  )
}
```

I have written this kind of code (or variants) a million times for different purpose like tutorials and so forth.

The problem with that code is that **I had to rewrite it a million time** because it's not composable and thus it can be used only in my context. _Of course, it could also have been design in a data driven way, but we create a coupling between the data shape and the component. But that's another story._

Now, if I had implemented something like this one time, I could have been able to reuse it in my different cases:

```jsx
const Component = () => (
  <Stepper>
    <StepperAction to="first">
      <Text>First element!</Text>
    </StepperAction>

    <StepperAction to="second">
      <Text>Second element!</Text>
    </StepperAction>

    <Step name="first">This is the first section</Step>
    <Step name="second">This is the second section</Step>
  </Stepper>
)
```

It's a bit more verbose but it's mostly way more declarative. On top of that, it's not bounded to the actual application context and can be reused in any application. It can also be shipped and published as an npm package so that people can work with it.

As you may have noticed, the context approach allows to bind elements by their **behaviours** anywhere in the tree.

The next approach will bind element by their **UIs**. 

## `React.cloneElement` approach

This function allows to clone a React element with its props and also gives the ability to override them (or to add new ones).

It can be used as following:

```jsx
const element = <div>Hello world</div>;
const clone = React.cloneElement(element, {
  style: { backgroundColor: "red" }
});

const App = () => (
  <>
    {element}
    {clone}
  </>
);
```

### The `Tabs` example

I'm talking a lot about the Tabs example that Ryan Florence has provided in [this video](https://www.youtube.com/watch?v=hEGg-3pIHlE). It's this video that made me realise that I was doing some things wrong and that I had to understand the "composing" thing.

`Tabs` are UI elements that define (UI) interfaces sharing a visual link. They have to be closed to each other to provide a good user experience. It doesn't make sense to create a tab at the top left side of the corner with another one at the bottom right side.

We can imagine some tabs in a composable way with the following API:

```jsx
  <Tabs>
    <TabsHeader>
      <TabHead>First button</TabHead>
      <TabHead>Second button</TabHead>
    </TabsHeader>

    <TabsBody>
      <Tab>
        <FirstComponent />
      </Tab>
      <Tab>
        <SecondComponent />
      </Tab>
    </TabsBody>
  </Tabs>
```

When clicking a `TabHead`, it will switch the actual visual component to the associated (based on index) `Tab` in the `TabsBody` component.

If we want to move the `TabsHeader` to the bottom of the component, we simply can thanks to the composable approach the these compound components.

### Implementing the `Tabs` component

The `Tabs` component is the owner, the one that knows everything. It owns the actual selected index and is the one that knows how to modify that index.



MORE GENERALLY COMPONENTS THAT CONCERNS LAYOUT AND LAYOUTING EXPERIENCE
