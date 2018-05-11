import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { mapAndConnect, IManagedService } from 'services';
import {lightGreen100, lightGreen600,lightGreen400} from 'material-ui/styles/colors';
import 'typeface-roboto';



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
                <li>NAME: {party.name}</li>
                <li>ROLE: {party.role}</li>
                <li>HREF: {party.href}</li>
                </ul>
            )
        }
        const detailStyle = {
            page: {
                padding: '2em',
                backgroundColor: '#fbfff0',
                height: '100%',
                position: 'relative',
            },
            basic: {
                width: '30%',
                height: '280px',
                marginLeft: '2%',
                marginRight: '2%',
                display: 'inline-block',
                position: 'static',
                backgroundColor: lightGreen100,
            },
            serviceSpec: {
                width: '20%',
                height: '280px',
                marginRight: '2%',
                display: 'inline-block',
                position: 'absolute',
                backgroundColor: lightGreen100,
            },
            relatedParty: {
                marginTop: '0',
                width: '40%',
                height: '280px',
                display: 'inline-block',
                marginLeft: '22%',
                position: 'absolute',
                backgroundColor: lightGreen100,
            },
            supportService: {
                width: '46%',
                margin: '2%',
                position: 'static',
                display: 'inline-block',
                backgroundColor: lightGreen100,
            },
            supportResource: {
                width: '47%',
                marginTop: '2%',
                position: 'absolute',
                display: 'inline-block',
                backgroundColor: lightGreen100,
            },
            headerCaptions: {
                backgroundColor: lightGreen600,
                marginTop: '0',
                color: 'white',
                height: '30px',
                paddingTop: '10px',
                paddingLeft: '25px',
                fontFamily: 'roboto',
                fontWeight: '300',
            },
            headerText: {
                fontWeight: '200',
                fontsize: '50%',
                fontFamily: 'roboto',
            },
            contentText:{
                fontWeight: '200',
                fontFamily: 'roboto',
                textDecoration: 'none',
            }

        }

        return(
            <Paper style={detailStyle.page}>
                <h1 style={detailStyle.headerText}>{this.state.service.name}</h1>
                <div><Paper style={detailStyle.basic} zDepth={1}>
                    <h4 style={detailStyle.headerCaptions}>BASIC:</h4>
                    <ul style = {{listStyleType: "none"}}>
                        <li>ID: <u style={detailStyle.contentText}>{this.state.service.id}</u></li>
                        <li>DESCRIPTION: <u style={detailStyle.contentText}>{this.state.service.description}</u> </li>
                        <li>STATUS: <u style={detailStyle.contentText}>{this.state.service.state}</u></li>
                        <li>IS SERVICE ENABLED: <u style={detailStyle.contentText}>{this.state.service.isServiceEnabled ? 'Yes' : 'No'}</u> </li>
                        <li>CATEGORY: <u style={detailStyle.contentText}>{this.state.service.category}</u></li>
                        <li>ORDER DATE: <u style={detailStyle.contentText}>{this.state.service.orderDate ? this.state.service.orderDate.toLocaleDateString('en-US', options) : "None"}</u></li>
                        <li>START DATE: <u style={detailStyle.contentText}>{this.state.service.startDate ? this.state.service.startDate.toLocaleDateString('en-US', options) : "None"}</u></li>
                        <li>END DATE: <u style={detailStyle.contentText}>{this.state.service.endDate ? this.state.service.endDate.toLocaleDateString('en-US', options): "None"}</u></li>
                        <li>START MODE: <u style={detailStyle.contentText}>{this.state.service.startMode}</u></li>
                        <li>IS STATEFUL: <u style={detailStyle.contentText}>{this.state.service.isStateful ? 'Yes' : 'No'}</u></li>
                    </ul>
                </Paper>
                <Paper style={detailStyle.serviceSpec} zDepth={1}>
                    <h4 style={detailStyle.headerCaptions}>SERVICE SPECIFICATION:</h4>
                    <ul style = {{listStyleType: "none"}}>
                        <li><u style={detailStyle.contentText}>{this.state.service.getServiceSpecification().name}</u></li>
                    </ul>
                </Paper>
                <Paper style={detailStyle.relatedParty} zDepth={1}>
                    <h4 style={detailStyle.headerCaptions}>RELATED PARTY:</h4>
                    <u style={detailStyle.contentText}>{partyList}</u>
                </Paper>
                </div>
                <div>
                <Paper style={detailStyle.supportService}>
                <h4 style={detailStyle.headerCaptions}>SUPPORTING SERVICE:</h4>
                <ul style = {{listStyleType: "none"}}>
                    <li>ID: </li>
                    <li>HREF: </li>
                    <li>NAME: </li>
                    <li>CATEGORY: </li>
                </ul>
                </Paper>
                <Paper style={detailStyle.supportResource}>
                <h4 style={detailStyle.headerCaptions}>SUPPORTING RESOURCE:</h4>
                <ul style = {{listStyleType: "none"}}>
                    <li>ID:</li>
                    <li>HREF: </li>
                    <li>NAME: </li>
                </ul>
                </Paper>
                </div>
            </Paper>
        );
    }
}





export default mapAndConnect(DetailView, {
    imService: IManagedService
  })