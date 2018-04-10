import React, { Component } from 'react';
import _s from 'assets/css/ServiceForm.css';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import { mapAndConnect, IManagedService, ManagedService} from "services";
import {Redirect} from "react-router";

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


import { get, set, has, cloneDeep } from 'lodash';


export class ObjectInput extends Component{
  constructor(props){
    super(props);

    this.state = {
      value: {}
    }
  }

  componentDidMount(){
    this._updateFields(this.props);
  }

  componentWillReceiveProps(nextProps){
    this._updateFields(nextProps);
  }

  _updateFields(props){
    let nmap = {};
    React.Children.forEach(props.children, child => {
      let props = child.props;
        
      if(props.name){
        if(!has(this.state.value, props.name)){
          set(nmap, props.name, props.value != null ? props.value : props.defaultValue);
        }else{
          set(nmap, props.name, get(this.state.value, props.name));
        }
      }
    });
    if(props.object != null){
      
    }
    this.setState({
      value: nmap
    })
  }

  onFieldChange(name, nval){
    set(this.state.value, name, nval);



    let object = cloneDeep(this.state.value);
    this.setState({
      value: object
    });
    
    if(this.props.map) {
      object = this.props.map(object);
    }
    
    if(this.props.onChange){
      this.props.onChange(object);
    }
  }


  render(){
    const inputs = React.Children.map(this.props.children, (field) => {
      let onChange = (...a) => {
        this.onFieldChange(field.props.name, a[1]);
        if(field.props.onChange){
          field.props.onChange(...a);
        }
      }

      return React.cloneElement(field, {
        onChange: onChange
      });
    });
    return (
      <div>
        {inputs}
      </div>
    );
  }
}