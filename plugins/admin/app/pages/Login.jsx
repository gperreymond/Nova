/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

import { Grid, Button, Icon } from 'semantic-ui-react'

// import Actions from '../libs/Actions'
import Store from '../libs/Store'

import '../../assets/css/login.css'

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
      <Grid textAlign="center" style={{ minHeight: '100%', height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Button size="huge" color="google plus">
            <Icon name="google plus" /> Google Plus
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
