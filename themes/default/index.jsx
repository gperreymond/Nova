/* eslint jsx-quotes: ["error", "prefer-double"] */

const React = require('react')
const Reflux = require('reflux')

const ReactMarkdown = require('react-markdown')

class Page extends Reflux.Component {
  render () {
    return (
      <div>
        <ReactMarkdown className="markdown-body" source={this.props.content} />
        <link href="themes/default/css/github-markdown.min.css" type="text/css" rel="stylesheet" />
      </div>
    )
  }
}

module.exports = Page
