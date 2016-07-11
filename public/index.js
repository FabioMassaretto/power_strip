import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

// Modules
import App from './modules/app.jsx'
import Home from './modules/home.jsx'
import About from './modules/About.jsx'




render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About}/>
    </Route>
  </Router>
  ), document.getElementById('app'))
