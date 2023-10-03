const { config: authentication, befores = [], afters = [] } = require('./authentication')
const userUpdate = require('./creates/users/update_user')
const userResource = require('./resources/user')

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],
  triggers: {},
  searches: {},
  creates: {
    [userUpdate.key]: userUpdate
  },
  resources: {
    [userResource.key]: userResource
  }
}
