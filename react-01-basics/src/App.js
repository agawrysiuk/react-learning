import React, {Component} from 'react';
import './App.css';
import Person from "./Person/Person";
import styled from 'styled-components'

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
    // lastly, we set new state with the new array
    deletePersonHandler = personIndex => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    // here, once again we do it without mutating the state
    // first, we find the index of a right person, get the person from array and create a new object
    // then, we modify it and put it into the array in the place of an original person
    // lastly, we set new state with the new array
    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        const person = {...this.state.persons[personIndex]};
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons})
    }

    togglePersonHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
    }

    render() {
        // not possible to style "hover" or "focus" without radium
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            // radium styles below
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        // styles with 'styled-components'
        const StyledButton = styled.button`
            background-color: ${props => props.alt ? 'red' : 'green'};
            color: white;
            font: inherit;
            border: 1px solid blue;
            padding: 8px;
            cursor: pointer;
            
            &:hover {
                background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
                color: black;
            }
        `;

        // Radium is a popular package for react which allows us to use inline styles with pseudo selectors and media queries
        // npm install --save radium

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
                                changed={(event) => this.nameChangedHandler(event, person.id)}
                                click={this.deletePersonHandler.bind(this, index)}
                                name={person.name}
                                age={person.age}/>
                        );
                    })}
                </div>
            );

            style.backgroundColor = 'red';
            style[':hover'] = {
                backgroundColor: 'salmon',
                color: 'black'
            }
        }

        let classes = [];
        if (this.state.persons.length <= 2) {
            classes.push('red');
        }

        if (this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
                // our JSX element must have exactly one root element -> div here
                //  it's best to wrap everything in one root component
                //  class is a reserved word in JSX, that's why we use className
                <div className="App">
                    <h1>Hi, I'm a React App</h1>
                    {/* classes.join ---> "red" lub "red bold" */}
                    <p className={classes.join(' ')}>This is really working!</p>
                    {/* One way to pass function with properties is below, but may be inneficient performance-wise, better use .bind() */}
                    {/* <button style={style} onClick={() => this.switchNameHandler("ASD")}>Switch name</button>*/}
                    {/* <button style={style} onClick={this.switchNameHandler.bind(this, "Maximilian")}>Switch name</button>*/}
                    {/* <button style={style} onClick={this.togglePersonHandler}>Toggle Person</button>*/}
                    <StyledButton alt={this.state.showPersons} onClick={this.togglePersonHandler}>Toggle Person</StyledButton>
                    {persons}
                </div>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Does this work?"));
    }
}

// radius need to wrap the app
export default App;
