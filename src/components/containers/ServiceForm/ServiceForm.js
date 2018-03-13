import React, { Component } from 'react';
import _s from 'assets/css/ServiceForm.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
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
            <TextField className={_s.formtext}  hintText="" floatingLabelText="Category"/><br></br>
            <TextField className={_s.formtext} hintText="" floatingLabelText="Description" multiLine={true} rows={2}/><br></br>

            <div className={_s.toggle}>
                <Toggle label="Has the service started?" />
            </div>
            <TextField className={_s.formtext} hintText="Reference of the service..." floatingLabelText="HREF"/><br></br>
            <TextField className={_s.formtext} hintText="Enter ID..." floatingLabelText="ID"/>

            <div className={_s.toggle}>
                <Toggle label="Is the service enabled?" />
            </div>
            <div className={_s.toggle}>
                <Toggle label="Can this service be changed without affecting any other service?"/>
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


export default class ServiceForm extends Component {
    constructor(props){
      super(props);
      this.state = {StateVal: 1, StartModeVal: 0, showAdvanced: false};
    }
    onClick(){
      this.setState({
        showAdvanced: !this.state.showAdvanced
      });
        
    }

    componentDidMount(){

    }

    render() {
      return (
        <div className={_s.form}>

          {/********************************************** CLASSIC FORM INFO ***************************************/}

          <h3>Add New Service</h3>
          <TextField className={_s.formtext} hintText="Enter name..." floatingLabelText="Name"/><br></br><br></br>
          <h4> Related Party </h4>
          <div className={_s.relatedParty}>
            <TextField hintText="Enter role..." floatingLabelText="Role"/><br></br>
            <TextField hintText="Enter id..." floatingLabelText="ID"/><br></br>
            <TextField hintText="Enter href..." floatingLabelText="HREF"/><br></br>
          </div>
          {/********************************************** ADVANCED FORM  ***************************************/}
          <ShowAdvanced show={this.state.showAdvanced}/>
          <RaisedButton className={_s.advanced} label="Advanced" onClick={this.onClick.bind(this)}/>
          <RaisedButton label="Submit" primary={true} />
        </div>
      );
    }
}
