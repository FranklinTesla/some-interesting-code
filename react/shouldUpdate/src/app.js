/**
 * ------------------------------------
 * @param {}
 * @export 导出变量
 * ------------------------------------
 */
import React from 'react';
import ReactDOM from 'react-dom';

function shouldUpdate(WrappedComponent) {
    return class extends React.Component {
        shouldComponentUpdate(nextProps) {
            const props = this.props;
            for (let key in props) {
                if (!props.hasOwnProperty(key)) {
                    continue;
                }
                if (nextProps[key] !== props[key]) {
                    return true;
                }
            }
            return false;
        }
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
}

const A = shouldUpdate(class extends React.Component {
    constructor(props) {
        super(props);
        console.log('A is created')
    }
    componentWillUpdate() {
        console.log('A will be updated')
    }
    render() {
        return (
            <p>{this.props.text}</p>
        )
    }
});

const B = shouldUpdate(class extends React.Component {
    constructor(props) {
        super(props);
        console.log('B is created')
    }
    componentWillUpdate() {
        console.log('B will be updated')
    }
    render() {
        return (
            <p>{this.props.text}</p>
        )
    }
});



class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textA: "I'm a",
            textB: "I'm b"
        }
    }
    render() {
        return (
            <div>
                <button onClick={() => this.changeA()}>changeA</button>
                <button onClick={() => this.changeB()}>changeB</button>
                <A text={this.state.textA}/>
                <B text={this.state.textB}/>
            </div>
        )
    }
    changeA() {
        this.setState(function(prevState) {
            return {
                textA: prevState.textA === 'change a'?
                            "I'm a": 'change a'
            }
        });
    }
    changeB() {
        this.setState(function(prevState) {
            return {
                textB: prevState.textB === 'change b'?
                    "I'm b": 'change b'
            }
        });
    }
}


ReactDOM.render(
    <Container/>,
    document.getElementById('root')
)
