/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

class Layout extends Reflux.Component {
  render () {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link rel="stylesheet" href="/admin/assets/css/main.css" />
          <title>Nova Administration</title>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    )
  }
}

module.exports = Layout
