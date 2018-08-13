import { HttpServiceInterface, ConfigServiceInterface } from 'services';

import { ManagedService } from './ManagedService';
import { IManagedService } from './mngservice.interface';
import { DEFAULT_API } from 'common/constants';
import { Observable } from 'rxjs';
import {ErrorService, ErrorEvent} from 'services';



export class ManagedServiceServiceProvider extends IManagedService{
  constructor(serviceManager){
    super();
    this.http = serviceManager.getService(HttpServiceInterface);
    this.config = serviceManager.getService(ConfigServiceInterface);
    this.error = serviceManager.getService(ErrorService);
  }

  search(params){
    let endpoint = new URL('service',`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    const searchParams = new URLSearchParams(params);
    endpoint = new URL(`?${searchParams.toString()}`,endpoint);
    return this.http.get(endpoint).map(
      (services) => {
        return services.map(elem => {
          return ManagedService.fromData(elem)
        });
      }
    );
  }




  getServices(){
    // May want to move url to argument
    const endpoint = new URL('service',`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    return this.http.get(endpoint).map(
      (services) => {
        return services.map(elem => {
          return ManagedService.fromData(elem);
        });
      }
    ).catch( (error) => {
      console.log(error, error.ok);
      window.lastError = error;
      let errorEvent = new ErrorEvent("GET_SERVICE","FATAL", "Could not fetch services",error);
      this.error.pushErrorEvent(errorEvent);
      return Observable.throw(errorEvent);
    });
  }

  updateService(service){
    const endpoint = new URL(`service/${service.id}`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    const patch = service.toData();
    //return Observable.from(patches).flatMap((op)=> {
    return this.http.patch(endpoint,patch, "application/merge-patch+json").map((data) => {
      return ManagedService.fromData(data);
    }).catch((error) => {
      let errorEvent = new ErrorEvent("UPDATE_SERVICE","FATAL","Could not update service",error);
      this.error.pushErrorEvent(errorEvent);
      return Observable.throw(errorEvent);
    
    });
    //return this.http.patch(endpoint,patch, "application/json");
    //}).bufferCount(patches.length);
  }


  postService(service){
    const endpoint = new URL(`service`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    return this.http.post(endpoint, service.toData()).map((data) => {
      return ManagedService.fromData(data);
    }).catch( (error) => {
      let errorEvent = new ErrorEvent("POST_SERVICE","FATAL","Could not post service",error);
      this.error.pushErrorEvent(errorEvent);
      return Observable.throw(errorEvent);
    });

  }

  getService(id){
    const endpoint = new URL(`service/${id}`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    return this.http.get(endpoint).map(
      (service) => {
        return ManagedService.fromData(service);
      }
    );
  }

  deleteService(service){
    if(service.id){
      const endpoint = new URL(`service/${service.id}`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
      return this.http.delete(endpoint);
    }
    return Observable.throw(new Error("Service has no id"));
  }

  deleteAll(){
      const endpoint = new URL(`service`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
      return this.http.delete(endpoint);
  }

  seedServices(){
    const endpoint = new URL(`seed/50`,`${this.config.getItem("SIMS-BASE") || DEFAULT_API}`);
    return this.http.get(endpoint);
  }

}