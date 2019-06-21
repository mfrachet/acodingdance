---
path: compound-component-implicit-state
date: 2019-05-27T16:18:47.583Z
title: A tale of bounded components
tags:
  - react
  - javascript
---
Building reusable UI components is hard. I'm always banging my head around three times before writing a component that I want to be reusable. It's kind of a game to find the good abstraction and the good way to build them.

In [A note on composing components with React](https://acodingdance.io/a-note-on-composing-components-with-react/), I've briefly talked about my conception of composition by taking the example of [Google Material Design Cards](https://material.io/design/components/cards.html) and how I would have implemented such a thing. Feel free to take a look if you're interested ☺️.

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

But there is something that we lost: **the linked nature of radio buttons**.

In HTML this link is handled by the `input` `name` attribute:

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
- `React.cloneElement` for structural and layout components (or to enhance child with more props)

Let's dig into these two ones.

## The React context

Let's get back to the `Radio` components. For this exercise, I have imagined an API that looks like:

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

It owns a `selected` property that corresponds to the **unique name** of the selected radio component **in this context**.

Using the context of React in that specific case allows to keep consistency between the components but it also doesn't block the composability nature of React: I can position my radio element almost anywhere without losing the current form state.

The technique of _hiding_ the state management between this kind of components is called _implicit state passing_. We manage the state in a way that the end user(the developer) doesn't have to care about.


#### The `Stepper` example

To take another example, let's imagine something like a page `Stepper`. If you have ever implemented a wizard, a tutorial or a carousel, it's like a way to display a specific view based on a state, just like a router:

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

I have written this kind of code (or variants) a million times.

And this is exactly the problem: **I had to rewrite it a million time** because the previous code can only be used in the specific context of my app.

I also could have written it with a bit more abstract approach and rely on some specific data type. This specific data type could be understood by the UI component:

```tsx
interface Step {
  title: string
  Component: React.ComponentType
}

interface Props {
  items: Step[]
}

export const Stepper: React.FC<Props> = ({ items }) => {
  const [currentStep, setStep] = useState(0)

  const SelectedComponent = items.find((_, index) => index === currentStep)

  return (
    <>
      {items.map((item, index) => (
        <Button title={item.title} onPress={() => setStep(index)} />
      ))}

      <SelectedComponent />
    </>
  )
}
```



_Of course, it could also have been designed in a data driven way meaning that we would have created a coupling between the component and the shape of the data it needs. But that's another story._

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

The `Tabs` component is the owner, the one that knows everything. It owns the actual selected index and is the one that knows how to modify that index:

```jsx
const Tabs = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return React.Children.toArray(children).map(child =>
    React.cloneElement(child, { selectedIndex, selectIndex: setSelectedIndex })
  );
};
```

In this specific case `React.cloneElement` allows us to enhance the child component by adding it two props: the actual selected index and a way to modify that selected index.

In fact, we'll pass down these two props respectively to the `TabHead`s and the `Tab`s.

The `TabsHeads` component will receive the `selectIndex` function as props and will pass it down to its `TabHead` children with a subtle variant: we'll scope the actual index of the `TabHead` component so that they can call the `selectIndex` function without passing their index explicitly:

```jsx
const TabsHeader = ({ selectIndex, children }) =>
  React.Children.toArray(children).map((child, index) =>
    React.cloneElement(child, { selectIndex: () => selectIndex(index) })
  );
```

`TabHead` will simply look like this:

```jsx
const TabHead = ({ selectIndex, ...props }) => (
  <button onClick={selectIndex} {...props} />
);
```

The `TabsBody` role is to display only the element that matches the selected index. This can be achieved using a simple `Array.prototype.find` call on the children:

```jsx
const TabsBody = ({ selectedIndex, children }) =>
  React.Children.toArray(children).find((_, index) => selectedIndex === index);
```

[Here's a link to a codesandbox of the previous snippets.](https://codesandbox.io/s/hardcore-thompson-ibxow)

_I suggest you take some times to analyse and get familiar with this kind of code. It's something that I wasn't used to before diving into it._

In my mind this approach better fits for layout based components like the tabs example, or even routing etc...

---

So there we are, these are examples with some explanations of more complex and linked components!
