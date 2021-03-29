import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        // our JSX element must have exactly one root element -> div here
        // it's best to wrap everything in one root component
        // class is a reserved word in JSX, that's why we use className
      <div className="App">
        <h1>Hi, I'm a React App</h1>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Does this work?"));
  }
}

export default App;
