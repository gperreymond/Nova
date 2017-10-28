import Debug from 'debug'
import request from 'client-request'

import Actions from '../Actions'

const debug = Debug('nova:admin:actions:logout')

const handler = (context) => {
  debug('start')
  context.setState({
    currentStage: context.state.stages.STATE_UNCHECK_COOKIE
  })
  // control the user from cookie
  var options = {
    method: 'POST',
    uri: window.location.origin + '/admin/auth/logout',
    json: true
  }
  request(options, (error, response, body) => {
    if (error) debug('error %o', error)
    Actions.checkCookie()
  })
}

export default handler
