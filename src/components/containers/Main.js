import React, { Component } from 'react'
import {Router, Switch, Route} from 'react-router'
import Admin from '../Adminpage/adminpage'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory();

export default class Main extends Component {
    render() {
        return (
                <Router history = {history}>
                    <Switch>
                        <Route path='/Adminpage' render={() => <Admin/>}/>
                    </Switch>
                </Router>
        )
    }
}
