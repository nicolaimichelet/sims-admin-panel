//Userprofile class
export class User{
    constructor(access_token,scope,userdata){
      this._access_token = access_token;
      this._scope = scope;
      this._userdata = userdata || {
        username: "DefaultUser",
        first_name: "Default",
        last_name: "User",
        admin: false
      };
      this._admin = userdata.admin || false

    }
    
    
    get token(){
      return this._access_token;
    }
    
    get username(){
      return this._userdata.username;
    }
    
    isAdmin(){
      return this._admin;
    }
  }