module.exports = async function (server, middlewares) { 
  server.get('/api/users', ...middlewares, require('./read'))
  server.post('/api/user', ...middlewares, require('./create'))
}