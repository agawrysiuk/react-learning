import React from 'react';
import classes from './Person.css';

const Person = (props) => {
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm a {props.name} and with age
                of: {props.age ? props.age : getRandomNumber()}!</p>
            {props.children ? <p>{props.children}</p> : null}
            {props.changed ? <input type="text" onChange={props.changed} value={props.name}/> : null}
        </div>
    );
}

const getRandomNumber = () => Math.floor(Math.random() * 30);

export default Person;
