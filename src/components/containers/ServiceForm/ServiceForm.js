import React, { Component } from 'react';
import _s from 'assets/css/ServiceForm.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ServiceForm extends Component {
    constructor(props){
        super(props);
        this.state = {value: 1, verdi: 0};
    }

    componentDidMount(){

    }

    handleChange(event, index, verdi){
        this.setState({verdi})
    }
    handleChange2(event, index, value){
        this.setState({value})
    }





    render() {
        return (

            <div className={_s.form}>
                <h3>Add New Service</h3>
                <TextField className={_s.formtext} hintText="Enter name..." floatingLabelText="Name"/><br></br><br></br>
                <h4> Related Party </h4>
                <div className={_s.relatedParty}>
                    <TextField hintText="Enter role..." floatingLabelText="Role"/><br></br>
                    <TextField hintText="Enter id..." floatingLabelText="ID"/><br></br>
                    <TextField hintText="Enter href..." floatingLabelText="HREF"/><br></br>
                </div>
                <br></br>
                <RaisedButton className={_s.advanced} label="Advanced"/>
                <RaisedButton label="Submit" primary={true} />

                <div>
                    <TextField className={_s.formtext}  hintText="" floatingLabelText="Category"/><br></br>
                    <TextField className={_s.formtext} hintText="" floatingLabelText="Description" multiLine={true} rows={2}/><br></br>


                    <h6>End date</h6>
                    <DatePicker className={_s.formtext} hintText="End date" /><br></br>

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
                    <h6>Order date</h6>
                    <DatePicker hintText="Order date" />
                    <h6>Start date</h6>
                    <DatePicker hintText="Start date" />
                    <h6>Start mode</h6>
                    <DropDownMenu verdi={this.state.verdi} onChange={this.handleChange}>
                        <MenuItem verdi={0} primaryText="Unknown" />
                        <MenuItem verdi={1} primaryText="Automatically by the managed environment" />
                        <MenuItem verdi={2} primaryText="Automatically by the owning device" />
                        <MenuItem verdi={3} primaryText="Manually by the Provider of the Service" />
                        <MenuItem verdi={4} primaryText="Manually by a Customer of the Provider" />
                        <MenuItem verdi={5} primaryText="Any of the above" />
                    </DropDownMenu>
                    <br></br>
                    <h6>State</h6>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange2}>
                        <MenuItem value={1} primaryText="Feasibility Checked" />
                        <MenuItem value={2} primaryText="Designed" />
                        <MenuItem value={3} primaryText="Reserved" />
                        <MenuItem value={4} primaryText="Active" />
                        <MenuItem value={5} primaryText="Inactive" />
                        <MenuItem value={6} primaryText="Terminated" />
                    </DropDownMenu>



                    <br></br> <TextField className={_s.formtext} hintText="Resource type..." floatingLabelText="Type"/>
                    <br></br><TextField className={_s.formtext} hintText="Service order..." floatingLabelText="Service Order Ref"/>
                    <br></br><TextField className={_s.formtext} hintText="Service order..." floatingLabelText="Service Order Ref"/>

                </div>


            </div>

        );
    }
}
