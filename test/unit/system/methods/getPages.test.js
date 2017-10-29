const chai = require('chai')
const expect = chai.expect

const method = require('../../../../system/methods/getPages')

describe('[unit] methods getPages', () => {
  it('should success', done => {
    method((error, result) => {
      if (error) return done(error)
      expect(result).to.be.an('array')
      done()
    })
  })
})
