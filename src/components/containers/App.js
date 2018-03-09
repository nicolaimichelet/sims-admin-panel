import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import 'assets/css/App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Header/>
        <Main/>
      </MuiThemeProvider>
    )
  }
}
