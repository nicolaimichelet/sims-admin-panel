import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router-dom';
import _s from 'assets/css/LoginForm.css';

export default class LoginForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      popoverEnabled: false,
      popoverTarget: null,
      href: props.initialValue,
      auth: "",
      username: "",
      password: "",
    },
    this.possibleAuth = ["None", "BasicAuth", "Guest"];
    this.mapMethod = ["none", "basic_auth", "guest"];
  }

  onInputChange(href){
    this.setState({
      href: href
    });
  }

  onSetAuth(value){
    this.setState({
      auth: value,
    });
  }

  onSetUsername(value){
    this.setState({
      username: value
    })
  }

  onSetPassword(value){
    this.setState({
      password: value
    })
  }

  setPopover(enable, target){
    this.setState({
      popoverEnabled: enable,
      popoverTarget: target
    });
  }


  submit(){

    let settings = {
      username: this.state.username,
      password: this.state.password
    };
    let href = this.state.href || this.props.defaultValue || "";
    let method = this.mapMethod[this.state.auth];

    this.props.onSubmit(href, method, settings); 
  }

  render(){

    const popOverElements = [];
    const options = this.props.options || [

    ]
    for(let i in options){
      let e = options[i];
      popOverElements.push(
        <MenuItem key={i} primaryText={e.href} />
      );
    }


    const authItems = this.possibleAuth.map((t, number) => {
      return <MenuItem value={number} key={number} primaryText={t}/>
    });

    return (
      <Paper
        className={_s.login}
        zDepth={4}
      >
        <Paper className={_s["login-header"]} zDepth={0}>
          <h1>SIMS</h1>
        </Paper>
        <Paper className={_s["login-body"]} zDepth={0}>
          <TextField 
            style={{width: "100%"}}
            hintText={this.props.defaultValue}
            value={this.state.href}
            floatingLabelText="SIMS API BASE URI"
            onChange={(e, v) => this.onInputChange(v)}
            errorText={this.props.errorText}
            onFocus={
              (e) => {
                //this.setPopover(true, e.target); 
                return e.stopPropagation();
              }
            }
            onBlur={
              (e) => {
                //this.setPopover(false, e.target)
                return e.stopPropagation();
              }
            }
          />


          <div>
            <SelectField onChange={(e,v) => this.onSetAuth(v)} value={this.state.auth} hintText="Choose authentication...">
              {authItems}
            </SelectField>
          </div>

          {this.state.auth === 1 ? <div>
            <TextField onChange={(e,v)=> this.onSetUsername(v)} value={this.state.username}
                          hintText="Enter username" floatingLabelText="Username"/>
            <TextField onChange={(e,v)=> this.onSetPassword(v)} value={this.state.password} type="password"
                        hintText="Enter password" floatingLabelText="Password"/>
          </div> : null}




        <RaisedButton
          primary={true}
          label="Connect"
          onClick={() => this.submit()}
        />


          <Popover
            open={this.state.popoverEnabled}
            anchorEl={this.state.popoverTarget}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <Menu>
              {popOverElements}
            </Menu>
          </Popover>
        </Paper>
      </Paper>
    );
  }
}