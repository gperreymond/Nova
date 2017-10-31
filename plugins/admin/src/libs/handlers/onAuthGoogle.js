import Debug from 'debug'

const debug = Debug('nova:admin:actions:authGoogle')

const handler = (context) => {
  debug('start')
  window.location = '/admin/auth/login'
}

export default handler
