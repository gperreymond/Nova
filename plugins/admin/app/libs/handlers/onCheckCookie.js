import Debug from 'debug'
import request from 'client-request'

const debug = Debug('nova:admin:actions:checkCookie')

const handler = (context) => {
  debug('start')
  context.setState({
    currentStage: context.state.stages.STATE_CHECK_COOKIE
  })
  // control the user from cookie
  var options = {
    method: 'POST',
    uri: window.location.origin + '/admin/auth/control',
    json: true
  }
  request(options, (error, response, body) => {
    if (error) return debug('error %o', error)
    if (response.statusCode === 404) {
      const source = window.location.pathname
      if (source !== '/admin/login') {
        return context.setState({
          currentStage: context.state.stages.STATE_REDIRECT_LOGIN
        })
      }
      return context.setState({
        currentStage: context.state.stages.STATE_PAGE_LOGIN
      })
    }
    if (response.statusCode !== 200) {
      return debug('error %o', body)
    }
    /* context.setState({
      currentStage: context.state.stages.STATE_PAGE_HOMEPAGE
    }) */
  })
}

export default handler
