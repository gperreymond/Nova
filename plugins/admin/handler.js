 // .header('authorization', request.headers.authorization)

const handler = (request, reply) => {
  reply.view('plugins/admin/themes/default/index', {})
}

module.exports = handler
