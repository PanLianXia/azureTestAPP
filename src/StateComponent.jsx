import React from 'react'

export default class StateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 10
        }
    }
    increment() {
        this.setState({
            count: this.state.count+1
        })
    }
    decrement() {
        this.setState({
            count: this.state.count-1
        })
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.increment.bind(this)}>zengjia</button>
                <button onClick={this.decrement.bind(this)}>jianshao</button>
            </div>
        )
    }
}