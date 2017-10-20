const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../../plugins/api/handlers/plugins/list')

const requestSucess = {
  path: '/',
  server: {
    methods: {
      getPlugins: require('../../../../../system/methods/getPlugins')
    }
  }
}

describe('[unit] plugin api/plugins/list', () => {
  it('should success', done => {
    handler(requestSucess, (result) => {
      expect(result.type).to.eq('plugins')
      expect(result.count).to.be.a('number')
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
})
