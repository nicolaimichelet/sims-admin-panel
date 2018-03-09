import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import 'assets/css/header.css';
import {Tab, Tabs} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';


export default class Header extends Component {

    render (){

        const buttons = [
            <FlatButton  hoverColor='transparent' labelStyle={{color: 'white'}} href="/AdminPage" label="Service" />,
            <FlatButton  hoverColor='transparent' labelStyle={{color: 'white'}} href="/" label="Place" />,
            <FlatButton  hoverColor='transparent' labelStyle={{color: 'white'}} href="/ServiceForm" label="New Service" />
        ]

        return(
            <AppBar
                title="SIMS"
                titleStyle={{marginLeft: '30%', fontSize: '220%' }}
                iconElementLeft={
                    <FlatButton hoverColor='transparent'>{buttons}</FlatButton>
                }/>

            

        )
    }
}
