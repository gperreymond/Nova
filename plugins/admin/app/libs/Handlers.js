import onCheckCookie from './handlers/onCheckCookie'
import onAuthGoogle from './handlers/onAuthGoogle'
import onLogout from './handlers/onLogout'

class Handlers {
}

Handlers.prototype.onCheckCookie = onCheckCookie
Handlers.prototype.onAuthGoogle = onAuthGoogle
Handlers.prototype.onLogout = onLogout

export default Handlers
