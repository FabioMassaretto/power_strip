import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

// Modules
import App from './modules/app.jsx'
import Home from './modules/home.jsx'
import About from './modules/About.jsx'
import EventView from './modules/EventView.jsx'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <IndexRoute component={Home} />
      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Route path="about" component={About}/>
      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Route path="schedule" component={EventView}/>
      </MuiThemeProvider>
    </Route>
  </Router>
  ), document.getElementById('app'))
