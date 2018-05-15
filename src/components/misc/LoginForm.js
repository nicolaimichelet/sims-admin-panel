import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {lightGreen600, lightGreen400, lightGreen300} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Link } from 'react-router-dom';
import _s from 'assets/css/LoginForm.css';
import logo from 'assets/logo/logo.png';

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
    console.log(value);
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
    console.log("Popover change", enable, target);
    this.setState({
      popoverEnabled: enable,
      popoverTarget: target
    });
  }

  isAuthTrue (){
    if (this.state.auth === 0 || this.state.auth === 1 || this.state.auth ===2 ) {
      return true;
    }
  }


  render(){

    const muiTheme = getMuiTheme({
        raisedButton: {
          primaryColor: lightGreen400,
        }
      });

    const popOverElements = [];
    const options = this.props.options || [

    ]
    for(let i in options){
      let e = options[i];
      console.log(e.href);
      popOverElements.push(
        <MenuItem key={i} primaryText={e.href} />
      );
    }

    const isAuth = this.isAuthTrue();
    console.log(this.possibleAuth[this.state.auth]);

    const authItems = this.possibleAuth.map((t, number) => {
      return <MenuItem value={number} key={number} primaryText={t}/>
    });

    return (
      <Paper
        className={_s.login}
        zDepth={4}
      >
        <Paper className={_s["login-header"]} zDepth={0}>
          <img src={logo} style={{height: '60px',   marginLeft: 'auto', marginRight: 'auto', display: 'block'}} alt='logo' />
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
          <MuiThemeProvider muiTheme={muiTheme}>

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
            onClick={() => this.props.onSubmit(this.state.href || this.props.defaultValue || "", this.possibleAuth[this.state.auth].toLowerCase())}
            disabled={!isAuth}
          />
          </MuiThemeProvider>

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