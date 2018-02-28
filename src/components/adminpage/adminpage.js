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



    delete(hit) {
        const newState = this.state.hits.slice();
        if (newState.indexOf(hit) > -1) {
            newState.splice(newState.indexOf(hit), 1);
            this.setState({hits: newState});
        }
        return fetch(hit, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then((json) => {
            })
        .catch(error => error);
    }

    render() {
        const {hits} = this.state;
        return (
            <div>
                {this.state.text}
                {hits.map(hit =>
                    <div key={hit.objectID}>
                    <a href={hit.url}>{hit.title}</a><btn onClick={this.delete.bind(this, hit)}>Delete</btn>
                </div>    
                )
                }
            </div>


        );
    }
}