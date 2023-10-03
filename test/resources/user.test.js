const zapier = require('zapier-platform-core')

zapier.tools.env.inject()

const App = require('../../index')
const nock = require('nock')
const appTester = zapier.createAppTester(App)

describe('resources.user', () => {
  it('should run the get operation', async () => {
    const bundle = {
      inputData: {
        id: 1
      }
    }

    nock('https://' + process.env.API_URL + '/v1')
      .get('/users/' + bundle.inputData.id)
      .reply(200, {
        data: {
          id: bundle.inputData.id,
          name: 'foo bar',
          email: 'foo@bar.com'
        }
      })

    const results = await appTester(App.resources.user.get.operation.perform, bundle)

    expect(results).toBeDefined()
    expect(results).toHaveProperty('id', 'name', 'email')
    expect(results.name).toEqual('foo bar')
    expect(results.email).toEqual('foo@bar.com')
  })

  it('should run the list operation', async () => {
    const bundle = { inputData: {} }

    nock('https://' + process.env.API_URL + '/v1')
      .get('/users')
      .reply(200, {
        data: [
          {
            id: 1,
            name: 'foo bar',
            email: 'foo@bar.com'
          }
        ]
      })

    const results = await appTester(App.resources.user.list.operation.perform, bundle)
    const user = results[0]

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBeTruthy()
    expect(user).toHaveProperty('id', 'name', 'email')
    expect(user.name).toEqual('foo bar')
    expect(user.email).toEqual('foo@bar.com')
  })

  it('should run the search operation', async () => {
    const bundle = {
      inputData: {
        searchValue: 'foo'
      }
    }

    nock('https://' + process.env.API_URL + '/v1')
      .post('/users/search')
      .reply(200, {
        data: [
          {
            id: 1,
            name: 'foo bar',
            email: 'foo@bar.com'
          }
        ]
      })

    const results = await appTester(App.resources.user.search.operation.perform, bundle)
    const user = results[0]

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBeTruthy()
    expect(user).toHaveProperty('id', 'name', 'email')
    expect(user.name).toEqual('foo bar')
    expect(user.email).toEqual('foo@bar.com')
  })

  it('should run the create operation', async () => {
    const bundle = {
      inputData: {
        name: 'foo bar',
        email: 'foo@bar.com'
      }
    }

    nock('https://' + process.env.API_URL + '/v1')
      .post('/users')
      .reply(200, {
        data: {
          id: 1,
          name: bundle.inputData.name,
          email: bundle.inputData.email
        }
      })

    const results = await appTester(App.resources.user.create.operation.perform, bundle)

    expect(results).toBeDefined()
    expect(results).toHaveProperty('id', 'name', 'email')
    expect(results.name).toEqual(bundle.inputData.name)
    expect(results.email).toEqual(bundle.inputData.email)
  })
})
