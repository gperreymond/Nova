/* eslint jsx-quotes: ["error", "prefer-double"] */

const React = require('react')
const Reflux = require('reflux')

class Layout extends Reflux.Component {
  render () {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Nova Administration</title>
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: this.props.children }} />
        </body>
      </html>
    )
  }
}

module.exports = Layout
