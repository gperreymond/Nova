const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../system/handlers/rooter')

const requestHome = {
  path: '/',
  pre: {
    pages: {}
  }
}

const requestNotGoot = {
  path: '/notgood',
  pre: {
    pages: {}
  }
}

describe('[unit] handlers > rooter', () => {
  beforeEach((done) => {
    const getPages = require('../../../../system/methods/getPages')
    getPages((error, result) => {
      if (error) return done(error)
      requestHome.pre.pages.dataProvider = result
      requestNotGoot.pre.pages = result
      done()
    })
  })
  it('should return 404 from /notgood', done => {
    handler(requestNotGoot, (error) => {
      expect(error.isBoom).to.eq(true)
      expect(error.output.statusCode).to.eq(404)
      done()
    })
  })
  it('should success return view from /', done => {
    handler(requestHome, {
      view: function (result) {
        expect(result).to.eq('themes/default/index')
        done()
      }
    })
  })
})
