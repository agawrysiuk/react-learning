import React from 'react';

const validation = (props) => {
    const text = props.inputLength > 5 ? "Text long enough" : "Text too short";
    return (
        <div>
            <p>{text}</p>
        </div>
    );
}

export default validation;
