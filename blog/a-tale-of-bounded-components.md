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

### [React's context API](https://reactjs.org/docs/context.html)

_I often here that using the React context is a bad practice. I don't totally agree with this statement. I think that we have to understand when not to use it and to use it sparsely. The context is a feature that is built in in React, so they may probably be some good use-cases for it._

What I suggest before writing any component implementation is to imagine your ideal way to use that component. I often start by writing the shape I want it to have (its API), let's say:

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

I like this kind of API because it's straightforward to read.

This code represents a group of radio components that act together. When the `<Radio name="first" />` is selected, every other radio components in the `RadioGroup` children tree will be unselected.

The `selected` prop of the `RadioGroup` component corresponds to the `name` of the selected radio component. If I want to select the `first` radio then the code will look like `<RadioGroup selected="first">...</RadioGroup>`.

We can create this behavior and feeling of link using [React's context API](https://reactjs.org/docs/context.html) where the `RadioGroup` component owns the actual selected `name` in its context and share it across its different `Radio` children.

**This technique of _hiding_ the state management between components is called _implicit state passing_**. We manage the state in a way that the developer doesn't have to care about and does not have to implement multiple times.

[Here's a running codesandbox of the `Radio` and `RadioGroup` implementation](https://codesandbox.io/s/elastic-surf-pxxdt).

---

We now have a good understanding of the `React context` API. Let's explore another advanced function of React that also allows to pass some implicit states through another example: the `Tabs` one.

## The `Tabs` example

In my posts, I'm talking a lot about the Tabs example that [Ryan Florence](https://twitter.com/ryanflorence) has provided in [this video](https://www.youtube.com/watch?v=hEGg-3pIHlE). It's this video that made me realise that I was doing some things wrong and that I had to understand the "composition" concept.

`Tabs` are UI elements that define (UI) interfaces sharing a visual link. They have to be close to each other to provide a good user experience. It doesn't make sense to create a tab at the top left side of the corner with another one at the bottom right side.

I like to put `Tabs` in the category of layout components: they are really business oriented nor atomic UI components. They represent a way to display information and how to navigate between different types of information.

We can imagine this components using multiple approaches and one that often comes and that I used to work with was the data driven approach.

### Data Driven approach

A data driven approach is a way to build component so that a component requires its props to have a specific shape to be used. For example:

```jsx
const items = [
  { title: 'First', Component: () => <div>First</div> },
  { title: 'Second', Component: () => <div>Second</div> },
]

const Tabs = ({ items }) => {
  const [selected, setSelected] = useState()
  let SelectedComponent

  if (selected) {
    SelectedComponent = items[selected].Component
  }

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.title}
          onClick={() => setSelected(index)}
          style={{ color: selected === index ? 'green' : 'black' }}
        >
          {item.title}
        </div>
      ))}

      {SelectedComponent && <SelectedComponent />}
    </div>
  )
}

// would be used <Tabs item={items} />
```

In this example, the `Tabs` component has to know the shape of each of its item to be able to display them correctly. It's a contract between the object shape and the component.

While it's okay to work using this approach, I think that it's good to think of a way to avoid this kind of tight coupling. Composition can help to achieve this.

As I have mentioned before, let's image our perfect world API. Something like the following one looks great to me:

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

Using React, how can we create the different `TabXXX` component so that it works this way? Let's talk about the `React.cloneElement` function.

### React.cloneElement

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

We can imagine some tabs with the following API:

When clicking a `TabHead`, it will switch the actual visible component to the associated (based on index) `Tab` in the `TabsBody` component.

_The composed nature of `Tabs` allows to move the `TabsHeader` to the bottom really easily._

#### Implementing the `Tabs` component

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
