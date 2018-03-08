import React from 'react';
import {render} from 'react-dom';
import App from 'components/containers/App';


import { ServiceManager, HttpServiceInterface,HttpServiceProvider } from 'services';

const serviceManager = new ServiceManager();

serviceManager.registerService(HttpServiceProvider);

render(
  <App/>, document.getElementById('root')
);