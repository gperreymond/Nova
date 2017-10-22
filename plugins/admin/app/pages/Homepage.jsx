/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

import Actions from '../libs/Actions'
import Store from '../libs/Store'

import { Group, Box } from '../components'

import Debug from 'debug'
const debug = Debug('nova:admin:pages:homepage')

class Login extends Reflux.Component {
  constructor (props) {
    super(props)
    this.store = Store
  }
  componentDidMount () {
    debug('componentDidMount')
    Actions.checkCookie()
  }
  componentWillUnmount () {
  }
  render () {
    debug('render currentStage=%s', this.state.currentStage)
    return (
      <Group className="application" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
        {this.state.currentStage === this.state.stages.STATE_PAGE_LOGIN_LOADING && <Box title="Veuillez patienter" message="Séquence de démarrage enclenchée." />}
        {this.state.currentStage === this.state.stages.STATE_PAGE_LOGIN && <Box title="Vous êtes un étranger" message="Nous n’avons trouvé aucune trace de votre passage." onClick={Actions.authGoogle} />}
      </Group>
    )
  }
}

export default Login
