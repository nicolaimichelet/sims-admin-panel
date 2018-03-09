import React, { Component } from 'react';
import 'assets/css/ServiceForm.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ServiceForm extends Component {
    constructor(props){
        super(props);
        this.state = {value: 1};
    }

    componentDidMount(){

    }

    handleChange = (event, index, value) => this.setState({value});






    render() {
        return (

            <div>
                <h3>Add New Service</h3>
                <TextField hintText="Enter name..." floatingLabelText="Name"/>
                <h4> Related Party </h4>
                <TextField hintText="Enter role..." floatingLabelText="Role"/>
                <TextField hintText="Enter id..." floatingLabelText="ID"/>
                <TextField hintText="Enter href..." floatingLabelText="HREF"/>

                <RaisedButton label="Advanced" style={style} />
                <RaisedButton label="Submit" primary={true} style={style} />

                <div>
                    <TextField hintText="" floatingLabelText="Category"/>
                    <TextField hintText="" floatingLabelText="Description" multiLine={true} rows={2}/>
                    <DatePicker hintText="End date" />
                    <div style={styles.block}>
                        <Toggle label="Has Started" style={styles.toggle}/>
                    </div>
                    <TextField hintText="Reference of the service..." floatingLabelText="HREF"/>
                    <TextField hintText="Enter ID..." floatingLabelText="ID"/>

                    <div style={styles.block}>
                        <Toggle label="Is the service enabled?" style={styles.toggle}/>
                    </div>
                    <div style={styles.block}>
                        <Toggle label="Can this service be changed without affecting any other service?" style={styles.toggle}/>
                    </div>

                    <DatePicker hintText="Order date" />
                    <DatePicker hintText="Start date" />

                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="Feasibility Checked" />
                        <MenuItem value={2} primaryText="Designed" />
                        <MenuItem value={3} primaryText="Reserved" />
                        <MenuItem value={4} primaryText="Active" />
                        <MenuItem value={5} primaryText="Inactive" />
                        <MenuItem value={6} primaryText="Terminated" />
                    </DropDownMenu>

                    <TextField hintText="Resource type..." floatingLabelText="Type"/>
                    <TextField hintText="Resource type..." floatingLabelText="Type"/>

                </div>


            </div>

        );

        const styles = {
            block: {
                maxWidth: 250,
            },
            toggle: {
                marginBottom: 16,
            }
        };
    }
}