/* eslint jsx-quotes: ["error", "prefer-double"] */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class Button extends Component {
  constructor (props) {
    super(props)
    // constants
    // internal state
    this.internal = {
    }
    this.state = {
      style: {}
    }
    this.style = () => {
      // internal style
      let style = Object.assign(this.props.style || {}, {})
      return style
    }
  }
  componentDidMount () {
    this.setState({
      style: this.style()
    })
  }
  render () {
    // constants
    const {
      id,
      label,
      icon,
      className,
      href,
      onClick
    } = this.props
    // internal state
    const { style } = this.state
    // internal style
    // visual
    if (icon) {
      return (
        <a id={id} className={className} href={href} onClick={onClick} style={style}><FontAwesome style={{margin: 'auto'}} name={icon} /></a>
      )
    }
    return (
      <a id={id} className={className} href={href} onClick={onClick} style={style}>{label || ''}</a>
    )
  }
}

Button.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
