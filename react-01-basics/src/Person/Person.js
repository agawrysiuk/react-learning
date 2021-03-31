import React, {useEffect} from 'react';
// import './Person.css';
import styled from 'styled-components'

// in a simplest form, component is a function that returns a JSX
const Person = (props) => {
    // styles with media queries
    // const style = {
    //     '@media(min-width: 500px)': {
    //         width: '450px'
    //     }
    // };

    // styles with media queries using styled-components
    // styled-components generate css classes with random names which have the properties we set
    const StyledDiv = styled.div`
            width: 60%;
            margin: 16px auto;
            border: 1px solid #eee;
            box-shadow: 0 2px 3px #cccccc;
            padding: 16px;
            text-align: center;

            @media(min-width: 500px) {
                    width: 450px;
            }
    `;

    // mocking error
    if(Math.random() > 0.9) {
        throw new Error('Something went wrong');
    }

    // React Hook for functional components (most often used next to useState())
    // it's a function that will run for every render cycle
    // you can send http requests here...
    // first parameter is a function to run, second is an input that will be checked -> if it has changed, the function will run
    // you can put as many useEffect() functions as you want
    useEffect(() => {
        console.log("useEffect() called from Person.js");
    }, [props.name]);

    // you can call the below function same as didComponentMount but for the functional components
    // it's called only once
    // you need to provide it with empty array at the end for it to be called as it would be didComponentMount lifecycle
    useEffect(() => {
        console.log("This is called once.")
    }, []);

    // by returning a function, it will be used only once, when the component is about to be destroyed
    // if you don't specify a second argument (an array, empty or not), this function will run with every render() call
    useEffect(() => {
        console.log("This is called once.");
        return () => {
            console.log("And this is called only once, before the component gets destroyed.")
        }
    }, []);

    return (
        // <div className="Person" style={style}>
        <StyledDiv>
            <p onClick={props.click}>I'm a {props.name} and with age
                of: {props.age ? props.age : getRandomNumber()}!</p>
            {/* this is a way to make a comment in the JSX */}
            {/* below, we pass elements between the opening and closing tags of our component if they exist (no empty <p> tags) */}
            {props.children ? <p>{props.children}</p> : null}
            {props.changed ? <input type="text" onChange={props.changed} value={props.name}/> : null}
        </StyledDiv>
    );
}

const getRandomNumber = () => Math.floor(Math.random() * 30);

export default Person;
