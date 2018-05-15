import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog'
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
      helpDialog: false
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

  //opens Help Dialog
  handleHelpClick(){
    this.setState({
      helpDialog: true
    });
    console.log('delete all clicked')
  }

  //Handles help dialog, closes it.
  handleHelpClose(){
    this.setState({
      helpDialog: false,
    });
  }

  setPopover(enable, target){
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
        const ModuleStyle = {
        dialogTitle:{
          fontFamily: 'roboto',
          fontSize: 25,
          fontWeight: '200',
          color: "#FFFFFF"
        },
        content:{
          fontFamily: 'roboto',
          fontWeight: '400',
          width: '40%',
          color: "#FFFFFF"
        },
        button: {
          marginLeft:'40%',
          fontFamily: 'roboto',
          fontWeight: '300',
        },
        rest:{
          fontWeight: '200',
          fontFamily: 'roboto',
          textDecoration: 'none',
          color: "#FFFFFF"
        }
    };
    
    const popOverElements = [];
    const options = this.props.options || [

    ]
    for(let i in options){
      let e = options[i];
      popOverElements.push(
        <MenuItem key={i} primaryText={e.href} />
      );
    }

    const isAuth = this.isAuthTrue()

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
            disabled={!isAuth}
          />


          <RaisedButton style={ModuleStyle.button}
            primary = {true}
            label="Help"
            onClick={() => this.handleHelpClick()}
          />



            <Dialog contentClassName={_s.dialogHelpColor} title="Information about authentication" titleStyle={ModuleStyle.dialogTitle} contentStyle={ModuleStyle.content}
                    open={this.state.helpDialog}
                    onRequestClose = {() => this.handleHelpClose()}>

              <ul style={{listStyleType: "none"}}>
                <li>None: <u style={ModuleStyle.rest}>No form of authentication. This gives you full access to everything</u> </li>
                <li>BasicAuth: <u style={ModuleStyle.rest}>Prompts for username and password. Secure login with basic authentication</u> </li>
                <li>Guest: <u style={ModuleStyle.rest}>Certain features like adding, editing or deleting services are unavailable. No authentication</u></li>
              </ul>

            </Dialog>


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