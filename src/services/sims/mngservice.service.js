import { HttpServiceInterface, ConfigServiceInterface } from 'services';

import { ManagedService } from './ManagedService';
import { IManagedService } from './mngservice.interface';

import { DEFAULT_API } from 'common/constants';



export class ManagedServiceServiceProvider extends IManagedService{
  constructor(serviceManager){
    super();
    this.http = serviceManager.getService(HttpServiceInterface);
    this.config = serviceManager.getService(ConfigServiceInterface);
  }



  getServices(){
    console.log(this.config.getItem("SIMS-BASE"));
    // May want to move url to argument
    const endpoint = new URL('services',`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    return this.http.get(endpoint).map(
      (services) => {
        const mappedServices = [];
        services.forEach(elem => {
          mappedServices.push(new ManagedService(elem));
        });
        return mappedServices;
      }
    );
  }

  getService(id){
    const endpoint = new URL(`service/${id}`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    return this.http.get(endpoint).map(
      (service) => {
        return new ManagedService(service);
      }
    );
  }

}