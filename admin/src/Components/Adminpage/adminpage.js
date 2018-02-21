import React, { Component } from 'react';
import '../Containers/App.css';

export default class adminpage extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: "Initial text"
        };
    }
    componentWillMount(){

    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}