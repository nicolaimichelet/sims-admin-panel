

import { get, keys } from 'lodash';

export function paths(object){
  let paths = [];
  let objects = [{obj: object, leaf: ""}];
  while(objects.length > 0){
    let pair = objects.shift();
    for(let key of keys(pair.obj)){
      let path = pair.leaf + key;
      paths.push(path);

      let v = get(pair.obj, key);
      if(typeof(v) === "object"){
        objects.push({
          obj: v,
          leaf: path + "."
        });
      }
    }
  }
  return paths;
}