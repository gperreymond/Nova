const server = require('./system/server')

server.run().then(() => {
  console.log('server started')
}).catch(error => {
  console.log(error)
  process.exit(1)
})
