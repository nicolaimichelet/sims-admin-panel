import React, { Component } from 'react';
import _s from 'assets/css/AdminPage.css';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import {lightGreen300, lightGreen400, red700, black} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Subject} from 'rxjs';
import Snackbar from 'material-ui/Snackbar';




import CheckCircle from 'material-ui/svg-icons/action/check-circle'


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router-dom';

import { mapAndConnect, IManagedService } from 'services';


import { DEFAULT_API } from 'common/constants';
import { FlatButton, FontIcon, IconButton } from 'material-ui';


const DEFAULT_QUERY = 'redux';




export class AdminPage extends Component {
    constructor(props){
      super(props);
      this.querySubject = new Subject();
  
      this.state = {
        services: [],
        lastError: null,
        selected: null,
        tableDialog: false,
        deleteDialog: false,
        sortingOrder: "none",
      };
      this.icons = {
        active: "lightbulb_outline",
        inactive: "pause_circle_outline",
        terminated: "highlight_off",
        designed: "announcement",
        reserved: "phone",
      }
    }


    componentDidMount(){
      this.querySubject.debounceTime(300).distinctUntilChanged().subscribe((a)=> {
        this.props.imService.search({name : a}).subscribe((services) => {
          this.setState({
            services: services
          });
        });
      });
      this.props.imService.getServices().subscribe((services) => {
        this.setState({
          services: services
        });
      });
      this.refresh()
    }

    //open Table dialog
    handleClickTable(service){
        this.setState({
            tableDialog: true,
            selected: service,
        });
        console.log('service clicked')
    }

    //opens Delete Dialog
    handleClickDelete(){
      this.setState({
        deleteDialog: true
      });
      console.log('delete all clicked')
    }

    //Handles table dialog, closes it.
    handleTableClose(){
        this.setState({
            tableDialog: false,
        });
    }

    //Handles delete Dialog, closes it.
    handleDeleteClose(){
      this.setState({
            deleteDialog: false,
      })
    }

    changeSorting(type){
      let serviceState = this.state.services;
      
      let order = this.state.sortingOrder;
      if (this.state.lastColumn != type){
        order = "asc"
      }
      
      serviceState.sort((a,b)=> {
        a = a[type] ? a[type] : "";
        b = b[type] ? b[type] : "";
        if(order != "decs"){
          return a.localeCompare(b);
        }
        return b.localeCompare(a);
      })
        
      this.setState({services : serviceState, lastColumn: type, sortingOrder: order != "asc" ? "asc" : "decs"});


    }



    //deletes a specific service on ID
    delete(service) {
      this.props.imService.deleteService(service).subscribe(() => {
        const newState = this.state.services.slice();
        if (newState.indexOf(service) > -1){
          newState.splice(newState.indexOf(service), 1);
          this.setState({services : newState, tableDialog: false});
        }
      }, (err) => {
        this.setState({
          lastError: err
        });
      });
    }

    //deletes all services
    deleteAll(){
      this.props.imService.deleteAll().subscribe( () => {
        this.refresh();
      });
      this.setState({deleteDialog: false})
    }

    //seeds or fills database with 50 services
    seedServices(){
      this.props.imService.seedServices().subscribe( () => {
        this.refresh();
      });
    }

    //Method for refreshing page
    refresh(){
      this.props.imService.getServices().subscribe((services) => {
        this.setState({
          services: services
        });
      });
    }

    onChange(value){
      this.querySubject.next(value); // må gjøre så category funker, eget parameter eller objekt
    }

    clearError(){
      this.setState({
        lastError: null
      });
    }

