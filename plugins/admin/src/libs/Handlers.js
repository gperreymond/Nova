import onCheckCookie from './handlers/onCheckCookie'
import onAuthGoogle from './handlers/onAuthGoogle'
import onLogout from './handlers/onLogout'
import onCreatePage from './handlers/onCreatePage'
import onListPages from './handlers/onListPages'

class Handlers {
}

Handlers.prototype.onCheckCookie = onCheckCookie
Handlers.prototype.onAuthGoogle = onAuthGoogle
Handlers.prototype.onLogout = onLogout
Handlers.prototype.onCreatePage = onCreatePage
Handlers.prototype.onListPages = onListPages

export default Handlers
