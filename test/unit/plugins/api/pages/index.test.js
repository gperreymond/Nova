const chai = require('chai')
const expect = chai.expect

const list = require('../../../../../plugins/api/handlers/pages/list')
const create = require('../../../../../plugins/api/handlers/pages/create')

const requestSucess = {
  path: '/',
  server: {
    methods: {
      getPages: require('../../../../../system/methods/getPages')
    }
  }
}

const requestListFail = {
  path: '/',
  server: {
    methods: {
      getPages: function (callback) {
        callback(new Error('ERROR_TEST_UNIT'))
      }
    }
  }
}

const requestListSucessEmpty = {
  path: '/',
  server: {
    methods: {
      getPages: function (callback) {
        const dataProvider = []
        callback(null, dataProvider)
      }
    }
  }
}

describe('[unit] plugin api/pages/list', () => {
  it('should fail because getPages() return an error', done => {
    list(requestListFail, (error) => {
      expect(error.isBoom).to.eq(true)
      done()
    })
  })
  it('should list success and return no pages', done => {
    list(requestListSucessEmpty, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.equal(0)
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
  it('should list success and return 2 pages', done => {
    list(requestSucess, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.equal(2)
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
  it('should create a new pages', done => {
    create(requestSucess, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.be.a('number')
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
})
