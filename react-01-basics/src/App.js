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
            {id: 'asdfasdf', name: "Max", age: undefined},
            {id: '12341234', name: "Manu", age: 28},
            {id: 'xcvbxcvb', name: "Stephanie", age: 26}
        ],
        otherState: 'some other value',
        showPersons: false
    }

    // switchNameHandler = newName => {
    //     // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    //     // in a regular setState(), like below, the old data will remain and only the new fields will be updated
    //     // in the useState(model, functionToUpdate) Hook for React, the functionToUpdate() overrides model used previously in useState()!
    //     // but you can call useState() several times with different models and different functions to update it
    //     this.setState({
    //         persons: [
    //             {name: newName, age: undefined},
    //             {name: "Manu", age: 28},
    //             {name: "Stephanie", age: 22}
    //         ]
    //     })
    // }

    // here, we do not change the objects set in the state
    // first, we create a new array with persons from the state
    // then, we modify it
    // last, we set new state with the new array
    deletePersonHandler = personIndex => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    togglePersonHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
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

        // every time state changes, React calls render() method, so this part of the code is passed every time the state changes
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    {/* for key, we need a unique id and it can't be a combination of index because index changes! it needs to be a constant id */}
                    {this.state.persons.map((person, index) => {
                        return (
                            <Person
                                key={person.id}
                                click={this.deletePersonHandler.bind(this, index)}
                                name={person.name}
                                age={person.age}/>
                        );
                    })}
                </div>
            );
        }

        return (
            // our JSX element must have exactly one root element -> div here
            // it's best to wrap everything in one root component
            // class is a reserved word in JSX, that's why we use className
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                {/* One way to pass function with properties is below, but may be inneficient performance-wise, better use .bind() */}
                {/*<button style={style} onClick={() => this.switchNameHandler("ASD")}>Switch name</button>*/}
                {/*<button style={style} onClick={this.switchNameHandler.bind(this, "Maximilian")}>Switch name</button>*/}
                <button style={style} onClick={this.togglePersonHandler}>Toggle Person</button>
                {persons}
            </div>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Does this work?"));
    }
}

export default App;
