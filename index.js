const { config: authentication, befores = [], afters = [] } = require('./authentication')
const userResource = require('./resources/user')

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],
  triggers: {},
  searches: {},
  creates: {},
  resources: {
    [userResource.key]: userResource
  }
}
