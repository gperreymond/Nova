/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import { Redirect } from 'react-router-dom'

import Actions from '../libs/Actions'
import Store from '../libs/Store'

import { Group, Box, AppBar } from '../components'

import Debug from 'debug'
const debug = Debug('nova:admin:pages:pages')

class Pages extends Reflux.Component {
  constructor (props) {
    super(props)
    this.store = Store
  }
  componentDidMount () {
    debug('componentDidMount')
    Actions.checkCookie()
  }
  componentWillUnmount () {
    debug('componentWillUnmount')
    Reflux.Component.prototype.componentWillUnmount.call(this)
  }
  render () {
    debug('render currentStage=%s', this.state.currentStage)
    return (
      <Group className={this.state.currentStage === this.state.stages.STATE_PAGE_NORMAL ? 'application no-padding' : 'application'} width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
        {this.state.currentStage === this.state.stages.STATE_REDIRECT_LOGIN && <Redirect to="/admin/login" />}
        {this.state.currentStage === this.state.stages.STATE_CHECK_COOKIE && <Box title="Veuillez patienter" message="Séquence de démarrage enclenchée." />}
        {this.state.currentStage === this.state.stages.STATE_UNCHECK_COOKIE && <Box title="Veuillez patienter" message="Séquence de démarrage enclenchée." />}
        {this.state.currentStage === this.state.stages.STATE_PAGE_NORMAL &&
          <Group width="100%" height="100%" verticalAlign="top" horizontalAlign="center" orientation="vertical">
            <AppBar />
          </Group>
        }
      </Group>
    )
  }
}

export default Pages
