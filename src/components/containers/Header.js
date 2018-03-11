import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Link } from 'react-router-dom';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class Header extends Component {

  render (){

    const buttons = [
      <Link to="/services">
        <FlatButton>Services</FlatButton>
      </Link>,
      <ToolbarSeparator />,
      <Link to="/services/new">
        <FlatButton>New Service</FlatButton>
      </Link>,
      <ToolbarSeparator />,
    ]

    return(
      <AppBar
        title="SIMS"
        iconElementLeft={<div/>}
      >
        <ToolbarGroup>
          {buttons}
        </ToolbarGroup>
      </AppBar>
    )
  }
}
