import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import withClass from "../../../hoc/WithClass";
import Auxiliary from "../../../hoc/Auxiliary";
import AuthContext from '../../../context/auth-context';

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
    }

    static contextType = AuthContext;

    // in the class child component, you get props and state with "this.props"
    render() {
        return (
            <Auxiliary>
                {/*<AuthContext.Consumer>{context => <p>{context.authenticated ? 'Authenticated!' : 'Please log in'}</p>}</AuthContext.Consumer>*/}
                <p>{this.context.authenticated ? 'Authenticated!' : 'Please log in'}</p>
                <p onClick={this.props.click}>I'm a {this.props.name} and with age
                    of: {this.props.age ? this.props.age : getRandomNumber()}!</p>
                {this.props.children ? <p>{this.props.children}</p> : null}
                {this.props.changed
                    ? <input
                        // ref={inputEl => this.inputElement = inputEl}
                        ref={this.inputElementRef}
                        type="text"
                        onChange={this.props.changed}
                        value={this.props.name}/>
                    : null
                }
            </Auxiliary>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

const getRandomNumber = () => Math.floor(Math.random() * 30);

export default withClass(Person, classes.Person);
