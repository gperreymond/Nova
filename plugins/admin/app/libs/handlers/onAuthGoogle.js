import Debug from 'debug'

const debug = Debug('nova:admin:actions:authGoogle')

const handler = (context) => {
  debug('start')
  window.location = '/admin/login'
}

export default handler
