import React from 'react';
import cssClasses from "./Cockpit.css";

const cockpit = props => {
    const btnClass = [cssClasses.Button];

    let assignedClasses = [];
    if (props.persons.length <= 2) {
        assignedClasses.push(cssClasses.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(cssClasses.bold);
    }

    if (props.showPersons) {
        btnClass.push(cssClasses.Red);
    }

    return (
        <div>
            <h1>Hi, I'm a React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass.join(' ')} onClick={() => props.clicked()}>Toggle Person
            </button>
        </div>
    );
}

export default cockpit;
