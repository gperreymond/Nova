module.exports = {
  auth: {
    strategy: 'jwt',
    access: [{
      scope: ['admin']
    }]
  }
}
