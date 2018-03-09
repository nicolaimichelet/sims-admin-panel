import React, { Component } from 'react';
import 'assets/css/AdminPage.css';

const DEFAULT_QUERY = 'redux';

export default class AdminPage extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          
            hits: [],
        };
    }
    componentDidMount(){
    this.setState({hits: []})
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
                            <tr>
                                <td >
                                    <a>{hit.title}</a>
                                </td>
                                
                                <td class="delete">
                                    <btn onClick={this.delete.bind(this, hit)} class="badge badge-pill badge-danger">Delete</btn>
                                </td>
                            </tr>
                        </table>
                    </div>
                )
                }
                </div>
            </div>


        );
    }
}