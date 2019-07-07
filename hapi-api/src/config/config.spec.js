const { expect } = require('@hapi/code')
const lab = exports.lab = require('@hapi/lab').script()
const { describe, it } = lab

const {
  extractEnvVariables,
  getConfig
} = require('./config')

const validEnv = {
  NODE_ENV: 'test',
  COUCH_DB_URL: 'http://some-url',
  COUCH_DB_PORT: 5984,
  COUCH_DB_NAME: 'some-db-name',
  COUCH_DB_USERNAME: 'some-user',
  COUCH_DB_PASSWORD: 'some-pass',
  PORT: 5000
}

describe('config', () => {
  describe('extractEnvVariables()', () => {
    it('should pull out properties from the environment', () => {
      const envWithExtraVars = { ...validEnv, 'SOMETHING_ELSE': 'something-else' }
      const env = extractEnvVariables(envWithExtraVars)

      expect(env).to.equal(validEnv)
    })
  })

  describe('getConfig()', () => {
    it('should show no errors for a valid env', () => {
      const getValidConfig = () => getConfig(validEnv)

      expect(getValidConfig).to.not.throw()
    })

    it('should validate the node environment', () => {
      const getConfigWithBadNodeEnv = () =>
        getConfig({ ...validEnv, NODE_ENV: 'wrong!' })

      expect(getConfigWithBadNodeEnv).to.throw()
    })

    it('should validate the couchdb url', () => {
      const getConfigWithBadCouchDbUrl = () =>
        getConfig({ ...validEnv, COUCH_DB_URL: 'wrong!' })

      expect(getConfigWithBadCouchDbUrl).to.throw()
    })

    it('should validate the couchdb port', () => {
      const getConfigWithBadCouchDbUrl = () =>
        getConfig({ ...validEnv, COUCH_DB_PORT: 'wrong!' })

      expect(getConfigWithBadCouchDbUrl).to.throw()
    })

    it('should validate the couchdb username', () => {
      const getConfigWithBadCouchDbUsername = () =>
        getConfig({ ...validEnv, COUCH_DB_USERNAME: undefined })

      expect(getConfigWithBadCouchDbUsername).to.throw()
    })

    it('should validate the couchdb db name', () => {
      const getConfigWithBadCouchDbName = () =>
        getConfig({ ...validEnv, COUCH_DB_NAME: undefined })

      expect(getConfigWithBadCouchDbName).to.throw()
    })

    it('should validate the couchdb password', () => {
      const getConfigWithBadCouchDbPassword = () =>
        getConfig({ ...validEnv, COUCH_DB_PASSWORD: undefined })

      expect(getConfigWithBadCouchDbPassword).to.throw()
    })

    it('should return the config', () => {
      const config = getConfig(validEnv)

      expect(config).to.equal(validEnv)
    })

    it('should throw an error for an invalid config', () => {
      const getInvalidConfig = () =>
        getConfig({ ...validEnv, NODE_ENV: 'wrong!' })

      expect(getInvalidConfig).to.throw()
    })
  })
})
