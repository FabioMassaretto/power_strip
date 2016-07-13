import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Modules
import App from './modules/app.jsx'
import Home from './modules/home.jsx'
import About from './modules/About.jsx'
import SwitchView from './modules/SwitchView.jsx'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About}/>
      <Route path="switches/:id" component={SwitchView}/>
    </Route>
  </Router>
  ), document.getElementById('app'))
