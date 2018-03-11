import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Tab, Tabs} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    render (){

        const buttons = [
            <FlatButton>
                <Link to="/services">Services</Link>
            </FlatButton>,
            <FlatButton>
                Places
            </FlatButton>,
            <FlatButton>
                <Link to="/services/new">New Service</Link>
            </FlatButton>
        ]

        return(
            <div>
            <AppBar
                title="SIMS"
                iconElementLeft={
                    <ul>{buttons}</ul>
                }
            >
            </AppBar>
            </div>

        )
    }
}
