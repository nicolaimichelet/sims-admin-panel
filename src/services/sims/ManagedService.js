

import { get, at } from 'lodash';


export class ManagedService{
  constructor(data){

    this.uuid = data.uuid;
    this.href = data.href;
    this.category = data.category;
    this.description = data.description;
    this.endDate = data.endDate ? new Date(data.endDate) : null;
    this.hasStarted = data.hasStarted;
    this.isStateful = data.isStateful;
    this.name = data.name;
    this.startMode = data.startMode;
    this.state = data.state;
    this.type = data.type;
    this.supportingService = [];
    this.supportingResource = [];
    this.serviceCharacteristic = [];
    this.relatedParty = [];
    this.serviceRelationship = [];
    this.serviceSpecification;
  }

  getPatch(){
    const ret = [];

    for (let key in this){
      if(! typeof(get(this, key)) != "object"){
        ret.push({
          path: `/${path}`,
          value: get(this,key),
          op: "replace",
        });
      }
    }

    return ret;
  }

  static fromData(data){
    let service = new ManagedService(data);
    service.id = data.id;

    data.serviceCharacteristic.forEach((e) => {
      service.addServiceCharacteristic(new ServiceCharacteristic(e.name, e.value));
    });
  
    data.serviceRelationship.forEach((e) => {
      service.addServiceRelationship(new ServiceRelationship(e.type, e.serviceRef));
    });

    data.supportingResource.forEach((e) => {
      service.addSupportingResource(new SupportingResource(e.id, e.href));
    });

    data.relatedParty.forEach((e) => {
      service.addRelatedParty(new RelatedParty(e.id, e.role, e.href));
    });
    let spec = data.serviceSpecification;
    if(spec){
      service.setServiceSpecification(new ServiceSpecification(spec.id, spec.href));
    }

    return service;
  }


  toData(){
    return {
      id: this.id,
      uuid:  this.uuid,
      href:  this.href,
      category:  this.category,
      description:  this.description,
      endDate:  this.endDate,
      hasStarted:  this.hasStarted,
      isStateful:  this.isStateful,
      name:  this.name,
      startMode:  this.startMode,
      state:  this.state,
      type:  this.type,
      serviceCharacteristic: this.serviceCharacteristic.map((e) => e.toData()),
      relatedParty: this.relatedParty.map((e) => e.toData()),
      serviceRelationship: this.serviceRelationship.map((e) => e.toData()),
      serviceSpecification: this.serviceSpecification.toData(),
      supportingResource: this.supportingResource.map((e) => e.toData()),
    }
  }

  addRelatedParty(party){
    this.relatedParty.push(party);
  }

  addServiceCharacteristic(characteristic){
    this.serviceCharacteristic.push(characteristic);
  }

  addServiceRelationship(relationship){
    this.serviceRelationship.push(relationship);
  }

  addSupportingResource(resource){
    this.supportingResource.push(resource);
  }

  setServiceSpecification(spec){
    this.serviceSpecification = spec;
  }

  deleteServiceCharacteristic(characteristic){
    this.serviceCharacteristic = this.serviceCharacteristic.filter((e) => e.id != characteristic.id);
  }

  deleteRelationship(relationship){
    this.supportingResource = this.supportingResource.filter((e) => e.service.id != relationship.service.id);
  }

  deleteRelatedParty(party){
    this.relatedParty = this.relatedParty.filter((e) => e.id != party.id);
  }

  deleteSupportingResource(resource){
    this.supportingResource = this.supportingResource.filter((e) => e.id != resource.id);
  }

  deleteSupportingService(service){
    this.supportingService = this.supportingService.filter((e) => e.id != service.id);
  }

  deleteServiceSpecification(){
    delete this.serviceSpecification;
  }


  getRelatedParty(){
    return this.relatedParty;
  }

  getServiceCharacteristic(){
    return this.serviceCharacteristic;
  }

  getServiceRelationship(){
    return this.serviceRelationship;
  }

  getSupportingResource(){
    return this.supportingResource;
  }

  getServiceSpecification(){
    return this.serviceSpecification;
  }

}


export class ServiceCharacteristic{
  constructor(name, value){
    this.name = name;
    this.value = value;
  }

  toData(){
    return {
      name: this.name,
      value: this.value
    }
  }
}

export class ServiceSpecification{
  constructor(id, name){
    this.id = id;
    this.name = name;
  }

  toData(){
    return {
      id: this.id,
      name: this.name
    }
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

  toData(){
    return {
      type: this.type,
      service: {
        id: this.service.id,
        href: this.service.href
      }
    }
  }
}

export class SupportingResource{
  constructor(id, href){
    this.id = id;
    this.href = href;
  }

  toData(){
    return {
      id: this.id,
      href: this.href
    }
  }
}


export class RelatedParty{
  constructor(id, role, href){
    this.id = id;
    this.role = role;
    this.href = href;
  }

  toData(){
    return {
      id: this.id,
      role: this.role,
      href: this.href
    }
  }
}
