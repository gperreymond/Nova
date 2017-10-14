/* eslint jsx-quotes: ["error", "prefer-double"] */

const React = require('react')
const Reflux = require('reflux')

const Layout = require('../layout.jsx')
const ReactMarkdown = require('react-markdown')

class Page extends Reflux.Component {
  render () {
    return (
      <Layout {...this.props}>
        <ReactMarkdown className="markdown-body" source={this.props.content} />
        <link href="themes/default/css/github-markdown.min.css" type="text/css" rel="stylesheet" />
      </Layout>
    )
  }
}

module.exports = Page
