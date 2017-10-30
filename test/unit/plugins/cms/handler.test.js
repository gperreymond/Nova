const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../plugins/cms/handler')
const getPages = require('../../../../system/methods/getPages')

const request404 = {
  path: '/nothing',
  pre: {},
  server: {}
}

const requestSucess = {
  path: '/',
  pre: {},
  server: {}
}

describe('[unit] plugin cms', () => {
  it('should return a 404 from /nothing', done => {
    getPages((error, result) => {
      if (error) return done(error)
      request404.pre.pages = {
        dataProvider: result
      }
      handler(request404, (error) => {
        expect(error.isBoom).to.equal(true)
        done()
      })
    })
  })
  it('should success read /home', done => {
    getPages((error, result) => {
      if (error) return done(error)
      requestSucess.pre.pages = {
        dataProvider: result
      }
      handler(requestSucess, {
        view: function (result) {
          expect(result).to.equal('themes/default/index')
          done()
        }
      })
    })
  })
})
