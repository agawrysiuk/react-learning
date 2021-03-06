import React, {Component} from 'react';
import AuthContext from '../context/auth-context';

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
        showPersons: false,
        changeCounter: 0,
        authenticated: false
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

        // correct way to setState if you are using previousState!
        this.setState((prevState, props) => {
            return {persons: persons, changeCounter: prevState.changeCounter++}
        })
    }

    togglePersonHandler = () => {
        // correct way to setState if you are using previousState!
        this.setState((prevState, props) => {
            return {showPersons: !prevState.showPersons}
        })
    }

    loginHandler = () => {
        this.setState({authenticated: true});
    }

    render() {
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    <Persons persons={this.state.persons}
                             clicked={this.deletePersonHandler}
                             changed={this.nameChangedHandler}/>
                </div>
            );
        }

        return (
            <div className={cssClasses.App}>
                <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
                    <Cockpit
                        title={this.props.title}
                        persons={this.state.persons}
                        showPersons={this.state.showPersons}
                        clicked={this.togglePersonHandler}/>
                    {persons}
                </AuthContext.Provider>
            </div>
        );
    }
}

export default App;
