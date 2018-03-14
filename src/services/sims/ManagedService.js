

export class ManagedService{
  constructor(data){
    this.uuid = data.uuid;
    this.id = data.id;
    this.category = data.category;
    this.endDate = data.endDate ? new Date(data.endDate) : null;
    this.hasStarted = data.hasStarted;
    this.isStateful = data.isStateful;
    this.name = data.name;
    this.startMode = data.startMode;
    this.state = data.state;
    this.type = data.type;
  }
}
