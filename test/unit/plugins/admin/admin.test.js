const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../plugins/admin/handlers/views')

const requestHome = {
  path: '/admin'
}

describe('[unit] views render /admin', () => {
  it('should success', done => {
    handler(requestHome, {
      view: function (result) {
        expect(result).to.eq('plugins/admin/index')
        done()
      }
    })
  })
})
