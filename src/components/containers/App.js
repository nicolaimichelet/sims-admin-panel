import React, { Component } from 'react';
import Header from './Header';
import 'assets/css/App.css';

import {Router, Switch, Route} from 'react-router';
import AdminPage from 'components/containers/AdminPage';
import ServiceForm from 'components/containers/ServiceForm/ServiceForm';



export default class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' render={() => <Header/>} />
        <Switch>
          <Route path='/services' exact={true} render={() => <AdminPage/>}/>
          <Route path= '/services/new' exact={true} render={() => <ServiceForm/>}/>
        </Switch>
      </div>
    )
  }
}
