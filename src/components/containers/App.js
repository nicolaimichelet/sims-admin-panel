import React, { Component } from 'react';
import Header from './Header';
import 'assets/css/App.css';

import {Router, Switch, Route, Redirect} from 'react-router';
import AdminPage from './AdminPage';
import LoginView from './LoginView';
import ServiceForm from 'components/containers/ServiceForm/ServiceForm';



export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" exact={true} render={(props) => {
          return (
            <LoginView {...props} />
          );
        }}/>
        <Route path='/' component={(props) => {
          return (
            <div>
              <Route path='/' exact render={() => <Redirect from="/" to="/login" />} />
              <Route path='/' render={(props) => <Header {...props} />} />
              <Switch>
                <Route path='/services' exact={true} render={(props) => <AdminPage {...props} />}/>
                <Route path= '/services/new' exact={true} render={(props) => <ServiceForm {...props} />}/>
              </Switch>
            </div>
          );
        }}/>
      </Switch>
    )
  }
}
