import React, {Component} from 'react';

import cssClasses from './App.css';
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

class App extends Component {
    state = {
        persons: [
            {id: 'asdfasdf', name: "Max", age: undefined},
            {id: '12341234', name: "Manu", age: 28},
            {id: 'xcvbxcvb', name: "Stephanie", age: 26}
        ],
        otherState: 'some other value',
        showPersons: false
    }

    deletePersonHandler = personIndex => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

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
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    <Persons persons={this.state.persons} clicked={this.deletePersonHandler}
                             changed={this.nameChangedHandler}/>
                </div>
            );
        }

        return (
            <div className={cssClasses.App}>
                <Cockpit
                    title={this.props.title}
                    persons={this.state.persons}
                    showPersons={this.state.showPersons}
                    clicked={this.togglePersonHandler}/>
                {persons}
            </div>
        );
    }
}

export default App;
