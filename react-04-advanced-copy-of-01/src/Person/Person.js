import React from 'react';
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
