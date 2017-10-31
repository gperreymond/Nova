import Reflux from 'reflux'

import Actions from './Actions'
import Handlers from './Handlers'

import Debug from 'debug'
const debug = Debug('nova:admin:store')

class Store extends Reflux.Store {
  constructor () {
    debug('constructor')
    super()
    this.state = {
      token: false,
      account: false,
      stages: {
        STATE_REDIRECT_LOGIN: 'STATE_REDIRECT_LOGIN',
        STATE_REDIRECT_HOMEPAGE: 'STATE_REDIRECT_HOMEPAGE',
        STATE_CHECK_COOKIE: 'STATE_CHECK_COOKIE',
        STATE_CHECK_UNCOOKIE: 'STATE_CHECK_UNCOOKIE',
        STATE_PAGE_NORMAL: 'STATE_PAGE_NORMAL',
        STATE_PAGE_LOGIN: 'STATE_PAGE_LOGIN'
      },
      currentStage: false
    }
    this.listenables = [Actions]
    this.handlers = new Handlers()
  }
  onCheckCookie () { this.handlers.onCheckCookie(this) }
  onAuthGoogle () { this.handlers.onAuthGoogle(this) }
  onLogout () { this.handlers.onLogout(this) }
  onCreatePage (data) { this.handlers.onCreatePage(data, this) }
  onListPages () { this.handlers.onListPages(this) }
}

export default Store
