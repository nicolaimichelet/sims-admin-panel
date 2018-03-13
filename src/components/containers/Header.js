import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import { Link } from 'react-router-dom';
import {orange500} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import _s from 'assets/css/Header.css';

const styles = {
  underline: {
    borderColor: orange500
  }
}

export default class Header extends Component {

  render (){
    const path = this.props.location.pathname
    const toolbar = [
      <Link key={1} to="/services">
        {path == "/services" ? <RaisedButton label="Services" /> : <FlatButton label="Services" />}
      </Link>,
      <Link key={3} to="/services/new">
        {path == "/services/new" ? <RaisedButton secondary label="New Service" /> : <FlatButton label="New Service" />}
      </Link>,
    ];


    return(
      <AppBar
        title={
          "SIMS"
        }
        iconElementLeft={<div/>}
        className={_s.header}
      >
        <ToolbarGroup>
          {toolbar}
        </ToolbarGroup>
      </AppBar>
    )
  }
}
