import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {ToolbarGroup} from 'material-ui/Toolbar';
import {lightGreen600,lightGreen400, lightGreen300, lightGreen900, grey50} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import _s from 'assets/css/Header.css';

export default class Header extends Component {

  render (){
      const muiTheme = getMuiTheme({
          palette: {
              primaryColor: lightGreen300,
              primary2Color: lightGreen900,
              accent1Color: lightGreen400,
              accent2Color: lightGreen900,
              disabledColor: lightGreen900,
              textColor: grey50
          },
          appBar: {
          }
      });
    const path = this.props.location.pathname;
    const toolbar = [
      <MuiThemeProvider muiTheme={muiTheme}>
        <Link key={1} to="/services">
        {path == "/services" ? 
          <RaisedButton secondary={true} hoverColor={true} label="Services" /> :
          <FlatButton hoverColor={lightGreen400} rippleColor='transparent' label="Services" />}
        </Link>
        <Link key={3} to="/services/new">
          {path == "/services/new" ?
            <RaisedButton secondary={true} label="New Service" /> :
            <FlatButton hoverColor={lightGreen400} rippleColor='transparent' label="New Service" />}
        </Link>
        <Link key={4} to="/login">
          <FlatButton hoverColor={lightGreen400} rippleColor='transparent' label="Exit"/>
        </Link>
      </MuiThemeProvider>
    ];

    return(
          <AppBar
            title="SIMS"
            titleStyle={{fontSize: '220%' }}
            style={{backgroundColor: lightGreen600}}
            iconElementLeft={<div/>}
            className={_s.header}>
              <ToolbarGroup>
              {toolbar}
              </ToolbarGroup>
          </AppBar>
    );
  }
}
