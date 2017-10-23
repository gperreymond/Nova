const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../../plugins/api/handlers/pages/list')

const requestSucess = {
  path: '/',
  server: {
    methods: {
      getPages: require('../../../../../system/methods/getPages')
    }
  }
}

const requestFail = {
  path: '/',
  server: {
    methods: {
      getPages: function (callback) {
        callback(new Error('ERROR_TEST_UNIT'))
      }
    }
  }
}

describe('[unit] plugin api/pages/list', () => {
  it('should fail because getPages() return an error', done => {
    handler(requestFail, (error) => {
      expect(error.isBoom).to.eq(true)
      done()
    })
  })
  it('should success', done => {
    handler(requestSucess, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.be.a('number')
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
})
