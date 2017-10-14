/* eslint jsx-quotes: ["error", "prefer-double"] */

const React = require('react')
const Reflux = require('reflux')

const Layout = require('../layout.jsx')

class Page extends Reflux.Component {
  render () {
    return (
      <Layout>
        <h1>NOVA ADMINISTRATION</h1>
      </Layout>
    )
  }
}

module.exports = Page
