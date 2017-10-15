/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

import { Button } from 'semantic-ui-react'

// import Actions from '../libs/Actions'
import Store from '../libs/Store'

class Login extends Reflux.Component {
  constructor (props) {
    super(props)
    this.store = Store
  }
  componentDidMount () {
  }
  componentWillUnmount () {
  }
  render () {
    return (
      <Button>BUTTON</Button>
    )
  }
}

export default Login
