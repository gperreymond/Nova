/* eslint jsx-quotes: ["error", "prefer-double"] */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Actions from '../libs/Actions'
import { Group } from '.'

class AppBox extends Component {
  constructor (props) {
    super(props)
    this.animate = () => {
      document.getElementById('sidenav').className === 'sidenav hidden' ? document.getElementById('sidenav').className = 'sidenav' : document.getElementById('sidenav').className = 'sidenav hidden'
    }
    this.logout = () => Actions.logout()
    this.gotoPages = () => {
    }
  }
  render () {
    return (
      <Group width="100%">
        <Group className="appbar" width="100%" height="80px" horizontalAlign="center">
          <Group width="100%" height="auto">
            <img alt="logo abibao" className="logo" src="/admin/assets/images/abibao-logo-gris-jaune.png" />
          </Group>
        </Group>
        <Group style={{marginTop: '80px'}} width="100%" height="auto" verticalAlign="top" horizontalAlign="center" orientation="vertical">
          <div id="sidenav" className="sidenav hidden">
            <h4>Gilles Perreymond</h4><h6>Administrateur</h6>
            <a className="closebtn" onClick={this.animate}>&times;</a>
            <NavLink to="/admin">Dashboard</NavLink>
            <a className="disable">Configuration</a>
            <NavLink to="/admin/pages">Pages</NavLink>
            <br />
            <a className="logout" onClick={this.logout}>Logout</a>
            <a className="openbtn" onClick={this.animate}>&#9660;</a>
            <span className="title">Gilles Perreymond</span>
          </div>
        </Group>
      </Group>
    )
  }
}

export default AppBox
