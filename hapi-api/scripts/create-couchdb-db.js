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

const rawUrl = config.COUCH_DB_URL.split('http://')[1]
const urlWithAuth = `http://${adminUsername}:${adminPassword}@${rawUrl}`
const baseUrl = `${urlWithAuth}:${config.COUCH_DB_PORT}`

async function main () {
  const url = `${baseUrl}/${config.COUCH_DB_NAME}`
  try {
    const resp = await axios.put(url)
    console.log(resp.data)
  } catch (e) {
    console.log('Error')
    console.log(e.response.data)
  }
}

main()
