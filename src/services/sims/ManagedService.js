




export class ManagedService{
  constructor(data){
    this.uuid = data.uuid;
    this.href = data.href;
    this.id = data.id;
    this.category = data.category;
    this.description = data.description;
    this.endDate = data.endDate ? new Date(data.endDate) : null;
    this.hasStarted = data.hasStarted;
    this.isStateful = data.isStateful;
    this.name = data.name;
    this.startMode = data.startMode;
    this.state = data.state;
    this.type = data.type;

  }
  getPatch(){
    const ret = [];
    for (let key in this){
      ret.push({
        path: `/${key}`,
        value: this[key],
        op: "replace",
          
      })
    }
    return ret;
  }

}


export class serviceCharacteristic{
  constructor(name, value){
    this.name = name;
    this.value = value;
  }
}

export class ServiceSpecification{
  constructor(id, name){
    this.id = id;
    this.name = name;
  }
}

export class ServiceRelationship{
  constructor(type, service){
    this.type = type;
    this.service = {
      id: service.id,
      href: service.href
    }
  }
}

export class SupportingResource{
  constructor(id, href){
    this.id = id;
    this.href = href;
  }
}


export class RelatedParty{
  constructor(id, role, href){
    this.id = id;
    this.role = role;
    this.href = href;
  }
}
