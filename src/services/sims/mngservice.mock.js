import { ManagedService } from './ManagedService';
import { IManagedService } from './mngservice.interface';
import { Observable } from 'rxjs';
import { ErrorService, ErrorEvent } from 'services';



export class ManagedServiceServiceProvider extends IManagedService{
  constructor(serviceManager){
    super();
    this.error = serviceManager.getService(ErrorService);
  }

  search(params){
    return Observable.of(ManagedService.fromData([]));
  }


  getServices(){
    // May want to move url to argument
    return Observable.of([]);
  }

  updateService(service){
    return Observable.of(ManagedService.fromData({}));
  }


  postService(service){
    return Observable.of(ManagedService.fromData({}));
  }

  getService(id){
    return Observable.of(ManagedService.fromData({}));
  }

  deleteService(service){
    return Observable.of({});
  }

  deleteAll(){
    return Observable.of({});
  }

  seedServices(){
    return Observable.of({});
  }

}