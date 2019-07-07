const dotenv = require('dotenv')
const Joi = require('@hapi/joi')
const R = require('ramda')

// load env from file based on NODE_ENV
dotenv.config({ path: `environments/${process.env.NODE_ENV}.env` })

const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid(['dev', 'test', 'production']).required(),
  PORT: Joi.number().default(3000),
  COUCH_DB_URL: Joi.string().uri().required(),
  COUCH_DB_PORT: Joi.number().required(),
  COUCH_DB_NAME: Joi.string().required(),
  COUCH_DB_USERNAME: Joi.string().required(),
  COUCH_DB_PASSWORD: Joi.string().required()
})

const extractEnvVariables = (env = process.env) => ({
  NODE_ENV: env.NODE_ENV,
  COUCH_DB_URL: env.COUCH_DB_URL,
  COUCH_DB_PORT: env.COUCH_DB_PORT,
  COUCH_DB_NAME: env.COUCH_DB_NAME,
  COUCH_DB_USERNAME: env.COUCH_DB_USERNAME,
  COUCH_DB_PASSWORD: env.COUCH_DB_PASSWORD,
  PORT: env.PORT
})

// crash the program if the environment is invalid
const throwError = err => { throw new Error(JSON.stringify(err)) }
const envHasError = R.pipe(R.prop(['error']), R.isNil, R.not)
const throwEnvError = R.pipe(R.prop(['error']), throwError)

const validateConfig = config =>
  R.ifElse(envHasError, throwEnvError, R.prop(['value']))(Joi.validate(config, configSchema))

const getConfig = R.pipe(
  extractEnvVariables,
  validateConfig
)

module.exports = {
  getConfig,
  extractEnvVariables,
  configSchema
}
