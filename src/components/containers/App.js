import React, { Component } from 'react';
import Header from './Header';
import 'assets/css/App.css';

import {Router, Switch, Route, Redirect} from 'react-router';
import AdminPage from './AdminPage';
import LoginView from './LoginView';
import ServiceForm from 'components/containers/ServiceForm/ServiceForm';
import ServiceEditForm from 'components/containers/ServiceForm/ServiceEditForm';
import DetailView from './DetailView';
import { IAuthService, mapAndConnect } from 'services';


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: null
    }
    this.doRedirect = false;
  }

  componentDidMount(){
    this.props.auth.onUserChange().subscribe(user => {
      console.log(user);
      this.setState({
        redirect: user ? "/services" : "/login",
        user: user
      });
      this.doRedirect = true;
    })
  }

  render() {

    let redirect = this.doRedirect ? <Redirect to={this.state.redirect} /> : null;
    this.doRedirect = false;
    return (
      <div>
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
              <Route path='/' render={(props) => <Header user={this.state.user} {...props} />} />
              <Switch>
                <Route path='/services' exact={true} render={(props) => <AdminPage user={this.state.user} {...props} />}/>
                <Route path= '/services/new' exact={true} render={(props) => <ServiceForm {...props} />}/>
                <Route path= '/services/edit/:id' exact={true} render={(props) => <ServiceEditForm {...props} />}/>
                <Route path= '/services/:id' exact={true} render={(props) => <DetailView user={this.state.user} {...props} />}/>
              </Switch>
            </div>
          );
        }}/>
      </Switch>
      {redirect}
      </div>
    )
  }
}


export default mapAndConnect(App, {
  auth: IAuthService
})
