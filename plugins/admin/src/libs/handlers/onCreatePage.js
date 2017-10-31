import Debug from 'debug'
import request from 'client-request'

const debug = Debug('nova:admin:actions:createPage')

const handler = (data, context) => {
  debug('start')
  // control the user from cookie
  var options = {
    method: 'POST',
    uri: window.location.origin + '/api/pages',
    json: true,
    headers: {
      'Authorization': context.state.token
    },
    body: data
  }
  request(options, (error, response, body) => {
    if (error) return debug('error %o', error)
    context.setState({collection: body})
    context.setState({ createPageEnable: false, page: { title: 'Nouvelle page', folder: 'folder', template: 'default' } })
  })
}

export default handler
