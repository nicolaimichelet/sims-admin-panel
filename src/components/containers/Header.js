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
import IconButton from "material-ui/IconButton";
import { IAuthService, mapAndConnect } from 'services';
import 'typeface-roboto';
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
          }
      }
      const muiTheme = getMuiTheme({
          palette: {
              primaryColor: lightGreen300,
              primary2Color: lightGreen900,
              accent1Color: lightGreen400,
              accent2Color: lightGreen900,
              disabledColor: lightGreen900,
              textColor: grey50,
          },
          raisedButton: {
              fontFamily: 'roboto',
              fontWeight: '300',
          },
          flatButton: {
              fontFamily: 'roboto',
              fontWeight: '300',
          }
      });
    const path = this.props.location.pathname;
    const toolbar = [
      <MuiThemeProvider muiTheme={muiTheme}>
        <Link key={1} to="/services">
        {path == "/services" ? 
          <RaisedButton style={textStyle.buttons} secondary={true} label="Services" /> :
          <FlatButton style={textStyle.buttons} hoverColor={lightGreen400} rippleColor='transparent' label="Services" />}
        </Link>
        {this.props.user && this.props.user.isAdmin() ?
        <Link key={3} to="/services/new">
          {path == "/services/new" ?
            <RaisedButton style={textStyle.buttons} secondary={true} label="New Service" /> :
            <FlatButton style={textStyle.buttons} hoverColor={lightGreen400} rippleColor='transparent' label="New Service" />}
        </Link> : null}
        {/*<Link key={4} to="/login">*/}
          <IconButton onClick={() => this.props.auth.logout()} hoverColor={lightGreen400} iconClassName = "material-icons" 

          rippleColor='transparent' tooltip="Exit">exit_to_app</IconButton>
       {/*</Link>*/}
      </MuiThemeProvider>
    ];

    return(
          <AppBar
              title={<div><img src={logo} style={{height: '60px', align: 'right', marginTop: '2px'}} alt="logo"/><img src={logoname} style={{height: '30px', margin: '15px'}} alt="logo"/></div>}
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