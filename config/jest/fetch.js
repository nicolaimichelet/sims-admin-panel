global.fetch = require('jest-fetch-mock');



class Storage {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};


class URLSearchParams{
  constructor(params){
    this.params = params;
  }

  toString(){
    return "url";
  }
}

global.Storage = Storage;
global.URLSearchParams = URLSearchParams;