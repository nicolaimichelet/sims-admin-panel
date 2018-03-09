import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';


export default class Header extends Component {

    render (){

        const buttons = [
            <FlatButton>
                <a href='/AdminPage'>
                Services
                </a>
            </FlatButton>,
            <FlatButton>
                Places
            </FlatButton>,
            <FlatButton>
                New Service
            </FlatButton>
        ]

        return(
            <AppBar
                title="SIMS"
                iconElementLeft={
                    <FlatButton>{buttons}</FlatButton>
                }
            >
        

            </AppBar>
            

        )
    }
}
