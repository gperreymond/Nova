/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

import { Login, NoMatch } from '../pages'

class Application extends Reflux.Component {
  render () {
    if (this.props.location === '/admin') return (<Login />)
    return (<NoMatch />)
  }
}

export default Application
