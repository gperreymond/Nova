const handler = async (request, reply) => {
  console.log(request)
  reply({account: true})
}

module.exports = handler
