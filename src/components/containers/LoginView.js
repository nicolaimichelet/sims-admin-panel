import React, { Component } from 'react';

import LoginForm from 'components/misc/LoginForm';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import { DEFAULT_API } from 'common/constants';

import {Router, Switch, Route, Redirect} from 'react-router';

import { mapAndConnect, IManagedService, ConfigServiceInterface, IAuthService } from 'services';

import _s from 'assets/css/LoginView.css';

import {lightGreen300} from 'material-ui/styles/colors';


/* Simple login page for the admin panel */
export class LoginView extends Component{
  constructor(props){
    super(props);
    this.initialValue = this.props.config.getItem("SIMS-BASE");
    this.state = {
      error: false,
      errorText: "",
      success: false
    }
  }


  onConnect(baseUrl, authType, settings){
    this.props.config.setItem("SIMS-BASE", baseUrl);
    // Try to fetch services to see if endpoint exists
    // Temp solution
    this.props.auth.login(authType, settings).subscribe(() => {
      this.props.imService.getServices().subscribe(() => {
        // Success
        this.setState({
          success: true
        });
      }, (err) => {
        // Fail
        this.setState({
          errorText: err instanceof Response ? `HTTP ERROR: ${err.status} - ${err.statusText}` : "Connection failed!" 
        });
      });
    });
  }

  render(){
    return (
      <div className={_s["form-container"]}>
        {
          !this.state.success ? <LoginForm 
            onSubmit={(...a) => this.onConnect(...a)}
            initialValue={this.initialValue}
            defaultValue={DEFAULT_API}
            errorText={this.state.errorText}
          /> : <Redirect to="/services" />
        }
      </div>
    );
  }
}

export default mapAndConnect(LoginView, {
  imService: IManagedService,
  config: ConfigServiceInterface,
  auth: IAuthService
})