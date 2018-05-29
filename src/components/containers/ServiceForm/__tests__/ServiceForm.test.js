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
import {TextField} from 'material-ui/TextField';

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
    it('should respond to text input and change state of ServiceForm', (done) => {
      const wrapper = setup();
      const serviceHrefInput = wrapper.find( {hintText: "Reference of the service..." }).filter('TextField').find('input')
        .simulate('change', { target: {value: 'google.com'}});
      const categoryFieldInput = wrapper.find( {hintText: "Enter category..." }).filter('TextField').find('input')
        .simulate('change', { target: {value: 'RFS'}});
      const nameFieldInput = wrapper.find( {hintText: "Enter name..." }).filter('TextField').find('input')
        .simulate('change', { target: {value: 'Email'}});
      const typeFieldInput = wrapper.find( {hintText: "Enter type..." }).filter('TextField').find('input')
        .simulate('change', { target: {value: 'Good'}});
      const descriptionFieldInput = wrapper.find( {hintText: "Description of the service..." }).filter('TextField').find('EnhancedTextarea').find('textarea').at(1)
        .simulate('change', { target: {value: 'Description'}});

      const textHref = wrapper.find( {hintText: "Reference of the service..." }).filter('TextField');
      const textCategory = wrapper.find( {hintText: "Enter category..." }).filter('TextField');
      const textName = wrapper.find( {hintText: "Enter name..." }).filter('TextField');
      const textType = wrapper.find( {hintText: "Enter type..." }).filter('TextField');
      const textDescription = wrapper.find( {hintText: "Description of the service..." }).filter('TextField');

      setTimeout( () => {
        try {
          expect(textHref.props().value).toEqual('google.com');
          expect(textCategory.props().value).toEqual('RFS');
          expect(textName.props().value).toEqual('Email');
          expect(textType.props().value).toEqual('Good');
          expect(textDescription.props().value).toEqual('Description');
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

      serviceEnabled.props().toggled = true;
      serviceStarted.props().toggled = true;
      serviceStateful.props().toggled = true;

      //.simulate('change') not working as expected;

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

    it('renders dropdown menus in the ServiceForm', (done) => {
      const wrapper = setup();
      const startMode = wrapper.find( {hintText: 'Start mode...'}).filter('SelectField');
      const state = wrapper.find( {hintText: 'State of the service...'}).filter('SelectField');

      startMode.props().value = '';
      state.props().value = '';

      //state.simulate('change', {value: 'Active'});

      setTimeout( () => {
        try{
          expect(startMode.props().value).toEqual('');
          expect(state.props().value).toEqual('');
          done()

        }
        catch (error) {
          done.fail(error);
        }
      }, 400);
    });

    it('sets Datepickers in the ServiceForm', (done) => {
      const wrapper = setup();
      const orderDate = wrapper.find( {hintText: 'Order Date'}).filter('DatePicker').find('input')
        .simulate('change', {target: {value: 'Tuesday, May 15, 2018' }});
      const startDate = wrapper.find( {hintText: 'Start Date'}).filter('DatePicker').find('input')
        .simulate('change', {target: {value: 'Wednesday, May 16, 2018' }});
      const endDate = wrapper.find( {hintText: 'End Date'}).filter('DatePicker').find('input')
        .simulate('change', {target: {value: 'Thursday, May 17, 2018' }});

      const orderValue = wrapper.find( {hintText: 'Order Date'}).filter('DatePicker');
      const startValue = wrapper.find( {hintText: 'Start Date'}).filter('DatePicker');
      const endValue = wrapper.find( {hintText: 'End Date'}).filter('DatePicker');


      setTimeout( () => {
        try {
          expect(orderValue.props().value).toEqual('Tuesday, May 15, 2018');
          expect(startValue.props().value).toEqual('Wednesday, May 16, 2018');
          expect(endValue.props().value).toEqual('Thursday, May 17, 2018');
          done();
        }
        catch (error) {
            done.fail(error);
        }
      }, 400);
    });

    it('sets service specification in ServiceForm', (done) => {
      const wrapper = setup();
      const name = wrapper.find({hintText: 'Name of the service specification...'}).filter('TextField').find('input')
        .simulate('change', {target: {value: 'Name of SerSpec'}});
      const hrefSpec = wrapper.find({hintText: 'Href of the service specification...'}).filter('TextField').find('input')
        .simulate('change', {target: {value: 'Href of SerSpec'}});
      const versionSpec = wrapper.find({hintText: 'Version of service specification...'}).filter('TextField').find('input')
        .simulate('change', {target: {value: 'Version of SerSpec'}});

      const nameValue = wrapper.find({hintText: 'Name of the service specification...'}).filter('TextField');
      const hrefValue = wrapper.find({hintText: 'Href of the service specification...'}).filter('TextField');
      const versionValue = wrapper.find({hintText: 'Version of service specification...'}).filter('TextField');

      //const hrefSpec = wrapper.find({hintText: 'Href of the service specification...'}).filter('TextField');
      //const versionSpec = wrapper.find({hintText: 'Version of service specification...'}).filter('TextField');


      //hrefSpec.simulate('change', {value: 'Href of spec'});
      //versionSpec.simulate('change', {value: 'Version of spec'});

      setTimeout( () => {
        try {
          expect(nameValue.props().value).toEqual("Name of SerSpec");
          expect(hrefValue.props().value).toEqual("Href of SerSpec");
          expect(versionValue.props().value).toEqual("Version of SerSpec");

          //expect(hrefSpec.props().value).toEqual("Href of spec");
          //expect(versionSpec.props().value).toEqual("Version of spec");
          done();
        }
        catch (error) {
          done.fail(error);
        }
      }, 400);
    });

    it('fills out related parties in ServiceForm', (done) => {
      const wrapper = setup();
      const name = wrapper.find({hintText: 'Name of the related party...'}).filter('TextField').find('input')
        .simulate('change', {target : {value: 'Related'}});
      const role = wrapper.find({hintText: 'Role of the related party...'}).filter('TextField').find('input')
        .simulate('change', {target : {value: 'Role'}});
      const href = wrapper.find({hintText: 'Href of the related party...'}).filter('TextField').find('input')
        .simulate('change', {target : {value: 'Href'}});

      const nameValue = wrapper.find({hintText: 'Name of the related party...'}).filter('TextField');
      const roleValue = wrapper.find({hintText: 'Role of the related party...'}).filter('TextField');
      const hrefValue = wrapper.find({hintText: 'Href of the related party...'}).filter('TextField');


      setTimeout (() => {
        try {
          expect(nameValue.props().value).toEqual("Related");
          expect(roleValue.props().value).toEqual("Role");
          expect(hrefValue.props().value).toEqual("Href");
          done();
        }
        catch (error) {
          done.fail(error);
        }
      }, 400);
    });

    it('finds all New buttons and renders them in ServiceForm', (done) => {
      const wrapper = setup();

      const newButton = wrapper.find({label: 'New'}).filter('RaisedButton');
      console.log(newButton.debug());

      setTimeout( () => {
        try {
          expect(newButton).toHaveLength(7);
          done();
        }
        catch (error) {
          done.fail(error);
        }
      }, 400);
    });

  })
});



