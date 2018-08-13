import { Observable, Subject, ReplaySubject } from 'rxjs';

import { IAuthService } from './auth.interface';
import { HttpServiceInterface, ConfigServiceInterface } from 'services';
import { User } from './user';
import { last } from 'rxjs/operators';



export class AuthServiceMock extends IAuthService{
  constructor(serviceManager,settings){
    super();
    
    this._user = null;  
    this.userSubject = new Subject();
    this.userReplay = new ReplaySubject(1);
    this._loginState = 0;
    
  }

  
  setUser(user,push){
    this._loginState = 0;
    /*this.services.getService("http").setToken(user && user.access_token);*/
    
    if(user && user.profile){
      this._user = new User(user.access_token,user.scope,user.profile);
      if(push){
        this.userSubject.next(this._user);
        this.userReplay.next(this._user);
      };
    }
    else if(push){
      this.userSubject.next(null);
      this.userReplay.next(null);
    }
  }

  //Login

  login(method, options){
    this._loginState = 1;
    this.method = method;
    this.settings = options;

    if(method == "guest"){
      this.setUser({profile: {
        admin: false
      }}, true);
    }else{
      this.setUser({profile: {
        admin: true
      }}, true);
    }
    return this.getUser();
  }
  
  logout(){
    this._loginState = 2;
    this.setUser(null,true);
    return this.getUser();
  
  }

  //Get user once
  getUser(){
    return this.userReplay.asObservable().takeLast();
  }

  //Stream of users
  onUserChange(){
    return this.userReplay.asObservable();
  }

}