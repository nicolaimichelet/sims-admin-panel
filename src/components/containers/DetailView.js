import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { mapAndConnect, IManagedService } from 'services';



export class DetailView extends Component {
    constructor(props){
        super(props);
        this.state = {service: {}}
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
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return(
            <div>
                <Paper>
                    <Paper>
                        <h3>Basic:</h3>
                        <ul>
                        <li>Description: {this.state.service.description} </li>
                        <li>Order date: {this.state.service.orderDate ? this.state.service.orderDate.toLocaleDateString('en-US', options) : "None"}</li>
                        <li>Start date: {this.state.service.startDate ? this.state.service.startDate.toLocaleDateString('en-US', options) : "None"}</li>
                        <li>End date: {this.state.service.endDate ? this.state.service.endDate.toLocaleDateString('en-US', options): "None"}</li>
                        <li>Start mode: {this.state.service.startMode}</li>
                        <li>Is stateful: {this.state.service.isStateful ? 'Yes' : 'No'}</li>
                        <li>Is service enabled: {this.state.service.isServiceEnabled ? 'Yes' : 'No'} </li>
                        <li>Category: {this.state.service.category}</li>
                        <li>Status: {this.state.service.state}</li>
                        </ul>
                    </Paper>
                    <Paper>Service spesification</Paper>
                    <Paper>Related party:</Paper>
                    <Paper>Supporting resource:</Paper>
                    <Paper>Supporting service</Paper>
                    ID:



                </Paper>
            </div>
        );
    }
}





export default mapAndConnect(DetailView, {
    imService: IManagedService
  })