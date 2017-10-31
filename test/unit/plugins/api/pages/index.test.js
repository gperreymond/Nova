const chai = require('chai')
const expect = chai.expect

const list = require('../../../../../plugins/api/handlers/pages/list')
const create = require('../../../../../plugins/api/handlers/pages/create/handler')

const requestCreateSuccess = {
  path: '/',
  payload: {
    title: 'test title',
    folder: 'testfolder',
    template: 'test_template'
  },
  server: {
    methods: {
      getPages: require('../../../../../system/methods/getPages')
    }
  }
}

const requestListSuccess = {
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

const requestListSuccessEmpty = {
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
    list(requestListSuccessEmpty, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.equal(0)
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
  it('should list success and return 2 pages', done => {
    list(requestListSuccess, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.equal(2)
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
  it('should create a new pages', done => {
    create(requestCreateSuccess, (result) => {
      // expect(result.type).to.eq('pages')
      // expect(result.count).to.be.a('number')
      // expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
})
