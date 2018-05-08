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
    }
    
    
    get token(){
      return this._access_token;
    }
    
    get username(){
      return this._userdata.username;
    }
    
    get firstname(){
      return this._userdata.given_name;
    }
  
    get lastname(){
      return this._userdata.family_name;
    }
  
    get fullname(){
      return `${this.firstname} ${this.lastname}`
    }
  
    get name(){
      return this._userdata.name;
    }
  
    get email(){
      return  this._userdata.email;
    }
  }