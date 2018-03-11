import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import { ServiceManager } from 'services';

export class ServiceProvider extends Component {
  getChildContext() {
    const { serviceManager } = this.props;
    return { serviceManager };
  }

  render() {
    return Children.only(this.props.children);
  }
}

ServiceProvider.childContextTypes = {
  serviceManager: PropTypes.instanceOf(ServiceManager),
}

export function connectServices(mapFunc) {
  return (WrappedComponent) => {
    class ConnectedServiceComponent extends Component {
      render() {
        const { serviceManager } = this.context;
        const serviceProps = mapFunc(serviceManager);
        return <WrappedComponent {...serviceProps} {...this.props} />
      }
    }

    ConnectedServiceComponent.contextTypes = {
      serviceManager: PropTypes.instanceOf(ServiceManager)
    }

    return ConnectedServiceComponent;
  }
}

export function mapServicesToProps(serviceManager, pairs, context){
  const props = {}
  for(let key in pairs){
    props[key] = serviceManager.getService(pairs[key], context)
  }
  return props
}

export function mapAndConnect(component, ...a){
  return connectServices((serviceManager) => mapServicesToProps(serviceManager, ...a))(component);
}