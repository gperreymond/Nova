const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../../../system/handlers/api/pages/list')

const requestSucess = {
  path: '/',
  server: {
    methods: {
      getPages: require('../../../../../../system/methods/getPages')
    }
  }
}

describe('[unit] handlers > api/pages/list', () => {
  it('should success loading home from /', done => {
    handler(requestSucess, (result) => {
      expect(result.type).to.eq('pages')
      expect(result.count).to.be.a('number')
      expect(result.dataProvider).to.be.an('array')
      done()
    })
  })
})
