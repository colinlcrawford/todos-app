const R = require('ramda')
const { createServer, startServer } = require('./server')
const { PORT, NODE_ENV } = require('./config/config').getConfig()

const init = async () => {
  const options = { port: PORT, nodeEnv: NODE_ENV }

  await R.pipe(
    createServer,
    R.then(startServer)
  )(options)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
