/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { ErrorBoundary } from './components'
import {
  Homepage,
  Login,
  NoMatch,
  Pages,
  PageDetails
} from './pages'

const Application = () => (
  <ErrorBoundary>
    <Router>
      <Switch>
        <Route exact path="/admin" component={Homepage} />
        <Route exact path="/admin/login" component={Login} />
        <Route exact path="/admin/pages" component={Pages} />
        <Route exact path="/admin/pages/:uuid" component={PageDetails} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </ErrorBoundary>
)

export default Application
