import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router-dom';
import _s from 'assets/css/LoginForm.css';

export default class LoginForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      popoverEnabled: false,
      popoverTarget: null,
      href: "http://localhost:3000/api"
    }
  }

  onInputChange(href){
    this.setState({
      href: href
    });
  }

  setPopover(enable, target){
    console.log("Popover change", enable, target);
    this.setState({
      popoverEnabled: enable,
      popoverTarget: target
    });
  }


  render(){

    const popOverElements = [];
    const options = this.props.options || [
      {href: "https://www.google.com/sims"},
      {href: "https://sims.faavne.no"},
      {href: "http://localhost:3000"}
    ]
    for(let i in options){
      let e = options[i];
      console.log(e.href);
      popOverElements.push(
        <MenuItem key={i} primaryText={e.href} />
      );
    }

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
            defaultValue="http://localhost:3000/api"
            value={this.state.href}
            floatingLabelText="SIMS API BASE URI"
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
          <Link to={`${this.state.href}`}>
            <RaisedButton
              primary={true}
              label="Connect"
            />
          </Link>

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