import React, { Component } from 'react';
import { mapAndConnect, IManagedService, ManagedService} from "services";




/* Wraps ServiceForm */
export class ServiceEditForm extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      service: null,
      errorText: ""
    }
  }

  componentDidMount(){
    // Fetch service to edit
    const id = this.props.match.params.id;
    this.props.imService.getService(id).subscribe((service) => {
      this.setState({
        service: service
      })
    }, (err) => {
      this.setState({
        errorText: err instanceof Response ? `HTTP ERROR: ${err.status} - ${err.statusText}` : "Could not load service" 
      })
    });
  }

  render(){
    return this.state.service == null ? 
      <div>{this.state.errorText != null ? this.state.errorText : "Loading..."}</div> :
      <div>{this.state.service.name}</div>
  }

}



export default mapAndConnect(ServiceEditForm, {
  imService: IManagedService
});



