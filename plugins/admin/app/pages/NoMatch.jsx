/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'

import { Button, Group } from '../components'

const NoMatch = ({ location }) => (
  <Group className="application" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
    <Group className="content small" orientation="vertical" height="auto">
      <img alt="logo abibao" className="logo" src="/admin/assets/images/abibao-logo-gris-jaune.png" style={{marginLeft: '-5px'}} />
      <p>&nbsp;</p>
      <h2 className="dark-red">Erreur 404</h2>
      <h4>Vous vous êtes égaré dans la dimension noire.</h4>
      <p>&nbsp;</p>
      <Button href="/admin" label="Retour sur terre" className="button large full dark-red" />
    </Group>
  </Group>
)

export default NoMatch
