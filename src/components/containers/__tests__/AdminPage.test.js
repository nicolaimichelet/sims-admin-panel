import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from 'components/containers/App';
import { ServiceProvider, IAuthService, AuthServiceMock, ServiceManager, ConfigServiceProvider, HttpServiceInterface, HttpServiceProvider, ManagedServiceServiceMock, ErrorService } from 'services';
import { THEME } from 'common/constants';

import { mount, shallow } from 'enzyme';
import AdminPage from 'components/containers/AdminPage';
import { TableRow } from 'material-ui';
import { debug } from 'util';


describe('AdminPage', () => {
  let serviceManager;
  beforeAll(() => {
    serviceManager = new ServiceManager();
    serviceManager.registerService(ErrorService);
    serviceManager.registerService(ConfigServiceProvider, null);
    serviceManager.registerService(HttpServiceProvider);
    serviceManager.registerService(AuthServiceMock);
    serviceManager.registerService(ManagedServiceServiceMock);
    
    //auth.login("none");
  });

  it('renders AdminPage with "none" user and no props', () => {
    const auth = serviceManager.getService(IAuthService);
    auth.login("none").subscribe((user)=>{
      expect(user).toBeTruthy();
      const wrapper = mount(
        <ServiceProvider serviceManager={serviceManager}>
          <MuiThemeProvider  muiTheme={THEME}>
            <AdminPage user={user}/>
          </MuiThemeProvider>
        </ServiceProvider>,
      ); 
    }); 
  });

  it('renders AdminPage with "guest" user and no props', () => {
    const auth = serviceManager.getService(IAuthService);
    auth.login("guest").subscribe((user)=>{
      expect(user).toBeTruthy();
      const wrapper = mount(
        <ServiceProvider serviceManager={serviceManager}>
          <MuiThemeProvider  muiTheme={THEME}>
            <AdminPage user={user}/>
          </MuiThemeProvider>
        </ServiceProvider>,
      ); 
    })
  });

  it('renders AdminPage with guest and login ', () => {
    const auth = serviceManager.getService(IAuthService);
    //auth.logout();
    auth.login("guest").subscribe((user)=>{
      expect(user).toBeTruthy();
      expect(user.isAdmin()).toBeFalsy();
      const wrapper = mount(
        <ServiceProvider serviceManager={serviceManager}>
          <MuiThemeProvider  muiTheme={THEME}>
            <AdminPage user={user}/>
          </MuiThemeProvider>
        </ServiceProvider>
      ); 
    const AdminWrapper = wrapper.at(0).at(0);
    expect(AdminWrapper.exists()).toBeTruthy();
    expect(AdminWrapper.find({label:'Delete all'}).exists()).toBeFalsy();
    expect(AdminWrapper.find({label:'Example data'}).exists()).toBeFalsy();
    expect(AdminWrapper.find({label:'Clear search'}).exists()).toBeTruthy();
    });



  });

  it('renders AdminPage with none finds buttons', () => {
    const auth = serviceManager.getService(IAuthService);
    auth.login("none").subscribe((user)=>{
      expect(user).toBeTruthy();
      const wrapper = mount(
        <ServiceProvider serviceManager={serviceManager}>
          <MuiThemeProvider  muiTheme={THEME}>
            <AdminPage user={user}/>
          </MuiThemeProvider>
        </ServiceProvider>
      ); 
      const AdminWrapper = wrapper.at(0).at(0);
      expect(AdminWrapper.exists());
      expect(AdminWrapper.find({label:'Delete all'}).exists()).toBeTruthy();
      expect(AdminWrapper.find({label:'Clear search'}).exists()).toBeTruthy();
    });
  });

  it('renders AdminPage with none, finds raisedbutton', () => {
    const auth = serviceManager.getService(IAuthService);
    auth.login("none").subscribe((user)=>{
      const wrapper = mount(
      <ServiceProvider serviceManager={serviceManager}>
        <MuiThemeProvider  muiTheme={THEME}>
          <AdminPage user={user}/>
        </MuiThemeProvider>
      </ServiceProvider>
      ); 
    const AdminWrapper = wrapper.at(0).at(0);
    expect(AdminWrapper.exists()).toBeTruthy();
    expect(AdminWrapper.find('RaisedButton').exists()).toBeTruthy();
    expect(AdminWrapper.find('RaisedButton')).toHaveLength();
    console.log(AdminWrapper.debug());
    });
  });

  it('fills out search field', () => {
    const auth = serviceManager.getService(IAuthService);
    auth.login("none").subscribe((user) => {
      const wrapper = mount(
        <ServiceProvider serviceManager={serviceManager}>
          <MuiThemeProvider muiTheme={THEME}>
            <AdminPage user={user}/>
          </MuiThemeProvider>
        </ServiceProvider>
      );

      const searchField = wrapper.find('.search')
        .simulate('change', {target: {value: 'service'}});
      console.log(searchField.debug());

    });
  });

});

