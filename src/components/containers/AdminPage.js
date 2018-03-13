import React, { Component } from 'react';
import 'assets/css/AdminPage.css';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import {Subject} from 'rxjs';
import IconButton from 'material-ui/IconButton'

const DEFAULT_QUERY = 'redux';


const style = {
    padding: "2em"
}

export default class AdminPage extends Component {
    constructor(props){
        super(props);
        this.querySubject = new Subject();
    
        this.state = {
          
            services: [{
                name: "auth",
                href: "/auth",
                
            },
            {
                name: "mdns",
                href: "/mdns1",
                
            },
            {
                name: "SOAP",
                href: "/soap1",
                
            },
            {
                name: "Eskil",
                href: "/bol",
            
            },
            {
                name: "NicoMico",
                href: "/soundcloud",
            
            },
            {
                name: "Kjor",
                href: "/kjiip",
            
            }],
        };
    }
    componentDidMount(){
    //this.setState({services: []})
        this.querySubject.debounceTime(300).distinctUntilChanged().subscribe((a)=> {
            console.log(a)
        })
        this.setState({services : this.state.services})
    }



    delete(service) {
        const newState = this.state.services.slice();
        if (newState.indexOf(service) > -1){
            newState.splice(newState.indexOf(service), 1);
            this.setState({services : newState});
        }
        return fetch(service, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then((json) => {
        })
        .catch(error => error);
    }

    onChange(value){
        this.querySubject.next(value);
    }

    render() {
        const {services} = this.state;
        const serviceElements = [];
        for (let i in services){
            serviceElements.push(
                <ListItem key = {i}>{services[i].name} @href {services[i].href}
                <IconButton onClick = {this.delete.bind(this, services[i])}>Delete</IconButton>
                </ListItem>
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