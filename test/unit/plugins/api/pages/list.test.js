const path = require('path')
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

const requestSuccessPages = {
  path: '/',
  server: {
    methods: {
      getPages: function (callback) {
        const dirpath = path.resolve(__dirname, '../../../..', 'data/pages')
        const dataProvider = [{
          number: '01',
          name: 'home',
          theme: 'default',
          filepath: dirpath + '/01.home/default.md',
          metadata: {
            title: 'Home',
            publish: true
          }
        }, {
          number: '02',
          name: 'projects',
          theme: 'default',
          filepath: dirpath + '/02.projects/default.md',
          metadata: {
            title: 'Projects',
            publish: true
          }
        }]
        callback(null, dataProvider)
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
  it('should success with array empty', done => {
    handler(requestSucess, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.be.a('number')
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
  it('should success with array not empty', done => {
    handler(requestSuccessPages, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.be.a('number')
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
})
