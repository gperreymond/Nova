const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../system/handlers/rooter')

const requestHome = {
  path: '/',
  server: {
    methods: {
      getPages: require('../../../../system/methods/getPages')
    }
  }
}

const requestNotGoot = {
  path: '/notgood',
  server: {
    methods: {
      getPages: require('../../../../system/methods/getPages')
    }
  }
}

describe('[unit] handlers > rooter', () => {
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
        expect(result).to.eq('default/index')
        done()
      }
    })
  })
})
