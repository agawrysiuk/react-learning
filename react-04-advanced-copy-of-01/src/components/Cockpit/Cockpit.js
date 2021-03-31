import React, {useEffect, useRef} from 'react';
import cssClasses from "./Cockpit.css";
import Aux from "../../hoc/Auxiliary"
import AuthContext from '../../context/auth-context';

const cockpit = props => {

    const toggleBtnRef = useRef(null);

    useEffect(() => {
        toggleBtnRef.current.click();
    }, []);

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
            <button ref={toggleBtnRef} className={btnClass.join(' ')} onClick={() => props.clicked()}>Toggle Person
            </button>
            <AuthContext.Consumer>
                {
                    context => <button className={cssClasses.Button} onClick={context.login}>Log in</button>
                }
            </AuthContext.Consumer>
        </Aux>
    );
}

export default React.memo(cockpit);
