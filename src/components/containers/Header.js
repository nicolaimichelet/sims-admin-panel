import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {ToolbarGroup} from 'material-ui/Toolbar';
import _s from 'assets/css/Header.css';
import IconButton from "material-ui/IconButton";
import { IAuthService, mapAndConnect } from 'services';
import 'typeface-roboto';
import {lightGreen600,lightGreen400, lightGreen300, lightGreen900, grey50} from 'material-ui/styles/colors';

import logo from 'assets/logo/logo.png';
import logoname from 'assets/logo/logoname.png';

export class Header extends Component {

  render (){
      const textStyle ={
          appBar: {
              fontFamily: 'roboto',
              fontWeight: '100',
              fontSize: '40px',
          },
          buttons: {
              fontFamily: 'roboto',
              fontWeight: '100',
              color: 'white',
          },
          iconBtn: {
              color: 'white',
          }
      }

    const path = this.props.location.pathname;

    const adminActions = this.props.user && this.props.user.isAdmin() ?
        <Link key={3} to="/services/new">
            {path == "/services/new" ?
            <RaisedButton style={textStyle.buttons} primary={true} label="New Service" /> :
            <FlatButton style={textStyle.buttons} hoverColor={lightGreen400} rippleColor='transparent' label="New Service" />}
        </Link> : null;

    const toolbar = [
        <Link key={1} to="/services">
          {path == "/services" ? 
          <RaisedButton style={textStyle.buttons} primary={true} label="Services" /> :
          <FlatButton style={textStyle.buttons} hoverColor={lightGreen400} rippleColor='transparent' label="Services" />}
        </Link>,
        adminActions,
        <IconButton 
            onClick={() => this.props.auth.logout()}
            iconStyle={textStyle.iconBtn}
            hoverColor={lightGreen400} iconClassName = "material-icons"
            rippleColor='transparent'
            tooltip="Exit">
                exit_to_app
        </IconButton>
    ];

    return(
          <AppBar
              title={<Link to='/services'><img src={logo} style={{height: '60px', align: 'right', marginTop: '2px'}} alt="logo"/><img src={logoname} style={{height: '30px', margin: '15px'}} alt="logo"/></Link>}
            titleStyle={textStyle.appBar}
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


export default mapAndConnect(Header, {
  auth: IAuthService
});