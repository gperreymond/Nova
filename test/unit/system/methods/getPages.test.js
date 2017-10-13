const chai = require('chai')
const expect = chai.expect

const method = require('../../../../system/methods/getPages')

describe('[unit] methods > getPages', () => {
  it('should success loading home from /', done => {
    method('/', (error, result) => {
      if (error) return done(error)
      let page = result[0]
      expect(page.number).to.eq('01')
      expect(page.name).to.eq('home')
      done()
    })
  })
})
