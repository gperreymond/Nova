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
      stages: {
        STATE_PAGE_LOGIN: 'STATE_PAGE_LOGIN',
        STATE_PAGE_LOGIN_LOADING: 'STATE_PAGE_LOGIN_LOADING'
      },
      currentStage: false
    }
    this.listenables = [Actions]
    this.handlers = new Handlers()
  }
  onCheckCookie () { this.handlers.onCheckCookie(this) }
  onAuthGoogle () { this.handlers.onAuthGoogle(this) }
}

export default Store
