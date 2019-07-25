async function createAuthTokenHandler (request, h) {
  return { token: 'success!' }
}

module.exports = {
  createAuthTokenHandler
}
