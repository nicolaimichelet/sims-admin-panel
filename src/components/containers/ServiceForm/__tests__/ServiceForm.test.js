import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from 'components/containers/App';
import { ServiceProvider, IAuthService, AuthServiceMock, ServiceManager, ConfigServiceProvider, HttpServiceInterface, HttpServiceProvider, ManagedServiceServiceMock, ErrorService } from 'services';
import { THEME } from 'common/constants';

import { mount, shallow } from 'enzyme';
import ServiceForm from 'components/containers/ServiceForm/ServiceForm';

import { InputDebounce } from 'components/misc/InputDebounce';
import { ListInput } from "components/misc/ListInput";


describe('ServiceForm', () => {

  let serviceManager;
  beforeAll(() => {
    serviceManager = new ServiceManager();
    serviceManager.registerService(ErrorService);
    serviceManager.registerService(ConfigServiceProvider, null);
    serviceManager.registerService(HttpServiceProvider);
    serviceManager.registerService(AuthServiceMock);
    serviceManager.registerService(ManagedServiceServiceMock);

    const auth = serviceManager.getService(IAuthService);
    auth.login("none");
    
  });

  const setup = () => {
    const wrapper = mount(mount(
      <ServiceProvider serviceManager={serviceManager}>
        <MuiThemeProvider  muiTheme={THEME}>
          <ServiceForm />
        </MuiThemeProvider>
      </ServiceProvider>,
    ).at(0).at(0).get(0));
    return wrapper;
  };

  it('renders ServiceForm with admin user and no props', () => {
    const wrapper = setup();
  });

  describe('Form Inputs', () => {
    it('should respond to input and change state of ServiceForm', (done) => {
      const wrapper = setup();
      const serviceHrefField = wrapper.find( {hintText: "Reference of the service..." }).filter('TextField');
      const categoryField = wrapper.find( {hintText: "Enter category..." }).filter('TextField');
      const nameField = wrapper.find( {hintText: "Enter name..." }).filter('TextField');
      const typeField = wrapper.find( {hintText: "Enter type..." }).filter('TextField');
      const descriptionField = wrapper.find( {hintText: "Description of the service..." }).filter('TextField');

      categoryField.simulate('change', { value: 'RFS'});
      nameField.simulate('change', { value: 'Email'});
      typeField.simulate('change', { value: 'Good'});
      descriptionField.simulate('change', { value: 'Description of email service'});

      setTimeout( () => {
        try {
          expect(serviceHrefField.value).toEqual('google.com');
          expect(categoryField.props().value).toEqual('RFS');
          expect(nameField.props().value).toEqual('Email');
          expect(typeField.props().value).toEqual('Good');
          expect(descriptionField.props().value).toEqual('Description of email service');
          done()
        }
        catch (error) {
          done.fail(error);
        }
      }, 400);
    });

    it('toggle buttons in the ServiceForm', (done) => {
      const wrapper = setup();
      const serviceEnabled = wrapper.find( {label: "Is the service enabled?"}).filter('Toggle');
      const serviceStarted = wrapper.find( {label: "Has the service started?"}).filter('Toggle');
      const serviceStateful = wrapper.find( {label: "Can this service be changed without affecting any other service?"}).filter('Toggle');

      serviceEnabled.simulate('toggle', {toggled: true});
      serviceStarted.simulate('toggle', {toggled: true});
      serviceStateful.simulate('toggle', {toggled: true});

      setTimeout( () => {
        try {
          expect(serviceEnabled.props().toggled).toBeTruthy();
          expect(serviceStarted.props().toggled).toBeTruthy();
          expect(serviceStateful.props().toggled).toBeTruthy();
          done();
        }
      catch (error) {
          done.fail(error);
        }
      }, 500);
    });

    it('sets dropdown menus in the ServiceForm', (done) => {
      const wrapper = setup();
      const startMode = wrapper.find( {hintText: 'Start mode...'}).filter('SelectField');
      const state = wrapper.find( {hintText: 'State of the service...'}).filter('SelectField');

      startMode.simulate('change', {value: 'Unknown'});
      state.simulate('change', {value: 'Active'});

      setTimeout( () => {
        expect(startMode.props().value).toEqual('Unknown');
        expect(state.props().value).toEqual('Active');
        done()
      }, 500);
    });

    it('sets Datepickers in the ServiceForm', (done) => {
      const wrapper = setup();
      const orderDate = wrapper.find( {hintText: 'Order Date'}).filter('DatePicker');
      const startDate = wrapper.find( {hintText: 'Start Date'}).filter('DatePicker');
      const endDate = wrapper.find( {hintText: 'End Date'}).filter('DatePicker');


      orderDate.simulate('change', {value: 'Tuesday, May 15, 2018'});
      startDate.simulate('change', {value: 'Wednesday, May 16, 2018'});
      endDate.simulate('change', {value: 'Thursday, May 17, 2018'});


      setTimeout( () => {
        expect(orderDate.props().value).toEqual('Tuesday, May 15, 2018');
        expect(startDate.props().value).toEqual('Wednesday, May 16, 2018');
        expect(endDate.props().value).toEqual('Thursday, May 17, 2018');
        done()
      }, 400);
    });

    it('sets service specification in ServiceForm', (done) => {
      const wrapper = setup();
      const name = wrapper.find({hintText: 'Name of the service specification...'}).filter('TextField');
      const hrefSpec = wrapper.find({hintText: 'Href of the service specification...'}).filter('TextField');
      const versionSpec = wrapper.find({hintText: 'Version of service specification...'}).filter('TextField');

      name.simulate('change', {value: 'Name of spec'});
      hrefSpec.simulate('change', {value: 'Href of spec'});
      versionSpec.simulate('change', {value: 'Version of spec'});

      setTimeout( () => {
        expect(name.props().value).toEqual("Name of spec");
        expect(hrefSpec.props().value).toEqual("Href of spec");
        expect(versionSpec.props().value).toEqual("Version of spec");
        done()
      }, 400);
    });

    it('fills out related parties in ServiceForm', (done) => {
      const wrapper = setup();
      const name = wrapper.find({hintText: 'Name of the related party...'}).filter('TextField');
      const role = wrapper.find({hintText: 'Role of the related party...'}).filter('TextField');
      const href = wrapper.find({hintText: 'Href of the related party...'}).filter('TextField');

      name.simulate('change', {value: 'Related Party'});
      role.simulate('change', {value: 'Related Role'});
      href.simulate('change', {value: 'tobeOrNot.com'});

      setTimeout (() => {
        try {
          expect(name.props().value).toEqual("Related Party");
          expect(role.props().value).toEqual("Related Role");
          expect(href.props().value).toEqual("tobeOrNot.com");
          done();
        }
        catch (error) {
          done.fail(error);
        }
      }, 400);
    });

    it('clicks new and renders fields in ServiceForm', (done) => {
      const wrapper = setup();

      const newButton = wrapper.find({label: 'New'}).filter('RaisedButton');
      newButton.forEach( (button) => {
        button.simulate('click');
      });

      const nameSerChar = wrapper.find( {hintText: 'Name of service characteristic...'}).filter('TextField');
      nameSerChar.simulate('change', {value: "Name of SerChar"});

      setTimeout( () => {
        expect(nameSerChar.props().value).toEqual('Name of SerChar');
        done()
      }, 400);
    });

  })
});



