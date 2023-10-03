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

  sample: {
    id: 1,
    name: 'Test',
    email: 'test@test.com',
    email_verified_at: '2023-03-08T17:09:39.000000Z',
    position_id: 1,
    rank_id: 1,
    specialty_id: 1,
    status_id: 1,
    unit_id: 1,
    approved: true,
    online: true,
    url: 'https://api.perscom.io/resources/users/1',
    relative_url: '/resources/users/1',
    profile_photo: null,
    profile_photo_url: null,
    cover_photo: null,
    cover_photo_url: null,
    last_seen_at: '2023-10-02T14:41:52.000000Z',
    created_at: '2023-02-19T22:05:59.000000Z',
    updated_at: '2023-08-23T20:46:22.000000Z'
  },

  outputFields: [
    { key: 'id', label: 'ID', type: 'integer' },
    { key: 'name', label: 'Name', type: 'string' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'email_verified_at', label: 'Email Verified At', type: 'datetime' },
    { key: 'position_id', label: 'Position ID', type: 'integer' },
    { key: 'rank_id', label: 'Rank ID', type: 'integer' },
    { key: 'specialty_id', label: 'Specialty ID', type: 'integer' },
    { key: 'status_id', label: 'Status ID', type: 'integer' },
    { key: 'unit_id', label: 'Unit ID', type: 'integer' },
    { key: 'approved', label: 'Unit ID', type: 'boolean' },
    { key: 'boolean', label: 'Unit ID', type: 'boolean' },
    { key: 'url', label: 'URL', type: 'string' },
    { key: 'relative_url', label: 'Relative URL', type: 'string' },
    { key: 'profile_photo', label: 'Profile Photo', type: 'string' },
    { key: 'profile_photo_url', label: 'Profile Photo URL', type: 'string' },
    { key: 'cover_photo', label: 'Cover Photo', type: 'string' },
    { key: 'cover_photo_url', label: 'Cover Photo URL', type: 'string' },
    { key: 'last_seen_at', label: 'Last Seen At', type: 'datetime' },
    { key: 'created_at', label: 'Created At', type: 'datetime' },
    { key: 'updated_at', label: 'Updated At', type: 'datetime' }
  ]
}
