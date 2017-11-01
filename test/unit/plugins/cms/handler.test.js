const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../plugins/cms/handler')
const list = require('../../../../plugins/api/pages/list')

const request404 = {
  path: '/nothing',
  pre: {},
  server: {
    methods: {
      getPages: require('../../../../system/methods/getPages'),
      getMetadataFromFile: require('../../../../system/methods/getMetadataFromFile')
    }
  }
}

const requestSucess = {
  path: '/',
  pre: {},
  server: {
    methods: {
      getPages: require('../../../../system/methods/getPages'),
      getMetadataFromFile: require('../../../../system/methods/getMetadataFromFile')
    }
  }
}

describe('[unit] plugin cms', () => {
  it('should return a 404 from /nothing', done => {
    list(request404, (result) => {
      request404.pre.pages = result
      handler(request404, (error) => {
        expect(error.isBoom).to.equal(true)
        done()
      })
    })
  })
  it('should success read /home', done => {
    list(requestSucess, (result) => {
      requestSucess.pre.pages = result
      handler(requestSucess, {
        view: function (result) {
          console.log(result)
          expect(result).to.equal('themes/default/index')
          done()
        }
      })
    })
  })
})
