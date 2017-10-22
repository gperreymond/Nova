/* eslint jsx-quotes: ["error", "prefer-double"] */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { isNil } from 'lodash'

import { Group, Button } from '.'

class Box extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasButton: !isNil(this.props.onClick)
    }
  }
  render () {
    const { title, message } = this.props
    const { hasButton } = this.state
    let button = <Button onClick={this.props.onClick} label="Contrôle des papiers" className="button large full dark-blue" />
    return (
      <Group className="content small" orientation="vertical" height="auto">
        <img alt="logo abibao" className="logo" src="/admin/assets/images/abibao-logo-gris-jaune.png" style={{marginLeft: '-5px'}} />
        <hr />
        <h2 className="dark-blue">{title}</h2>
        <h4>{message}</h4>
        {hasButton && <hr />}
        {hasButton && button}
      </Group>
    )
  }
}

Box.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Box
