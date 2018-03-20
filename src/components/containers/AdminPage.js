import React, { Component } from 'react';
import _s from 'assets/css/AdminPage.css';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Subject} from 'rxjs';
import Snackbar from 'material-ui/Snackbar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';

import { mapAndConnect, IManagedService } from 'services';


import { DEFAULT_API } from 'common/constants';
import { FlatButton } from 'material-ui';



const DEFAULT_QUERY = 'redux';




export class AdminPage extends Component {
    constructor(props){
      super(props);
      this.querySubject = new Subject();
  
      this.state = {
        services: [],
        lastError: null,
        selected: null,
        open: false,
      };
    }
    componentDidMount(){
      this.querySubject.debounceTime(300).distinctUntilChanged().subscribe((a)=> {
      })
      this.props.imService.getServices().subscribe((services) => {
        this.setState({
          services: services
        });
      });
    }

    handleClickTable(service){
        this.setState({
            open: true,
            selected: service,
        })
        console.log('service clicked')
    }
    
    handleClose(){
        this.setState({
            open: false,
        })
    }



    delete(service) {
      this.props.imService.deleteService(service).subscribe(() => {
        const newState = this.state.services.slice();
        if (newState.indexOf(service) > -1){
          newState.splice(newState.indexOf(service), 1);
          this.setState({services : newState, open: false});
        }
      
      }, (err) => {
        this.setState({
          lastError: err
        });
      });
      
    }

    onChange(value){
      this.querySubject.next(value);
    }

    clearError(){
      this.setState({
        lastError: null
      });
    }

    render() {
      const {services} = this.state;
      const serviceElements = [];
      for (let i in services){
        let e = services[i];
        serviceElements.push(
          <TableRow onRowClick={console.log} className={_s[`state-${e.state}`]
          } key = {i}>
          <TableRowColumn>{e.id}</TableRowColumn>
          <TableRowColumn>{e.name}</TableRowColumn>
          <TableRowColumn>{e.href}</TableRowColumn>
          <TableRowColumn>{e.hasStarted ? 'yes' : 'no'}</TableRowColumn>
          </TableRow>
        )
      }

      return (
        <Paper className={_s["paper-container"]}>
          <h1>Services</h1>
          <TextField 
            onChange = {(e, v)=> this.onChange(v)}
            hintText="Query"
          />
          <br />
          <Table allRowsSelected = {false} onCellClick = {(row)=> this.handleClickTable(this.state.services[row])}>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>href</TableHeaderColumn>
                    <TableHeaderColumn>Has started</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                {serviceElements}
            </TableBody>
          </Table>
          <Snackbar
            open={this.state.lastError != null}
            message={this.state.lastError instanceof Error ? this.state.lastError.toString() : ""}
            autoHideDuration={4000}
            onRequestClose={() => this.clearError()}
          />
          {this.state.selected != null ? 
          <Dialog title = {this.state.selected.name}
          open = {this.state.open}
          onRequestClose = {() => this.handleClose()}
          actions = {[<RaisedButton
            label = 'edit'
            primary = {true}
            
          />,
          <RaisedButton
            label = "delete"
            onClick = { () => this.delete(this.state.selected)}
          />]}
          
          >
            {this.state.selected.description}
            
            
          </Dialog>
          :
          null
          }

        </Paper>
      );
    }
}

export default mapAndConnect(AdminPage, {
  imService: IManagedService
})