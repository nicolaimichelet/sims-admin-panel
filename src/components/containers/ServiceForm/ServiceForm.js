import React, { Component } from 'react';
import _s from 'assets/css/ServiceForm.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import { mapAndConnect, IManagedService, ManagedService} from "services";
import {Redirect} from "react-router";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {lightGreen600, lightGreen400, lightGreen300, lightGreen700, grey50} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

import { ObjectInput } from './ObjectInput';
import { ServiceSpecification } from 'services/sims/ManagedService';




export class ServiceForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        formValues: {
          href: "",
          category: "",
          name: "",
          nameError: "",
          description: "",
          isServiceEnabled: false,
          hasStarted: false,
          startMode: "",
          isStateful: false,
          state: "",
        },
        success: false
      };
      this.possibleStates = ["feasibilityChecked", "designed", "reserved", "active", "inactive", "terminated"];
      this.possibleStartModes = ["Unknown","Automatically by the managed environment","Automatically by the owning device","Manually by the Provider of the Service",
        "Manually by a Customer of the Provider","Any of the above"];
      
      if (props.service){
        this.state.formValues.id = props.service.id;
        this.state.formValues.href = props.service.href;
        this.state.formValues.category = props.service.category;
        this.state.formValues.name = props.service.name;
        this.state.formValues.nameError = props.service.nameError;
        this.state.formValues.description = props.service.description;
        this.state.formValues.isServiceEnabled = props.service.isServiceEnabled;
        this.state.formValues.hasStarted = props.service.hasStarted;
        this.state.formValues.startMode = props.service.startMode;
        this.state.formValues.isStateful = props.service.isStateful;
        this.state.formValues.state = props.service.state;
      }
    }

    onClick(){
      this.setState({
        showAdvanced: !this.state.showAdvanced
      });
    }

    /*When a field changes, we assign the value in the field.*/
    onFieldChange (field, value){
      this.setState({
        formValues: Object.assign({},this.state.formValues, {
          [field]: value
        })
      },() => this.validate())

    }

    validate() {
      const errors = {};

      errors.nameError = this.state.formValues.name === "" ? "Name is a required field" : null;
        this.setState({
          formValues:{
          ...this.state.formValues,
          ...errors
        }});
    };

    canBeSubmitted(){
      const {name} = this.state.formValues;
      return ( name.length > 0);
    }

    submitService(){
      const err = this.validate();
      if (!err) {
        
        let data = Object.assign({},this.state.formValues);
        data.state = this.possibleStates[data.state];
        data.startMode = this.possibleStartModes[data.startMode];

        let service = new ManagedService(data);
        let observable;
        
        if (this.props.service){
          service.id = this.props.service.id;
          observable = this.props.imService.updateService(service);
        }else{
          observable = this.props.imService.postService(service)
        }
        
        observable.subscribe(() => {
          this.setState({
            success: true
          });
        });
      }
    }


    componentDidMount(){
      this.validate();
    }

    render() {
        const muiTheme = getMuiTheme({
            toggle: {
                thumbOnColor: lightGreen600,
                trackOnColor: lightGreen300,
            },
            textField: {
                focusColor: lightGreen300,
            },
            datePicker: {
                selectColor: lightGreen600,
                color: lightGreen600,
                headerColor: lightGreen300,
            },
            flatButton: {
                primaryTextColor: lightGreen700,
            },
            raisedButton: {
                primaryColor: lightGreen400,
            }
        });

      const isEnabled = this.canBeSubmitted();

      const stateMenuItems = this.possibleStates.map((t, number) => {
        return <MenuItem value={number} key={number} primaryText={t}/>
      });

      const startModeItems = this.possibleStartModes.map((t, number) => {
        return <MenuItem value={number} key={number} primaryText={t}/>
      })

      return (
          <Paper className={_s["paper-container"]}>
            <div className={_s["form"]}>
              <MuiThemeProvider muiTheme={muiTheme}>
                {/********************************************** CLASSIC FORM INFO ***************************************/}

                <h1>Add New Service</h1>
                <TextField onChange={(e,v)=> this.onFieldChange("href", v)} value={this.state.formValues.href} className={_s.formtext} hintText="Reference of the service..." floatingLabelText="HREF"/>
                <TextField onChange={(e,v)=> this.onFieldChange("category", v)} value={this.state.formValues.category} className={_s.formtext}  hintText="Enter category..." floatingLabelText="Category"/>
                <TextField onChange={(e,v)=> this.onFieldChange("name", v)} value={this.state.formValues.name} errorText={this.state.formValues.nameError} className={_s.formtext} hintText="Enter name..." floatingLabelText="Name"/>
                <TextField onChange={(e,v)=> this.onFieldChange("description", v)} value={this.state.formValues.description} className={_s.formtext} hintText="Description of the service..." floatingLabelText="Description" multiLine={true} rows={1}/>


                <div className={_s.toggle}>
                  <Toggle onChange={(e,v) => this.onFieldChange("isServiceEnabled", v)} value={this.state.formValues.isServiceEnabled} label="Is the service enabled?" />
                  <Toggle onChange={(e,v)=> this.onFieldChange("hasStarted", v)} value={this.state.formValues.hasStarted} label="Has the service started?" />
                </div>

                <h3 className={_s.dropdown}>Start Mode</h3>
                  <DropDownMenu onChange={(e,v) => this.onFieldChange("startMode", v)} value={this.state.formValues.startMode}>
                    {startModeItems}
                  </DropDownMenu>

                <div className={_s.toggle}>
                  <Toggle onChange={(e,v)=> this.onFieldChange("isStateful", v)} value={this.state.formValues.isStateful} label="Can this service be changed without affecting any other service?"/>
                </div>

                <h3 className={_s.dropdown}>State</h3>
                <DropDownMenu onChange={(e,v) => this.onFieldChange("state", v)} value={this.state.formValues.state}>
                  {stateMenuItems}
                </DropDownMenu>

                <h3>Order date</h3>
                <DatePicker hintText="Order date" />
                <h3>Start date</h3>
                <DatePicker hintText="Start date" />

                <h3>End date</h3>
                <DatePicker className={_s.formtext} hintText="End date" /><br></br>

                {/*Submit button, redirects to services page*/}
                <RaisedButton onClick={()=> {
                  this.submitService();
                }} label="Submit" primary={true} disabled={!isEnabled}/>
                {this.state.success ? <Redirect to="/services" /> : null}
                <h1>test object input</h1>
              <ObjectInput class={ServiceSpecification} onChange={(v) => console.log("new service spec", v)}>
                <TextField name="id" />
                <TextField name="href" />
              </ObjectInput>
              </MuiThemeProvider>

            </div>
          </Paper>

      );
    }
}
export default mapAndConnect(ServiceForm, {
  imService: IManagedService
})
