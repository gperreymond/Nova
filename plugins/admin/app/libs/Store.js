import Reflux from 'reflux'
import cookie from 'react-cookies'

import Actions from './Actions'

class Store extends Reflux.Store {
  constructor () {
    super()
    this.state = {
      generalError: false,
      rememberMe: false,
      user: false,
      initialized: false,
      loader: {
        title: 'Intialisation en cours...',
        message: 'Ouverture des caisses d’approvisionnement.'
      },
      campaigns: {
        open: false,
        dataProvider: []
      }
    }
    this.listenables = [Actions]
  }
  onCheckCookie () {
    cookie.save('rememberMe', 'TOKEN JWT2', { path: '/' })
    const rememberMe = cookie.load('rememberMe', { path: '/' })
    console.log('rememberMe', rememberMe)
  }
}

export default Store
