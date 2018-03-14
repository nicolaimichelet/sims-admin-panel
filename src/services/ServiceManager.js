import { config } from "dotenv";


export class ServiceManager{
  constructor(){
    this.services = {};
    this.def_context = "default";
  }
  registerService(service, context,...a){
    console.assert(typeof(service) == "function" && typeof(service.constructor) == "function","Service is not a class!");
    context = context != null ? context : this.getDefaultContext();
    if(!(context in this.services)){
      this.services[context] = [];
    }
    this.services[context].push(new service(this,...a));
  }

  setDefaultContext(context){
    this.def_context = context;
  }

  getDefaultContext(){
    return this.def_context;
  }
  
  getService(type, context){
    context = context!=null ? context : this.getDefaultContext();
    for(let service of this.services[context]){
      if(service instanceof type){
        return service;
      }
    }
  }

}


export const serviceManager = new ServiceManager();