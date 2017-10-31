/* eslint jsx-quotes: ["error", "prefer-double"] */

import React, { Component } from 'react'

import { Group } from '../components'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false
    }
  }

  componentDidCatch (error, errorInfo) {
    // display fallback UI
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true
    })
    // log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  render () {
    if (this.state.hasError) {
      return (
        <Group className="application" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
          <Group className="content small" orientation="vertical" height="auto">
            <img alt="logo abibao" className="logo" src="/admin/assets/images/abibao-logo-gris-jaune.png" style={{marginLeft: '-5px'}} />
            <hr />
            <h2 className="dark-red">Un gremlin est coincé quelque part...</h2>
            <h4>{this.state.error && this.state.error.toString()}</h4>
            <hr />
            {this.state.errorInfo.componentStack}
          </Group>
        </Group>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
