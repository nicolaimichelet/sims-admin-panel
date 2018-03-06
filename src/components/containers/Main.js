import React, { Component } from 'react'
import {Router, Switch, Route} from 'react-router'
import Admin from '../adminpage/adminpage'
import ServiceForm from '../serviceForm/serviceForm'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

export default class Main extends Component {
    render() {
        return (
            <Router history = {history}>
                <Switch>
                    <Route path='/Adminpage' render={() => <Admin/>}/>
                    <Route path= '/ServiceForm' render={() => <ServiceForm/>}/>
                </Switch>
            </Router>
        )
    }
}
