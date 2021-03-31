import React from 'react';
import cssClasses from "./Cockpit.css";
import Aux from "../hoc/Auxiliary"

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
        <Aux>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass.join(' ')} onClick={() => props.clicked()}>Toggle Person
            </button>
        </Aux>
    );
}

export default React.memo(cockpit);
