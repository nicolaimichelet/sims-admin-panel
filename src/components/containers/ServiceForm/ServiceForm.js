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


{/**********************************************************.*********************************************/}
{/********************************************** ADVANCED FIELD IN FORM **********************************/}
{/**********************************************************.*********************************************/}

function ShowAdvanced(props){
  if (!props.show){
    return null;
  }
  return(
    <div>

        <TextField className={_s.formtext} hintText="Enter ID..." floatingLabelText="ID"/>

        <div className={_s.toggle}>
          <Toggle label="Is the service enabled?" />
        </div>
        <div className={_s.toggle}>
          <Toggle label="Can this service be changed without affecting any other service?"/>
        </div>

      <div className={_s.relatedParty}>
        <TextField onChange={(e,v)=> this.onFieldChange("role", v)} value={this.state.formValues.role} hintText="Enter role..." floatingLabelText="Role"/><br></br>
        <TextField onChange={(e,v)=> this.onFieldChange("id", v)} value={this.state.formValues.id} hintText="Enter id..." floatingLabelText="ID"/><br></br>
        <TextField onChange={(e,v)=> this.onFieldChange("href", v)} value={this.state.formValues.href} hintText="Enter href..." floatingLabelText="HREF"/><br></br>
      </div>




        {/********************************************** DATES, MODES, STATE ************************************/}

        <h6>Order date</h6>
        <DatePicker hintText="Order date" />
        <h6>Start date</h6>
        <DatePicker hintText="Start date" />
        <h6>End date</h6>
        <DatePicker className={_s.formtext} hintText="End date" /><br></br>
        {/**
        <h6>Start mode</h6>
        <DropDownMenu StartModeVal={this.state.StartModeVal} onChange={this.handleChangeStart.bind(this)}>
          <MenuItem StartModeVal={0} primaryText="Unknown" />
          <MenuItem StartModeVal={1} primaryText="Automatically by the managed environment" />
          <MenuItem StartModeVal={2} primaryText="Automatically by the owning device" />
          <MenuItem StartModeVal={3} primaryText="Manually by the Provider of the Service" />
          <MenuItem StartModeVal={4} primaryText="Manually by a Customer of the Provider" />
          <MenuItem StartModeVal={5} primaryText="Any of the above" />
        </DropDownMenu>
        <br></br>
        <h6>State</h6>
        <DropDownMenu StateVal={this.state.StateVal} onChange={this.handleChangeState.bind(this)}>
          <MenuItem StateVal={1} primaryText="Feasibility Checked" />
          <MenuItem StateVal={2} primaryText="Designed" />
          <MenuItem StateVal={3} primaryText="Reserved" />
          <MenuItem StateVal={4} primaryText="Active" />
          <MenuItem StateVal={5} primaryText="Inactive" />
          <MenuItem StateVal={6} primaryText="Terminated" />
        </DropDownMenu>
        */}


        {/********************************************** LISTS, TYPES ETC. **************************************/}

        <br></br><TextField className={_s.formtext} hintText="Resource type..." floatingLabelText="Type"/>
        <br></br><TextField className={_s.formtext} hintText="Service order..." floatingLabelText="Service Order Ref"/>
        <br></br><TextField className={_s.formtext} hintText="Service order..." floatingLabelText="Service Order Ref"/>

      </div>
  )

}


export class ServiceForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        formValues: {
          name: "",
          category: "",
          description: "",
          hasStarted: false,
          href: "",
        },
        showAdvanced: false,
        success: false
      }
    }

    onClick(){
      this.setState({
        showAdvanced: !this.state.showAdvanced
      });
        
    }

    onFieldChange (field, value){
      this.setState({
        formValues: Object.assign({},this.state.formValues, {
          [field]: value
        })
      })
    }

    submitService(){
      this.props.imService.postService(new ManagedService(this.state.formValues)).subscribe(() => {
        this.setState({
          success: true
        })
      })
    }

    componentDidMount(){

    }

    render() {
      return (
        <div className={_s.form}>

          {/********************************************** CLASSIC FORM INFO ***************************************/}

          <h1>Add New Service</h1>
          <TextField onChange={(e,v)=> this.onFieldChange("name", v)} value={this.state.formValues.name} className={_s.formtext} hintText="Enter name..." floatingLabelText="Name"/><br></br><br></br>
          <TextField onChange={(e,v)=> this.onFieldChange("category", v)} value={this.state.formValues.category} className={_s.formtext}  hintText="" floatingLabelText="Category"/><br></br>
          <TextField onChange={(e,v)=> this.onFieldChange("description", v)} value={this.state.formValues.description} className={_s.formtext} hintText="" floatingLabelText="Description" multiLine={true} rows={2}/><br></br>

          <div className={_s.toggle}>
            <Toggle onChange={(e,v)=> this.onFieldChange("hasStarted", v)} value={this.state.formValues.hasStarted} label="Has the service started?" />
          </div>
          <TextField onChange={(e,v)=> this.onFieldChange("href", v)} value={this.state.formValues.href} className={_s.formtext} hintText="Reference of the service..." floatingLabelText="HREF"/><br></br>
          {/********************************************** ADVANCED FORM  ***************************************/}
          <ShowAdvanced show={this.state.showAdvanced}/>
          {/*<RaisedButton className={_s.advanced} label="Advanced" onClick={this.onClick.bind(this)}/>*/}
          <RaisedButton onClick={()=> {
            this.submitService();
          }} label="Submit" primary={true} />
          {this.state.success ? <Redirect to="/services" /> : null}
        </div>
      );
    }
}

export default mapAndConnect(ServiceForm, {
  imService: IManagedService
})
