import React from 'react';

//second+ argument are yours
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent />
        </div>
    );
};

// const withClass = props => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );

export default withClass;
