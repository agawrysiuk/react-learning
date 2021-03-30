import React, {Component} from "react";

// do not wrap the entire code in that, only the parts that will fail
class ErrorBoundary extends Component {

    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true, errorMessage: error})
    }

    render() {
        return this.state.hasError
            ? <h1>Something went wrong...</h1>
            : this.props.children;
    }
}

export default ErrorBoundary;
