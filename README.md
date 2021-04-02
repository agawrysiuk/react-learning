# angular-learning

This project with Angular was created as a result of 
my Education Week at Altkom Software & Consulting.

To learn React, I used a 40hrs course on Udemy:

https://www.udemy.com/share/101WayBUUfcltRQno=/

Things I learnt during that week:
- What is React
- What is included in the Next Generation JavaScript
- Components vs Containers (or Stateful vs Stateless)
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
- Sending Http Requests in React using Axios https://github.com/axios/axios
    - Should use `componentDidMount()` for HTTP requests
    - Using request and response interceptors for handling requests/responses and errors `axios.interceptors` https://github.com/axios/axios#interceptors
    - Using request and response interceptors in the wrapper anonymous class, withErrorHandler (with ejecting interceptors)
    - Setting up global configurations
        - Adding base URL with `axios.defaults.baseURL`
        - Adding default headers
            - For every request `axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';`
            - For specific requests `axios.defaults.headers.post['Content-Type'] = 'application-json';`
    - Creating and Using Axios Instances with `const instance = axios.create({...});` and importing it
    as you would do a regular axios to the components
- Setting up and using Firebase
- About Routing and Router Package (which parses URL/Path, reads the config, and render/loads appropriate JSX / Component)
    - Packages `react-router` and`react-router-dom` (`react-router` alone can be omitted in the installation process
    because `react-router-dom` already wraps the former and therefore uses it as a dependency)
    - Wrapping app in BrowserRouter
    - Using Routh components with:
        - render `<Route path="/" exact render={() => <h1>Home</h1>`
        - path `<Route path="/" exact component={YourComponent} />`
        - `exact` tells you that the link not only starts with a given string, but it is truly a full link; without it
        the links that are only partially correct will also load its children components
        - a dynamic path with route parameters: `<Route path="/:id">...`
    - Using Switch:
        - it wraps all Route components and tells the app to load only the first route that matches one from the given list of Routes
        - it doesn't have to wrap all Routes, it can easily go like `<Route /><Switch><Route /><Route /></Switch`
    - Using Link components with:
        - regular string `<Link to="/">Home</Link>`
        - link builder with an object passed: `<Link to={{pathname: '/new-post', hash: '#submit', search: '?quick-submit=true'}}>New Post</Link></li>`
        - possibility to extract these values with `this.props.location.search` or `this.props.location.hash`
    - Using NavLink
        - which additionally sets the given link to `active` in html which helps with styling,
        - defining `exact` in NavLink which helps with setting up `active` class
        - changing active class name with `activeClassName='my-active-class'`...
        - ... or using defined styles with `activeStyle={{color: '#fff'}}`
    - Navigating programmatically with:
        - Regular Links, e.g. `<Link to={'/posts/' + post.id} key={post.id}>`
        - Pushing the new link `this.props.history.push('/' + id);`
    - Routing-Related Props with `history`, `location`, and `match` objects
        - Passing these props to the lower components with `{...props`, explicitly targetting certain routes,
        or wrapping child components with `withRouter` component from `react-router-dom`
    - Paths: Absolute (default) vs Relative (links that append your current path: 
    `<Link to={{pathname: this.props.match.url + '/new-post'}}>...`)
    - Nested Routes 
        - child components with the `Route` component (remember that the parent component can't be `exact`
        and needs the same starting link for example with `this.props.match.url + theRestOfTheLink`)
        - remember about `componentDidUpdate()` when the subcomponent is already loaded with data, otherwise
        it may not rerender
### Modules created:
- **react-01-basics** - basics of creating a React application
- **react-02-assignment** - first assignment of creating two components with two-way binding
- **react-03-assignment-two** - second assignment on two-way binding with lists
- **react-04-advanced-copy-of-01** - restructured version of 01 with additions
- **react-05-burger-builder** - an example of real-life React application
- **react-06-http-requests** - a project to learn about http requests
- **react-06-http-routing** - using Router Package to create a MPA
