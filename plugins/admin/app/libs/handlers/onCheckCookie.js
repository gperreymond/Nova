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
  debug('check the account in cache')
  request(options, (error, response, body) => {
    if (error) return debug('error %o', error)
    const source = window.location.pathname
    // the user wat not found in cache
    if (response.statusCode === 404) {
      if (source !== '/admin/login') {
        return context.setState({
          currentStage: context.state.stages.STATE_REDIRECT_LOGIN
        })
      }
      return context.setState({
        currentStage: context.state.stages.STATE_PAGE_LOGIN
      })
    }
    // an error occured
    if (response.statusCode !== 200) {
      return debug('error %o', body)
    }
    // the user was found in cache
    if (source === '/admin/login') {
      return context.setState({
        currentStage: context.state.stages.STATE_REDIRECT_HOMEPAGE
      })
    } else {
      return context.setState({
        currentStage: context.state.stages.STATE_PAGE_NORMAL
      })
    }
    /* context.setState({
      currentStage: context.state.stages.STATE_PAGE_HOMEPAGE
    }) */
  })
}

export default handler
