import React, {Component} from 'react';
import './App.css';
import Person from "./Person/Person";

class App extends Component {
    // state is only available in classes that extend Component
    // (unless it's React Hooks available from 16.8, then it's also available in functional components)
    // it's manageable only from inside
    // state is a special property because it's the only one that forces React to rerender/update our DOM when it changes
    state = {
        persons: [
            {name: "Max", age: undefined},
            {name: "Manu", age: 28},
            {name: "Stephanie", age: 26}
        ],
        otherState: 'some other value'
    }

    switchNameHandler = newName => {
        // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
        // in a regular setState(), like below, the old data will remain and only the new fields will be updated
        // in the useState(model, functionToUpdate) Hook for React, the functionToUpdate() overrides model used previously in useState()!
        // but you can call useState() several times with different models and different functions to update it
        this.setState({
            persons: [
                {name: newName, age: undefined},
                {name: "Manu", age: 28},
                {name: "Stephanie", age: 22}
            ]
        })
    }

    nameChangedHandler = (event) => {
        this.setState({
            persons: [
                {name: 'Max', age: undefined},
                {name: event.target.value, age: 28},
                {name: "Stephanie", age: 22}
            ]
        })
    }

    render() {
        // difficult to style "hover" or "focus"
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        return (
            // our JSX element must have exactly one root element -> div here
            // it's best to wrap everything in one root component
            // class is a reserved word in JSX, that's why we use className
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                {/* One way to pass function with properties, but may be inneficient performance-wise, better use .bind() */}
                <button style={style} onClick={() => this.switchNameHandler("ASD")}>Switch name</button>
                <Person
                    name={this.state.persons[0].name}
                    click={this.switchNameHandler.bind(this, "Maximilian")}/>
                <Person
                    changed={this.nameChangedHandler}
                    name={this.state.persons[1].name}
                    age={this.state.persons[1].age}>I like racing!</Person>
                <Person
                    name={this.state.persons[2].name}
                    age={this.state.persons[2].age}
                    click={this.switchNameHandler.bind(this, "Joseph")}/>
            </div>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Does this work?"));
    }
}

export default App;
