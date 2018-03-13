import React, { Component } from 'react';

import LoginForm from 'components/misc/LoginForm';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';





/* Simple login page for the admin panel */
export default class LoginView extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <LoginForm />
    );
  }
}