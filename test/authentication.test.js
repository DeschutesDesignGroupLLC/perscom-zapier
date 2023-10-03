const zapier = require('zapier-platform-core')

zapier.tools.env.inject()

const App = require('../index')
const nock = require('nock')
const appTester = zapier.createAppTester(App)

process.env.CLIENT_ID = process.env.CLIENT_ID || 'foo'
process.env.CLIENT_SECRET = process.env.CLIENT_SECRET || 'bar'

describe('oauth2 app', () => {
  beforeAll(() => {
    if (!(process.env.CLIENT_ID && process.env.CLIENT_SECRET)) {
      throw new Error(`Before running the tests, make sure CLIENT_ID and CLIENT_SECRET are available in the environment.`)
    }
  })

  it('generates an authorize URL', async () => {
    const bundle = {
      inputData: {
        state: '4444',
        redirect_uri: 'https://zapier.com/',
        dashboardUrl: 'test.lvh.me',
        perscomId: 1,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      }
    }

    const authorizeUrl = await appTester(App.authentication.oauth2Config.authorizeUrl, bundle)

    expect(authorizeUrl).toBe(
      'https://test.lvh.me/oauth/authorize?client_id=foo&state=4444&redirect_uri=https%3A%2F%2Fzapier.com%2F&response_type=code'
    )
  })

  it('can fetch an access token', async () => {
    const bundle = {
      inputData: {
        dashboardUrl: 'test.lvh.me',
        perscomId: 1,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        code: 'one_time_code'
      }
    }

    nock('https://test.lvh.me/oauth').post('/token').reply(200, {
      access_token: 'foo',
      refresh_token: 'bar'
    })

    const result = await appTester(App.authentication.oauth2Config.getAccessToken, bundle)

    expect(result.access_token).toBe('foo')
    expect(result.refresh_token).toBe('bar')
  })

  it('can refresh the access token', async () => {
    const bundle = {
      inputData: {
        dashboardUrl: 'test.lvh.me',
        perscomId: 1,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        code: 'one_time_code'
      },
      authData: {
        access_token: 'foo',
        refresh_token: 'bar'
      }
    }

    nock('https://test.lvh.me/oauth').post('/token').reply(200, {
      access_token: 'foo'
    })

    const result = await appTester(App.authentication.oauth2Config.refreshAccessToken, bundle)
    expect(result.access_token).toBe('foo')
  })

  it('includes the access token in future requests', async () => {
    const bundle = {
      authData: {
        access_token: 'foo',
        refresh_token: 'bar'
      }
    }

    nock('https://' + process.env.API_URL + '/v1')
      .get('/me')
      .reply(200, {
        data: {
          id: 1,
          name: 'foo bar',
          email: 'foo@bar.com'
        }
      })

    const response = await appTester(App.authentication.test, bundle)

    expect(response.data.data).toHaveProperty('name')
    expect(response.data.data.name).toBe('foo bar')
  })
})
