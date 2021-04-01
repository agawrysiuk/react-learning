# angular-learning

This project with Angular was created as a result of 
my Education Week at Altkom Software & Consulting.

To learn React, I used a 40hrs course on Udemy:

https://www.udemy.com/share/101WayBUUfcltRQno=/

Things I learnt during that week:
- What is React
- What is included in the Next Generation JavaScript
- Components (Stateful vs Stateless)
- Passing values and methods with two-way binding
- Styling, Radium, Styled Components, and CSS Modules (https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
- React Developer Tools in Google Chrome
- Error Boundaries
- Creation/Update Lifecycles https://reactjs.org/docs/state-and-lifecycle.html
- Components Lifecycle
    - `getDerivedStateFromProps()`
    - `componentDidMount()`
    - `componentWillUnmount()`
    - `shouldComponentUpdate()`
    - `getSnapshotBeforeUpdate()`
    - `componentDidUpdate()`
    - `PureComponent`
- Functional Components Lifecycle 
    - `useState()`
    - `useEffect()` https://reactjs.org/docs/hooks-effect.html
    - `React.memo()`
- About Virtual DOM and how React updates the real DOM
- What you can return from `render()` method (Higher Order Components)
    - Higher Order Components https://reactjs.org/docs/higher-order-components.html
        - JSX wrapped with root element (e.g. div) -> `return (<div></div>)`;
        - Adjacent JSX Elements (Auxiliary.js for Windows (as Aux is a reserved name), Aux.js for else),
            otherwise known as empty wrappers -> `return (<Aux>...</Aux>)` `const aux = props => props.children;` which act as a root element
        - React.Fragment -> also acts as a root element but is available since React 16.2 -> `return (<React.Fragment>...</React.Fragment>)`
        - Even newer version of React.Fragment, an empty tag that acts as a root element -> `return (<>...</>)`
        - other examples of Higher Order Components (names start with "With...") which are wrappers doing
        some work, e.g. WithClass technically is just a div with className but it can be written as:
            - a regular functional component (use when logic has something to do with HTML) 
            `const withClass = props => (<div className={props.classes}>{props.children}</div>);`
            which is used like `return (<WithClass classes={classes.Person}>...</WithClass>);`
            - or as a function (use when logic has something to do with running additional JS code)
            `const withClass = (WrappedComponent, className) => { return props => (<div className={className}><WrappedComponent {...props} /></div>);};`
            which wraps the class which is using it in the export, e.g. `export default withClass(Person, classes.Person);`
            so that way, we can set some Adjacent SJX Element as a wrapper `return (<Aux>...</Aux>)` and still have a higher wrapper with a className
    - An array of components created programmatically -> `return list.map(p -> return <P />)`;
    - An array of components/DOM objects typed -> `return [<div key="1"></div>, <p key="2"></p>, <P />]`
- PropTypes - runtime check for React props and similar objects. 
Used to document the intended types of properties passed to components. 
It checks props passed to the components against those definitions, and warn in development if they don’t match.
https://reactjs.org/docs/typechecking-with-proptypes.html
- Refs - https://reactjs.org/docs/refs-and-the-dom.html a special property on any component which makes it detected by React. It can be used in several ways:
    - in Components
        - `<input ref={inputEl => this.inputElement = inputEl} ...?</...>`
        which can be called with `this.inputElementy.doSomething()`
        - from React 16.2, the most modern approach is to create a reference in constructor `this.inputElementRef = React.createRef();`,
        then signing it to some element `<input ref={this.inputElementRef} ...?</...>`, and finally, calling it
         by pointing to the current reference: `this.inputElementRef.current.doSomething();` in for example `componentDidMount()`
    - in Functional Components
        - by just creating a constant with React Hook `const toggleBtnRef = useRef(null);`, then
        signing it to some element `<button ref={toggleBtnRef} ...`, and finally, calling it
        by pointing to the current reference: `toggleBtnRef.current.click();` inside e.g. React Hook `useEffect()`
- Context - introduced by React and it helps us handle cases, where you need certain 
data, certain state in multiple components and you don't want to pass that state across multiple layers
of components just to get it from component A at the top to component D at the very bottom when the
components B, C in between don't really care about it. In short, Context is globally available
(or in the place you want to be available) JavaScrip object/array/variable. First, you create a js file with
the context `const yourContext = React.createContext({some: value, other: value}); export default yourContext;` (funnily enough,
we don't really care about the values here as we are going to use state) and then, there are three ways to use it:
    - as a JSX element with the syntax `<YourContext.Provider value={this.state.value}>...</...>` in the parent component where
    you set value, and the syntax `<YourContext.Consumer>{context => <child_components_here>}</...>` (function inside!) 
    in the component bottom child (in this example, we skip components B and C, and put it right into D).
    - with React 16.6, in the Components you can use a static property contextType (written exactly like this) and its value
    should match YourContext, like this: `static contextType = YourContext;`; then, you just use `this.context.value`
    (not this.contextType!) to get the values you need
    - in the Functional Components, you can use React Hook `useContext()` with the syntax `const yourContext = useContext(YourContext);`
    and then, use it inside the function by calling `yourContext.anyValueOrMethod`

### Modules created:
- **react-01-basics** - basics of creating a React application
- **react-02-assignment** - first assignment of creating two components with two-way binding
- **react-03-assignment-two** - second assignment on two-way binding with lists
- **react-04-advanced-copy-of-01** - restructured version of 01 with additions
- **react-05-burger-builder** - an example of real-life React applicatioon
