import { UserManager, Log } from 'oidc-client';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import { IAuthService } from './auth.interface';
import { HttpServiceInterface, ConfigServiceInterface } from 'services';
import { User } from './user';

Log.logger = console;
Log.level = Log.DEBUG;

function basicAuthFactory(encoded){
  return function(request){
    request.headers.set("Authorization",`Basic ${encoded}`);
    return request;
  }
}




export class AuthServiceProvider extends IAuthService{
  constructor(serviceManager,settings){
    super();
    
    this._user = null;  
    this.userSubject = new Subject();
    this.userReplay = new ReplaySubject(1);
    this._loginState = 0;
    this.services = serviceManager;
    this.http = serviceManager.getService(HttpServiceInterface);
    this.config = serviceManager.getService(ConfigServiceInterface);
    this.method = "none";

    this.savedState = this.config.getObject("AUTH_DATA") || {};
    if(this.savedState.loggedIn){
      this.login(this.savedState.method, this.savedState.settings);
    }else{
      this.setUser(null, true);
    }
    //this._initBindings();
  }

  _initBindings(){
    
    this.bindings = [
      this.userManager.events.addUserLoaded((user) => {
        this.setUser(user,true);
      }),

      Observable.from(this.userManager.getUser()).subscribe((user) => {
      this.setUser(user,true);
      }),

      Observable.from(this.userManager.signinPopupCallback()).subscribe((user) => {
        /*if(user)
          location.href = "/";*/
      })
    ];
  }

  _clearBindings(){
    for(let binding of this.bindings || []){
      binding.unsubscribe();
    }
    this.bindings = null;
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

    if(method == "openid"){

      this.userManager = new UserManager(Object.assign({
        popupWindowFeatures: 'location=no,toolbar=no,width=900,height=700,left=100,top=100'
      }, options));
      this._initBindings();
      
      Observable.from(this.userManager.signinPopup()).subscribe(()=> {
      }, (err) => {
        console.log(`Error happened regarding SSO signin popup: ${err.message}`);
      });
    }else if(method == "guest"){
      this.setUser({profile: {
        admin: false
      }}, true);
    }else if(method == "basic_auth"){
      let {username, password, encoded} = options;
      if(encoded == null){
        encoded = new Buffer(`${username}:${password}`).toString("base64");
      }
      this.http.setAuthMethod(basicAuthFactory(encoded));
      this.setUser({profile: {
        admin: true
      }}, true);

      this.savedState.settings = {
        encoded: encoded
      };

    }else{
      this.setUser({profile: {
        admin: true
      }}, true);
    }
    this.savedState.method = method;
    this.savedState.loggedIn = true;
    this.config.setObject("AUTH_DATA", this.savedState);
    return this.getUser();
  }
  
  logout(){
    this._loginState = 2;
    this.savedState = {
      loggedIn: false
    }
    this.http.setAuthMethod(null);
    sessionStorage.clear();
    this.setUser(null,true);
    /*
    Observable.from(this.userManager.signoutPopup()).subscribe((user)=> {
    });*/
    this._clearBindings();
    this.config.setObject("AUTH_DATA", this.savedState);
    return this.getUser();
  
  }

  //Get user once
  getUser(){
    return this.userSubject.asObservable().take(1);
  }

  //Stream of users
  onUserChange(){
    return this.userReplay.asObservable();
  }

}