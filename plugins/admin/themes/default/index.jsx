/* eslint jsx-quotes: ["error", "prefer-double"] */

const React = require('react')
const Reflux = require('reflux')

class Page extends Reflux.Component {
  render () {
    return (
      <div>
        <h1>NOVA ADMINISTRATION</h1>
      </div>
    )
  }
}

module.exports = Page
