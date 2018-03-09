import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/containers/App';
import { ServiceProvider } from 'services';

import { ServiceManager, HttpServiceInterface,HttpServiceProvider } from 'services';

const serviceManager = new ServiceManager();

serviceManager.registerService(HttpServiceProvider);


ReactDOM.render(
  <ServiceProvider
    serviceManager={serviceManager}
  >
    <App/>
  </ServiceProvider>, 
  document.getElementById('root')
);