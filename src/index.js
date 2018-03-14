import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from 'components/containers/App';
import { ServiceProvider, ConfigServiceProvider } from 'services';
import { ServiceManager, HttpServiceInterface,HttpServiceProvider } from 'services';

const serviceManager = new ServiceManager();

serviceManager.registerService(ConfigServiceProvider, null, localStorage);
serviceManager.getService(ConfigServiceProvider).setObject("test", ["a", "b", "c"]);
serviceManager.registerService(HttpServiceProvider);


const history = createBrowserHistory();

ReactDOM.render(
  <ServiceProvider serviceManager={serviceManager}>
    <MuiThemeProvider>
      <Router history = {history}>
        <App/>
      </Router>
    </MuiThemeProvider>
  </ServiceProvider>,
  document.getElementById('root')
);