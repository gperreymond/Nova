import Debug from 'debug'
import request from 'client-request'

const debug = Debug('nova:admin:actions:listPages')

const handler = (context) => {
  debug('start')
  // control the user from cookie
  var options = {
    method: 'GET',
    uri: window.location.origin + '/api/pages',
    json: true,
    headers: {
      'Authorization': context.state.token
    }
  }
  request(options, (error, response, body) => {
    if (error) return debug('error %o', error)
    context.setState({collection: body})
  })
}

export default handler
