---
path: a-tale-of-bounded-components
date: 2019-05-27T16:18:47.583Z
title: A tale of bounded components
tags:
  - react
  - javascript
---

Building reusable UI components is hard. I always rely on an iterative approach and write my component 2-3 times before getting something that I find useful and reusable across my applications. It's kind of a game to find the "good" abstraction and the "good" way to create them.

In [A note on composing components with React](https://acodingdance.io/a-note-on-composing-components-with-react/), I've briefly talked about my conception of composition by taking the example of [Google Material Design Cards](https://material.io/design/components/cards.html) and how I would have implemented such a thing. This post is an extension of the previous one so I recommend you take a look ☺️.

Today I want to share with you my experience while implementing a UI component library based on a design system and how my team and I have managed to build a _bit more complex components_.

Let's talk about components that _share something_.

## Radio _buttons_

I'm going to take the example of radio buttons and this for two reasons.

The first one is that I'm building the UI component library with [React Native](https://facebook.github.io/react-native/) and that it doesn't provide a built-in Radio component and the second one is because radio buttons are kind of _special_.

By definition, it's a group of selectable elements where only one element can be selected at a time. [Here's a quick link to the MDN definition of **radio** and **radio groups**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio).

In HTML this link is represented by the `input` `name` attribute:

```jsx
// this is from MDN

<input type="radio" name="contact" value="email">

<input type="radio" name="contact" value="phone">

<input type="radio" name="contact" value="mail">
```

I think that we can call these **compound semantic elements**

