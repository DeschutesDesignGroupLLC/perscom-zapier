const zapier = require('zapier-platform-core')

zapier.tools.env.inject()

const App = require('../../../index')
const nock = require('nock')
const appTester = zapier.createAppTester(App)

describe('creates.update_user', () => {
  it('should run the update operation', async () => {
    const bundle = {
      inputData: {
        id: 1,
        updateBody: {
          name: 'foo bar'
        }
      }
    }

    nock('https://' + process.env.API_URL + '/v1')
      .put('/users/' + bundle.inputData.id)
      .reply(200, {
        data: {
          id: bundle.inputData.id,
          name: bundle.inputData.updateBody.name
        }
      })

    const results = await appTester(App.creates.update_user.operation.perform, bundle)

    expect(results).toBeDefined()
    expect(results.name).toEqual('foo bar')
  })
})
