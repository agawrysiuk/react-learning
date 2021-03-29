import React from 'react';

const userInput = (props) => {
    return <input type="text" onChange={props.changeName} value={props.currentName} />;
}

export default userInput;
