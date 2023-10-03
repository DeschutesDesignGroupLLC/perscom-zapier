const sample = require('../samples/user')
const output = require('../outputs/user')

const performGet = async (z, bundle) => {
  const response = await z.request({
    url: 'https://' + process.env.API_URL + '/v1/users/' + bundle.inputData.id
  })
  return response.data.data
}

const performList = async (z, bundle) => {
  const response = await z.request({
    url: 'https://' + process.env.API_URL + '/v1/users'
  })
  return response.data.data
}

const performSearch = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://' + process.env.API_URL + '/v1/users/search',
    body: {
      search: {
        value: bundle.inputData.searchValue
      }
    }
  })
  return response.data.data
}

const performCreate = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://' + process.env.API_URL + '/v1/users',
    body: {
      name: bundle.inputData.name,
      email: bundle.inputData.email
    }
  })
  return response.data.data
}

module.exports = {
  key: 'user',
  noun: 'User',

  get: {
    display: {
      label: 'Get User',
      description: 'Gets a user.'
    },

    operation: {
      inputFields: [{ key: 'id', required: true }],
      perform: performGet
    }
  },

  list: {
    display: {
      label: 'List Users',
      description: 'Lists the users.'
    },

    operation: {
      perform: performList,
      inputFields: []
    }
  },

  search: {
    display: {
      label: 'Find User',
      description: 'Finds a user.'
    },

    operation: {
      inputFields: [
        {
          key: 'searchValue',
          label: 'Search Value',
          type: 'string',
          required: true,
          helpText: "The value to search for. Can be the user's name or email."
        }
      ],
      perform: performSearch
    }
  },

  create: {
    display: {
      label: 'Create User',
      description: 'Creates a new user.'
    },

    operation: {
      inputFields: [
        { key: 'name', type: 'string', required: true, helpText: 'The name of the user.' },
        { key: 'email', type: 'string', required: true, helpText: 'The email of the user.' }
      ],
      perform: performCreate
    }
  },

  sample: sample,
  outputFields: output
}
