const sample = require('../../samples/user')
const output = require('../../outputs/user')

const performUpdate = async (z, bundle) => {
  const response = await z.request({
    method: 'PUT',
    url: 'https://' + process.env.API_URL + '/v1/users/' + bundle.inputData.id,
    body: bundle.inputData.updateBody
  })
  return response.data.data
}

module.exports = {
  key: 'update_user',
  noun: 'User',

  display: {
    label: 'Update User',
    description: 'Update a user.'
  },

  operation: {
    inputFields: [
      { key: 'id', type: 'integer', label: 'ID', required: true, helpText: 'The ID of the user.' },
      {
        key: 'updateBody',
        type: 'code',
        label: 'Payload',
        required: true,
        helpText: 'The updates to perform on the user. Must be a JSON key/value object.'
      }
    ],
    perform: performUpdate,

    sample: sample,
    outputFields: output
  }
}
