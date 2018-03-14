import { ConfigServiceInterface } from './config.interface';

// Class for storing objects in a storage
export class ConfigServiceProvider extends ConfigServiceInterface{
  constructor(serviceManager, storage){
    super();
    this.serviceManager = serviceManager;
    this.storage = storage !== null ? storage : new Storage();
  }

  key(...a){
    return this.storage.key(...a);
  }

  setObject(key, obj){
    let data = JSON.stringify(obj);
    this.setItem(key, data);
  }

  setItem(key, data){
    this.storage.setItem(key, data);
  }

  getItem(key){
    return this.storage.getItem(key)
  }

  getObject(key){
    try{
      let obj = this.getItem(key);
      return JSON.parse(obj);
    }catch(err){
      console.error("Could not parse item", err);
      return null;
    }
  }

  removeItem(key){
    this.storage.removeItem(key);
  }

  clear(){
    this.storage.clear();
  }

} 