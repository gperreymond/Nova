 // .header('authorization', request.headers.authorization)

const handler = (request, reply) => {
  reply.view('plugins/admin/index', {location: request.path})
}

module.exports = handler
