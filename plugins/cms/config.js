const config = {
  pre: [
    { method: require('../api/handlers/pages/list'), assign: 'pages' }
  ]
}

module.exports = config
