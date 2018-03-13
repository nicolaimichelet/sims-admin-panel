import { HttpServiceInterface } from 'services';


export class ManagedServiceServiceProvider{
  constructor(serviceManager){
    this.http = serviceManager.getService(HttpServiceInterface);
  }

}