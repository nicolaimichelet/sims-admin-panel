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
import { paths } from 'common/utils';

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

  isControlled(){
    return this.props.value != null;
  }

  _updateFields(props){
    let nmap = {};
    if(props.value != null){
      for(let atr of paths(props.value) ){
        set(nmap, atr, get(props.value, atr));
      }
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

    const inputs = React.Children.map(this.props.children, (field, idx) => {
      if(field.props.name){
        
        let onChange = (...a) => {
          this.onFieldChange(field.props.name, a[1]);
          if(field.props.onChange){
            field.props.onChange(...a);
          }
        }

        return React.cloneElement(field, {
          onChange: onChange,
          value: this.isControlled() ? get(this.state.value, field.props.name) : undefined,
          key: field.key || field.props.key || idx
        });
      }

      return field;
    });
    return (
      <div>
        {inputs}
      </div>
    );
  }
}