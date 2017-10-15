/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

import Layout from './layout.jsx'
import ReactMarkdown from 'react-markdown'

class Page extends Reflux.Component {
  render () {
    return (
      <Layout {...this.props}>
        <ReactMarkdown className="markdown-body" source={this.props.content} />
      </Layout>
    )
  }
}

module.exports = Page
