import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import 'assets/css/header.css';
import { Link } from 'react-router-dom';


export default class Header extends Component {

    render (){

        const buttons = (
            <div>
                <FlatButton  hoverColor='transparent' rippleColor='transparent' labelStyle={{color: 'white'}} href="/AdminPage" label="Service"/>
                <FlatButton  hoverColor='transparent' rippleColor='transparent' labelStyle={{color: 'white'}} href="/" label="Place"/>
                <FlatButton  hoverColor='transparent' rippleColor='transparent' labelStyle={{color: 'white'}} href="/ServiceForm" label="New Service" />
            </div>)

        return(
            <AppBar
                title="SIMS"
                titleStyle={{marginLeft: '30%', fontSize: '220%' }}
                iconElementLeft={buttons}/>



        )
    }
}
