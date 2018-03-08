import React, { Component } from 'react';
import '../containers/App.css';
import '../css/adminpage.css';
import {API} from '../../api.js';

const DEFAULT_QUERY = 'redux';

export default class adminpage extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          
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
                <div id="borders">
                <h1>Services</h1>
                {this.state.text}
                {hits.map(hit =>
                    <div key={hit.objectID}>
                        <table>
                            <tbody id="tbody">
                            <tr>
                                <td id="info">
                                    <a>{hit.title}</a>
                                </td>
                                
                                <th id="delete">
                                    <btn onClick={this.delete.bind(this, hit)} >Delete</btn>
                                </th>
                                
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
                }
                </div>
            </div>


        );
    }
}