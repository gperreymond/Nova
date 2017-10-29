import Debug from 'debug'
import request from 'client-request'

const debug = Debug('nova:admin:actions:createPage')

const handler = (context) => {
  debug('start')
  // control the user from cookie
  var options = {
    method: 'POST',
    uri: window.location.origin + '/api/pages',
    json: true
  }
  request(options, (error, response, body) => {
    if (error) debug('error %o', error)
  })
}

export default handler
