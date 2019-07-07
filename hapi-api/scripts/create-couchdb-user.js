const axios = require('axios')
const config = require('../src/config/config').getConfig()

const adminUsername = process.env.COUCH_DB_ADMIN_USERNAME
const adminPassword = process.env.COUCH_DB_ADMIN_PASSWORD

if (!adminUsername) {
  throw new Error('COUCH_DB_ADMIN_USERNAME not set in the env')
}

if (!adminPassword) {
  throw new Error('COUCH_DB_ADMIN_PASSWORD not set in the env')
}

const user = {
  name: config.COUCH_DB_USERNAME,
  password: config.COUCH_DB_PASSWORD,
  roles: [],
  type: 'user'
}

const rawUrl = config.COUCH_DB_URL.split('http://')[1]
const urlWithAuth = `http://${adminUsername}:${adminPassword}@${rawUrl}`
const baseUrl = `${urlWithAuth}:${config.COUCH_DB_PORT}`

async function main () {
  try {
    console.log('creating _users db')
    const resp = await axios.put(`${baseUrl}/_users`)
    console.log(resp.data)
  } catch (e) {
    console.log(e.response.data)
    console.log('_users db already exists')
  }

  try {
    const url = `${baseUrl}/_users/org.couchdb.user:${user.name}`
    const resp = await axios.put(url, user)
    console.log(resp.data)
  } catch (e) {
    console.log('Error')
    console.log(e.response.data)
  }
}

main()
