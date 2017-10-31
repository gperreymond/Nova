/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import { Redirect } from 'react-router-dom'

import Actions from '../libs/Actions'
import Store from '../libs/Store'

import { DataGroup, Group, Box, AppBar, Button } from '../components'
import { PageCardListRenderer } from '../components/renderers'

import Debug from 'debug'
const debug = Debug('nova:admin:pages:pages')

class Pages extends Reflux.Component {
  constructor (props) {
    super(props)
    this.state = {
      createPageEnable: false,
      collection: false,
      page: {
        title: 'Nouvelle page',
        folder: 'folder',
        template: 'default'
      }
    }
    this.store = Store
    this.openCreatePage = () => {
      this.setState({ createPageEnable: true, page: { title: 'Nouvelle page', folder: 'folder', template: 'default' } })
    }
    this.closeCreatePage = () => {
      this.setState({ createPageEnable: false, page: { title: 'Nouvelle page', folder: 'folder', template: 'default' } })
    }
    this.handleChangeInformation = (prop) => {
      this.state.page[prop.key] = prop.val
      this.setState({page: this.state.page})
    }
  }
  componentDidMount () {
    debug('componentDidMount')
    Actions.checkCookie()
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.state.collection === false) {
      this.setState({ collection: true })
      Actions.listPages()
    }
  }
  componentWillUnmount () {
    debug('componentWillUnmount')
    Reflux.Component.prototype.componentWillUnmount.call(this)
  }
  render () {
    debug('render currentStage=%s', this.state.currentStage)
    debug('collection=%o', this.state.collection)
    return (
      <Group className={this.state.currentStage === this.state.stages.STATE_PAGE_NORMAL ? 'application no-padding' : 'application'} width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
        {this.state.currentStage === this.state.stages.STATE_REDIRECT_LOGIN && <Redirect to="/admin/login" />}
        {this.state.currentStage === this.state.stages.STATE_CHECK_COOKIE && <Box title="Veuillez patienter" message="Séquence de démarrage enclenchée." />}
        {this.state.currentStage === this.state.stages.STATE_UNCHECK_COOKIE && <Box title="Veuillez patienter" message="Séquence de démarrage enclenchée." />}
        {this.state.currentStage === this.state.stages.STATE_PAGE_NORMAL &&
          <Group width="100%" height="100%" verticalAlign="top" horizontalAlign="center" orientation="vertical">
            <AppBar email={this.state.account.email} />
            {this.state.createPageEnable === false &&
              <Group width="100%" height="100%" orientation="vertical" horizontalAlign="center" verticalAlign="top">
                <Group style={{top: '120px'}} className="content fixed no-border" width="100%" orientation="vertical">
                  <h3 className="title dark-blue">Bienvenue sur l’espace pages</h3>
                  <h4 className="title dark-blue">Le contenu c'est la vie !</h4>
                  <hr />
                  { this.state.collection.count > 0 && <p>Il y a actuellement {this.state.collection.count} pages de disponibles pour le site.</p> }
                  <hr />
                  { this.state.collection.count > 0 && <DataGroup className="content no-border no-padding tile" width="100%" height="100%" orientation="horizontal" verticalAlign="top" dataProvider={this.state.collection.dataProvider} itemRenderer={PageCardListRenderer} /> }
                  <Button onClick={this.openCreatePage} style={{position: 'absolute', right: '20px'}} className="button icon circle orange" icon="plus" />
                </Group>
              </Group>
            }
            {this.state.createPageEnable === true &&
              <Group width="100%" height="100%" orientation="vertical" horizontalAlign="center" verticalAlign="top">
                <Group style={{top: '120px'}} className="content fixed no-border" width="100%" orientation="vertical">
                  <h3 className="title dark-blue">Création d'une page</h3>
                  <h4 className="title dark-blue">Le contenu c'est la vie !</h4>
                  <hr />
                  <div className="content" style={{marginTop: '20px'}}>
                    <div className="form-field">
                      <label>Titre<span className="required">*</span></label>
                      <input type="text" className="border" placeholder="Même une page doit avoir un titre" defaultValue={this.state.page.title} onChange={(e) => this.handleChangeInformation({key: 'title', val: e.target.value})} />
                    </div>
                    <div className="form-field">
                      <label>Dossier<span className="required">*</span></label>
                      <input type="text" className="border" placeholder="Même une page doit avoir un dossier" defaultValue={this.state.page.folder} onChange={(e) => this.handleChangeInformation({key: 'folder', val: e.target.value})} />
                    </div>
                    <div className="form-field">
                      <label>Template<span className="required">*</span></label>
                      <input type="text" className="border" placeholder="Même une page doit avoir un template" defaultValue={this.state.page.template} onChange={(e) => this.handleChangeInformation({key: 'template', val: e.target.value})} />
                    </div>
                    <Group width="100%" horizontalAlign="right">
                      <Button className="button large orange" label="Sauver" onClick={(e) => Actions.createPage(this.state.page)} />
                    </Group>
                  </div>
                  <Button onClick={this.closeCreatePage} style={{position: 'absolute', right: '20px'}} className="button icon circle dark-red" icon="close" />
                </Group>
              </Group>
            }
          </Group>
        }
      </Group>
    )
  }
}

export default Pages
