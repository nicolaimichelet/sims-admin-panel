import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {ToolbarGroup} from 'material-ui/Toolbar';
import _s from 'assets/css/Header.css';
import FontIcon from 'material-ui/FontIcon';

export default class Header extends Component {

  render (){
    const path = this.props.location.pathname;
    const toolbar = [
      <Link key={1} to="/services">
        {path == "/services" ? 
          <RaisedButton label="Services" /> : 
          <FlatButton hoverColor='transparent' rippleColor='transparent' label="Services" />}
      </Link>,
      <Link key={3} to="/services/new">
        {path == "/services/new" ? 
          <RaisedButton label="New Service" /> :
          <FlatButton hoverColor='transparent' rippleColor='transparent' label="New Service" />}
      </Link>,
      <Link key={4} to="/login">
        <FlatButton hoverColor='transparent' rippleColor='transparent' label="Exit"/>
      </Link>
    ];

    return(
      <AppBar
        title="SIMS"
        titleStyle={{fontSize: '220%' }}
        iconElementLeft={<div/>}
        className={_s.header}
      >
        <ToolbarGroup>
          {toolbar}
        </ToolbarGroup>
      </AppBar>
    );
  }
}
