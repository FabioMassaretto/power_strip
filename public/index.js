import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

// Modules
import App from './modules/app.jsx'
import About from './modules/About.jsx'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
  ), document.getElementById('app'))