import React, { Component } from 'react';
import '../Containers/App.css';
import {API} from '../../api.js';

const DEFAULT_QUERY = 'redux';

export default class adminpage extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            text: "Initial text",
            hits: [],
        };
    }
    componentDidMount(){
    this.setState({hits: API.hits})
    }



    render() {
        const {hits} = this.state;
        return (
            <div>
                {this.state.text}
                {hits.map(hit =>
                    <div key={hit.objectID}>
                    <a href={hit.url}>{hit.title}</a>
                </div>    
            )
                }
            </div>


        );
    }
}