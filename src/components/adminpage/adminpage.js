import React, { Component } from 'react';

import 'assets/css/App.css';
import 'assets/css/adminpage.css';

import {API} from 'api.js';

import { connectServices, mapServicesToProps, HttpServiceInterface } from 'services';

const DEFAULT_QUERY = 'redux';

export class adminpage extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            services: [],
        };
    }
    componentDidMount(){
        console.log("HttpService", this.props.http)
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
        const {services} = this.state;

        return (
            <div>
                <div id="borders">
                <h1>Services</h1>
                {services.map(hit =>
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

export default connectServices((serviceManager) => mapServicesToProps(serviceManager, {
    "http": HttpServiceInterface
}))(adminpage)