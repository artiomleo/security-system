import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Login from './components/login/login.jsx';
import Main from './components/main.jsx';
import Settings from './components/settings/settings.jsx';
import UserCard from './components/settings/user/userCard.jsx';


const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#0080c5',
        accent:'#F44336'
    },
    secondary:{
        main:'#62bd1d'
    },
}
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
                  <BrowserRouter >
                  <Route path='/' exact component={Login}/>
                  <Route path='/main' exact component={Main}/>
                  <Route path='/settings' exact component={Settings}/>
                  <Route path='/userCard' exact component={UserCard}/>

      </BrowserRouter>
    </MuiThemeProvider>
    );
  }
}

export default App;
