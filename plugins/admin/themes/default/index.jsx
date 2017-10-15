/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

import { Button } from 'semantic-ui-react'

import Layout from './layout.jsx'

class Page extends Reflux.Component {
  render () {
    return (
      <Layout>
        <h1>NOVA ADMINISTRATION</h1>
        <Button>Login</Button>
      </Layout>
    )
  }
}

module.exports = Page
