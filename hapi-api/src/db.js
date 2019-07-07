const nano = require('nano')

const createDb = ({ url }) => nano(url)

module.exports = {
  createDb
}
