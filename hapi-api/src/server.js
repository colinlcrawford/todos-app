const Glue = require('@hapi/glue')
const Pack = require('../package.json')

const hapiSwaggerOptions = {
  info: {
    title: Pack.name,
    description: Pack.description,
    version: Pack.version
  },
  swaggerUI: true,
  basePath: '/',
  pathPrefixSize: 2,
  jsonPath: '/docs/swagger.json',
  sortPaths: 'path-method',
  lang: 'en',
  tags: [
    { name: 'api' }
  ],
  documentationPath: '/',
  securityDefinitions: {}
}

const getManifest = ({ port, nodeEnv }) => ({
  server: {
    port,
    routes: {
      cors: true
    }
  },
  register: {
    plugins: [
      require('blipp'),
      require('@hapi/inert'),
      require('@hapi/vision'),
      {
        plugin: require('hapi-swagger'),
        options: hapiSwaggerOptions
      },
      {
        plugin: require('hapi-pino'),
        options: {
          prettyPrint: nodeEnv !== 'production',
          // Redact Authorization headers, see https://getpino.io/#/docs/redaction
          redact: ['req.headers.authorization'],
          ...(nodeEnv === 'test' ? { logEvents: false } : {})
        }
      },
      { plugin: './todos', routes: { prefix: '/api/v1' } }
    ]
  }
})

const glueOptions = { relativeTo: __dirname }

const createServer = async ({ port, nodeEnv }) =>
  Glue.compose(getManifest({ port, nodeEnv }), glueOptions)

const startServer = async server => {
  await server.start()
  return server
}

const initServer = async server => {
  await server.initialize()
  return server
}

module.exports = {
  createServer,
  startServer,
  initServer
}
