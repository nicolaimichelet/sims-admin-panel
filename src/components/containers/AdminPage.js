import React, { Component } from 'react';
import 'assets/css/AdminPage.css';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import {Subject} from 'rxjs';

import { mapAndConnect, HttpServiceInterface } from 'services';

const DEFAULT_QUERY = 'redux';


const style = {
    padding: "2em"
}

export class AdminPage extends Component {
    constructor(props){
        super(props);
        this.querySubject = new Subject();
    
        this.state = {
            services: [],
        };
    }
    componentDidMount(){
        console.log(this.props.http);
        this.querySubject.debounceTime(300).distinctUntilChanged().subscribe((a)=> {
        })
    }



    delete(service) {

    }

    onChange(value){
        this.querySubject.next(value);
    }

    render() {
        const {services} = this.state;
        const serviceElements = [];
        for (let i in services){
            serviceElements.push(
                <ListItem key = {i}>{services[i].name} @href {services[i].href}</ListItem>
            )
        }
        return (
            <Paper style = {style}>
                <h1>Services</h1>
                <TextField onChange = {(e, v)=> this.onChange(v)}
                hintText="Query"
                /><br />
                <List>{serviceElements}
                </List>
            </Paper>
        );
    }
}

export default mapAndConnect(AdminPage, {
    http: HttpServiceInterface
})