    render() {
      const {services} = this.state;
      const TableStyle = {
          arrow:{
              fontWeight: 'bold',
              textDecoration: 'none',
          },
          header:{
              backgroundColor:'#DCEDC8',
              color: black,
          }

      }
      const ModuleStyle = {
          title:{
              fontSize: 25,
              fontWeight: 'normal',
          },
          content:{
              fontWeight: 'bold',
              width: '40%',
          },
          rest:{
              fontWeight: 'normal',
              textDecoration: 'none',
          },
          button: {
              marginRight: 12,
            
          }
        }

      const serviceElements = [];
      const muiTheme = getMuiTheme({
            textField: {
                focusColor: lightGreen300,
            },
            raisedButton: {
                primaryColor: lightGreen400,
                secondaryColor: red700,
            },

      });
      for (let i in services){
        let e = services[i];
        const icon = this.icons[e.state];
        serviceElements.push(
          <TableRow className = {_s.tableRow} onRowClick={console.log} key = {i}>
          <TableRowColumn>{e.id}</TableRowColumn>
          <TableRowColumn>{e.name}</TableRowColumn>
          <TableRowColumn>{e.href}</TableRowColumn>
          <TableRowColumn>{e.hasStarted ? 'Yes' : 'No'}</TableRowColumn>
          <TableRowColumn>{e.category}</TableRowColumn>
          <TableRowColumn style={{overflow : 'visable'}}  className={_s[`state-${e.state}`]
          }  >{icon ? <IconButton tooltip= {e.state} iconClassName = "material-icons" > {icon} </IconButton>  : e.state}</TableRowColumn>
          </TableRow>
        )
      }

      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      return (
        <Paper className={_s["paper-container"]}>
          <MuiThemeProvider muiTheme={muiTheme}>
          <h1>Services</h1>
          <TextField 
            onChange = {(e, v)=> this.onChange(v)}
            hintText="Search on Name"
          />

          <RaisedButton className={_s.deleteAll} onClick={ () => {
            this.handleClickDelete()
          }} label="Delete all" secondary={true}/>

          <RaisedButton className={_s.deleteAll} onClick={ () => {
            this.seedServices()
          }} label="Example data" primary={true}/>

          <br />
          <Table allRowsSelected = {false} onCellClick = {(row)=> this.handleClickTable(this.state.services[row])}>
            <TableHeader adjustForCheckbox = {false} displaySelectAll = {false} style = {TableStyle.header}>
              <TableRow style={TableStyle.header} onCellClick={(event,_,idx) => {
                const columns = {
                  [6]: "state",
                  [5]: "category",                   
                }
                if(idx in columns){
                  this.changeSorting(columns[idx]);
                }
              }}>
                    <TableHeaderColumn style={TableStyle.header}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={TableStyle.header}>NAME</TableHeaderColumn>
                    <TableHeaderColumn style={TableStyle.header}>HREF</TableHeaderColumn>
                    <TableHeaderColumn style={TableStyle.header}>HAS STARTED</TableHeaderColumn>
                    <TableHeaderColumn className = {_s.tableHeader} style={TableStyle.header}>CATEGORY ↓</TableHeaderColumn>
                    <TableHeaderColumn className = {_s.tableHeader} style={TableStyle.header}>STATE ↓</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            
            <TableBody displayRowCheckbox = {false}>
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
          <Dialog title = {this.state.selected.name} titleStyle={ModuleStyle.title} contentStyle={ModuleStyle.content}

          open = {this.state.tableDialog}
          onRequestClose = {() => this.handleTableClose()}
          actions = {[<Link to = {`/services/edit/${this.state.selected.id}`} style={ModuleStyle.button}>

            <RaisedButton
              label = 'edit'
              primary = {true}
            
            /></Link>,
          <RaisedButton
            label = "delete"
            onClick = { () => this.delete(this.state.selected)} 
            style={ModuleStyle.button} 
          />,
          <Link to = {`/services/${this.state.selected.id}`} style={ModuleStyle.button}>
            <RaisedButton
              label = 'details'
              primary = {true}
            
            /></Link>
        ]}

          >
          <hr></hr>
          <ul style = {{listStyleType: "none"}}>
            <li>ID: <u style={ModuleStyle.rest}>{this.state.selected.id}</u></li>
            <li>Description: <u style={ModuleStyle.rest}> {this.state.selected.description}</u> </li>
            <li>Status: <u style={ModuleStyle.rest}>{this.state.selected.state}</u></li>
            <li>Is service enabled: <u style={ModuleStyle.rest}>{this.state.selected.isServiceEnabled ? 'Yes' : 'No'} </u></li>
            <li>Category: <u style={ModuleStyle.rest}>{this.state.selected.category}</u></li>
          </ul>
            
          </Dialog>
          :
          null
          }
            <Dialog title="Are you sure you want to delete all services?"
                    open={this.state.deleteDialog}
                    onRequestClose = {() => this.handleDeleteClose()}>
              <RaisedButton
                label = "Delete all"
                onClick = { () => this.deleteAll()}
              />
              <RaisedButton
                label = "Cancel"
                onClick = { () => this.handleDeleteClose()}
              />

            </Dialog>


        </MuiThemeProvider>
        </Paper>
      );
    }
}

export default mapAndConnect(AdminPage, {
  imService: IManagedService
})