If we want to build [React](https://reactjs.org/) components that matches the previous definition of radio elements, these components have to share some information with some other ones.

In the React world, we can say that these components **are sharing some state**.

To manage this kind of shared state, we can rely on different approaches.

### Through the parent state

The simplest thing to do in a React world is to rely on the parent component state.

Let's imagine the following snippet:

```jsx
const Parent = () => {
  const [selectedRadio, selectRadio] = useState(0)

  return (
    <>
      <Radio onPress={() => selectRadio(0)} isSelected={selectedRadio === 0} />
      <Radio onPress={() => selectRadio(1)} isSelected={selectedRadio === 1} />

      <Text>The selected value is {selectedRadio}</Text>
    </>
  )
}
```

This is a _fine_ approach and it works as long as we accept to manage the state of the `<Radio />` components in every of their parents.

However, in this code, there is something that we lost: **the linked nature of radio buttons**. Or at least the _family_ link of the radio elements.

Of course the selected value will be reflected thanks to the parent state. But the radio group is dependent on the parent and not only on itself. On the web platform for example, there are no parent to manage the link between the elements.

### Using a global state management tool (let's say Redux)

We can also rely on a global state management tool that will store the actual selected value and provide it across the app:

```jsx
const mapStateToProps = (state, ownProps) => ({
  isSelected: state.selectedRadio === ownProps.name,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectMe = () => dispatch({ type: 'SELECT_RADIO', payload: { newSelectedRadio: ownProps.name } })
})

const RadioEnhanced = connect(mapStateToProps, mapDispatchToProps)(Radio)

const Parent = ({ selectedRadio }) => (
  <>
    <RadioEnhanced />
    <RadioEnhanced />

    <Text>The selected value is {selectedRadio}</Text>
  </>
)
```

This is also a _fine_ approach and it has the benefit of keeping the linked nature of the Radio element using the global state.

However, we have to define a new Redux key in the store for every different kind of Radio component. We also have to create a reducer for each kind of Radio groups and so forth. And this will be the same even if you don't use Redux but an other global state management system.

---

**TL;DR**: it's possible to mimic the shared state with a strong parent / children relationship or using a global state management system.

However, we lose the natural link between the `<Radio />` components that exist by default on the web without extra tooling.

---

## Sharing state with advanced React tricks

Depending on the kind of component I'm working on, I use to rely on two advanced approaches:

- The React context for components that share state
- `React.cloneElement` for structural and layout components (or to enhance child with more props)

Let's dig into these two ones.

### The React context

What I suggest before writing any component implementation is to imagine your best way to use that component. I often start by writing the shape I want it to have (its API), let's say:

```jsx
const MyComponent = () => {
  const [selected, setSelected] = useState('first')

  return (
    <RadioGroup selected={selected} onChange={setSelected}>
      <Radio name="first">
        <Text>My first radio</Text>
      </Radio>

      <Radio name="second">
        <Text>My second radio</Text>
      </Radio>
    </RadioGroup>
  )
}
```

This code aims to represent a group of radio component that acts together. When the `<Radio name="first" />` is selected, every other radio components in the `RadioGroup` children tree will be unselected.

The `selected` prop of the `RadioGroup` component corresponds to the actual `name` of the selected radio component. If I want to select the `first` radio then the code will look like `<RadioGroup selected="first">...</RadioGroup>`.

It's the `RadioGroup` responsability to coordinates its children state and to own the information of which one is selected.

We can create this behavior and feeling of link using [React's context API](https://reactjs.org/docs/context.html) where the `RadioGroup` component owns the actual selected `name` in its context and share it across its different `Radio` children.

**This technique of _hiding_ the state management between components is called _implicit state passing_**. We manage the state in a way that the developer doesn't have to care about and does not have to implement multiple times.

#### Another example, The `Stepper`

Let's imagine something like a page `Stepper`. If you have ever implemented a wizard, a tutorial or a carousel, it's like a way to display a specific view based on a state, just like a router:

```jsx
const Component = () => {
  const [currentStep, setStep] = useState(0)

  return (
    <View>
      <Button onPress={() => setStep(0)} title="First Element!" />
      <Button onPress={() => setStep(1)} title="Second Element!" />

      {currentStep === 0 && <FirstComponent />}
      {currentStep === 1 && <SecondComponent />}
    </View>
  )
}
```

I have written this kind of code (or variants) a million times.

And this is exactly the problem: **I had to rewrite it a million times** because the previous code can only be used in **the specific context of my application**.

#### The `Stepper` using a Data driven approach

I sometime write components that are data driven. It means that my data should have a specific shape that my component knows about. It's like a contract (or a tight bound?) between the data and the component.

_The following code is written in TypeScript to show the link between the Step interface and the Stepper component._

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
    .Component

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

This approach is also perfectly fine and will work in some applications.

- What if I want to move the step switcher somewhere else (like above or below the steps)for a specific page?
- What if I want to add more information than the `title` and the `Component` in my step?

#### Composability first

Let's rethink the component with composability in mind:

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

It's a bit more verbose but it's mostly way more declarative.

On top of that, it's not bounded to the actual application context and can be reused in any application.

It can also be shipped and published as an npm package so that people can work with it. And if you get far enough, you can even imagine improving this code and being able to make it run on React Web but also on React Native 😉.

---

The two components that I've presented there can be implemented using the React context.

As you may have noticed, the approach allows **to bind elements by their behaviours anywhere in the tree**

In the next section, I will try to explain how we can bind element by their `UI` similarities. It's an approach that is much more layout oriented.

## `React.cloneElement` approach

This function allows to clone a React element with its props and also gives the ability to override them (or to add new ones).

It can be used as following:

```jsx
const element = <div>Hello world</div>
const clone = React.cloneElement(element, {
  style: { backgroundColor: 'red' },
})

const App = () => (
  <>
    {element}
    {clone}
  </>
)
```

We will use this definition of the `React.cloneElement` function to pass props to the children of a _component_ without to write extra code when using _this_ component.

### The `Tabs` example

In my posts, I'm talking a lot about the Tabs example that Ryan Florence has provided in [this video](https://www.youtube.com/watch?v=hEGg-3pIHlE). It's this video that made me realise that I was doing some things wrong and that I had to understand the "compose" thing.

`Tabs` are UI elements that define (UI) interfaces sharing a visual link. They have to be closed to each other to provide a good user experience. It doesn't make sense to create a tab at the top left side of the corner with another one at the bottom right side.

I like to put `Tabs` in the category of layout components: they don't really concern business oriented componeent nor atomic UI components. They represent a way to display information and to navigate between different types of information.

We can imagine some tabs with the following API:

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

When clicking a `TabHead`, it will switch the actual visible component to the associated (based on index) `Tab` in the `TabsBody` component.

_The composed nature of `Tabs` allows to move the `TabsHeader` to the bottom really easily._

### Implementing the `Tabs` component

The `Tabs` component is the owner, the one that knows everything. It owns the actual selected index and knows how to modify that selected index:

```jsx
const Tabs = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return React.Children.toArray(children).map(child =>
    React.cloneElement(child, { selectedIndex, selectIndex: setSelectedIndex })
  )
}
```

In this case `React.cloneElement` enhances the child component by adding them two props: the actual selected index and a way to modify that selected index.

In fact, we'll pass down these two props respectively to the `TabHead`s and the `Tab`s.

The `TabsHeads` component will receive the `selectIndex` function and will pass it down to its `TabHead` children with a subtle variant: we'll scope the actual index of the `TabHead` component so that they can call the `selectIndex` function without passing their index explicitly:

```jsx
const TabsHeader = ({ selectIndex, children }) =>
  React.Children.toArray(children).map((child, index) =>
    React.cloneElement(child, { selectIndex: () => selectIndex(index) })
  )
```

`TabHead` will simply look like this:

```jsx
const TabHead = ({ selectIndex, ...props }) => (
  <button onClick={selectIndex} {...props} />
)
```

The `TabsBody` role is to display only the element that matches the selected index. This can be achieved using `Array.prototype.find` on the children:

```jsx
const TabsBody = ({ selectedIndex, children }) =>
  React.Children.toArray(children).find((_, index) => selectedIndex === index)
```

[Here's a link to a codesandbox of the previous snippets.](https://codesandbox.io/s/hardcore-thompson-ibxow)

_I suggest you take some times to analyse and get familiar with this kind of code. It's something that I wasn't used to before diving into it._

---

So there we are, these are examples with some explanations of more complex and linked components!
