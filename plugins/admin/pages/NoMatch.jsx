/* eslint jsx-quotes: ["error", "prefer-double"] */

// react
import React from 'react'

// semantic
import { Container, Segment, Header, Icon } from 'semantic-ui-react'

const NoMatch = ({ location }) => (
  <Container fluid>
    <Segment basic padded>
      <Header as="h1" color="red" icon>
        <Icon name="help circle" size="huge" />
        404
        <Header.Subheader>Oups, vous vous êtes égaré dans la dimension noire !</Header.Subheader>
      </Header>
    </Segment>
  </Container>
)

export default NoMatch
