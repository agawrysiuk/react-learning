import React, {Component} from 'react';
import './App.css';

import Validation from './ValidationComponent/ValidationComponent'
import Char from './CharComponent/CharComponent'

class App extends Component {
    state = {
        userInput: ''
    }
    inputChangeHandler = event => {
        this.setState({userInput: event.target.value})
    }

    deleteCharHandler = charIndex => {
        const text = this.state.userInput.split('');
        text.splice(charIndex, 1);
        const updatedText = text.join('');
        this.setState({userInput: updatedText});
    }

    render() {
        const charList = this.state.userInput.split('').map((ch, index) => {
            return <Char character={ch} key={index} clicked={this.deleteCharHandler.bind(this, index)}/>;
        })
        return (
            <div className="App">
                <ol>
                    <li>Create na input filed (in App component) with a change listener which outputs the length of the
                        entered text below it (e.g. in a paragraph).
                    </li>
                    <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
                    <li>Inside the ValidationComponent, either output "Text too short" or "text long enough" depending
                        on the text length (e.g. take 5 as a minimum length)
                    </li>
                    <li>Create another component (=> CharComponent and style it as an online box (=> display:
                        inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).
                    </li>
                    <li>Render a list of CharComponents where each CharComponent receives a different letter of the
                        entered text (in the initial input field) as a prop.
                    </li>
                    <li>When you click a CharComponent, it should be removed from the entered text.</li>
                </ol>
                <hr/>
                <input type="text" onChange={this.inputChangeHandler} value={this.state.userInput}/>
                <p>{this.state.userInput}</p>
                <Validation inputLength={this.state.userInput.length} />
                {charList}
            </div>
        );
    }
}

export default App;
