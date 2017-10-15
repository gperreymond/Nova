/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

import Layout from './components/Layout.jsx'
import Application from './components/Application.jsx'

class Page extends Reflux.Component {
  render () {
    return (
      <Layout>
        <Application {...this.props} />
      </Layout>
    )
  }
}

module.exports = Page
