import React from 'react';
import './Person.css';
import Radium from "radium";

// in a simplest form, component is a function that returns a JSX
const Person = (props) => {
    // styles with media queries
    const style = {
        '@media(min-width: 500px)': {
            width: '450px'
        }
    };
    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I'm a {props.name} and with age of: {props.age ? props.age : getRandomNumber()}!</p>
            {/* this is a way to make a comment in the JSX */}
            {/* below, we pass elements between the opening and closing tags of our component if they exist (no empty <p> tags) */}
            {props.children ? <p>{props.children}</p> : null}
            {props.changed ? <input type="text" onChange={props.changed} value={props.name}/> : null}
        </div>
    );
}

const getRandomNumber = () => Math.floor(Math.random() * 30);

export default Radium(Person);
