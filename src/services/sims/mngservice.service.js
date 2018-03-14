import { HttpServiceInterface, ConfigServiceInterface } from 'services';

import { ManagedService } from './ManagedService';
import { IManagedService } from './mngservice.interface';

import { DEFAULT_API } from 'common/constants';

import { Observable } from 'rxjs';


export class ManagedServiceServiceProvider extends IManagedService{
  constructor(serviceManager){
    super();
    this.http = serviceManager.getService(HttpServiceInterface);
    this.config = serviceManager.getService(ConfigServiceInterface);
  }



  getServices(){
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


  postService(service){
    return this.http.post(service).map((data) => {
      return new ManagedService(data);
    });
  }

  getService(id){
    const endpoint = new URL(`services/${id}`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    return this.http.get(endpoint).map(
      (service) => {
        return new ManagedService(service);
      }
    );
  }

  deleteService(service){
    if(service.id){
      const endpoint = new URL(`services/${service.id}`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
      return this.http.delete(endpoint);
    }
    return Observable.throw(new Error("Service has no id"));
  }

}