const server = require('./system/server')

server.initialize().then(() => {
  return server.start().then(() => {
    console.log('server has started')
  })
}).catch(error => {
  console.log(error)
  process.exit(1)
})
