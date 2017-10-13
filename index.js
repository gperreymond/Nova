const server = require('./system/server')

server.run().then(() => {
  console.log('Server is listening at ' + server.info.uri)
}).catch(error => {
  console.log(error)
  process.exit(1)
})
