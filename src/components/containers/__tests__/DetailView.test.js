import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from 'components/containers/App';
import { ServiceProvider, IAuthService, AuthServiceMock, ServiceManager, ConfigServiceProvider, HttpServiceInterface, HttpServiceProvider, ManagedServiceServiceMock, ErrorService } from 'services';
import { THEME } from 'common/constants';
import { mount, shallow } from 'enzyme';
import AdminPage from 'components/containers/DetailView';
import { TableRow } from 'material-ui';


describe('DetailView', () => {
    let serviceManager;
    beforeAll(() => {
      serviceManager = new ServiceManager();
      serviceManager.registerService(ErrorService);
      serviceManager.registerService(ConfigServiceProvider, null);
      serviceManager.registerService(HttpServiceProvider);
      serviceManager.registerService(AuthServiceMock);
      serviceManager.registerService(ManagedServiceServiceMock);
    })
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
        }); 
    });
    it('renders DetailView with none and finds buttons ', () => {
        const auth = serviceManager.getService(IAuthService);
        //auth.logout();
        auth.login("none").subscribe((user)=>{
            expect(user).toBeTruthy();

            const wrapper = mount(
            <ServiceProvider serviceManager={serviceManager}>
                <MuiThemeProvider  muiTheme={THEME}>
                <AdminPage user={user}/>
                </MuiThemeProvider>
            </ServiceProvider>
            ); 
        const detailWrapper = wrapper.at(0).at(0);
        expect(detailWrapper.exists()).toBeTruthy();
        expect(detailWrapper.find({label:'delete'}).exists()).toBeTruthy();
        expect(detailWrapper.find({label:"edit"}).exists()).toBeTruthy();

        });
    });
});