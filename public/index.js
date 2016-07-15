import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Modules
import App from './modules/app.jsx'
import Home from './modules/home.jsx'
import About from './modules/About.jsx'
import Schedule from './modules/Schedule.jsx'


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
        <Route path="schedule" component={Schedule}/>
      </MuiThemeProvider>
    </Route>
  </Router>
  ), document.getElementById('app'))
