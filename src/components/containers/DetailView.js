import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { mapAndConnect, IManagedService } from 'services';



export class DetailView extends Component {
    constructor(props){
        super(props);
        this.state = {service: null}
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
        if (!this.state.service){
            return <div/>;
        }
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const partyList =[];
        for (let party of this.state.service.getRelatedParty()){
                partyList.push(<ul style = {{listStyleType: "none"}}>
                <li>Name: {party.name}</li>
                <li>Role: {party.role}</li>
                <li>HREF: {party.href}</li>
                </ul>
            )
        }

        return(
            <div>
                <h2>{this.state.service.name}</h2>
                <Paper>
                    <Paper>
                        <h4>Basic:</h4>
                        <ul style = {{listStyleType: "none"}}>
                        <li>ID: {this.state.service.id}</li>
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
                    <Paper>
                    <h4>Service specification</h4>
                        <ul style = {{listStyleType: "none"}}>
                        <li>{this.state.service.getServiceSpecification().name}</li>
                        </ul>
                    </Paper>
                    <Paper>
                    <h4>Related party:</h4>
                    {partyList}
                    </Paper>
                    <Paper>
                    <h4>Supporting service:</h4>
                    <ul style = {{listStyleType: "none"}}>
                    <li>ID: </li>
                    <li>HREF: </li>
                    <li>Name: </li>
                    <li>Category: </li>
                    </ul>
                    </Paper>
                    <Paper>
                    <h4>Supporting resource:</h4>
                    <ul style = {{listStyleType: "none"}}>
                    <li>ID:</li>
                    <li>HREF: </li>
                    <li>Name: </li>
                    </ul>
                    </Paper>
                </Paper>
            </div>
        );
    }
}





export default mapAndConnect(DetailView, {
    imService: IManagedService
  })