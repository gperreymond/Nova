/* eslint jsx-quotes: ["error", "prefer-double"] */

const React = require('react')
const Reflux = require('reflux')
const ReactMarkdown = require('react-markdown')

const Layout = require('./layout.jsx')

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
