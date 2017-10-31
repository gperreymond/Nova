/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router-dom'

import { Group } from '..'

class PageCardListRenderer extends Reflux.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.redirect = () => {
      let path = '/admin/pages/' + this.props.data.metadata.uuid
      this.setState({redirect: path})
    }
  }
  render () {
    return (
      <Link className="content card" to={'/admin/pages/' + this.props.data.metadata.uuid}>
        <Group width="100%" height="100%" orientation="vertical" horizontalAlign="left" verticalAlign="bottom" onClick={this.redirect}>
          <h2>/{this.props.data.name}</h2>
          <img className="picture" src="/admin/assets/images/default/page.png" />
          <h3>{this.props.data.metadata.title}</h3>
        </Group>
      </Link>
    )
  }
}

export default PageCardListRenderer
