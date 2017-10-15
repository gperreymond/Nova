/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Login, NoMatch } from './pages'

const Application = () => (
  <Router>
    <Switch>
      <Route exact path="/admin" component={Login} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)

export default Application
