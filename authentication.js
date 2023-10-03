'use strict'

const getAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.inputData.dashboardUrl}}/oauth/token',
    method: 'POST',
    body: {
      client_id: '{{bundle.inputData.clientId}}',
      client_secret: '{{bundle.inputData.clientSecret}}',
      grant_type: 'authorization_code',
      code: bundle.inputData.code,
      redirect_uri: '{{bundle.inputData.redirect_uri}}'
    },
    headers: { 'content-type': 'application/json' }
  })

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token
  }
}

const refreshAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.inputData.dashboardUrl}}/oauth/token',
    method: 'POST',
    body: {
      client_id: '{{bundle.inputData.clientId}}',
      client_secret: '{{bundle.inputData.clientSecret}}',
      grant_type: 'refresh_token',
      refresh_token: bundle.authData.refresh_token
    },
    headers: { 'content-type': 'application/json' }
  })

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token
  }
}

const includeHeaders = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers['Accept'] = 'application/json'
    request.headers['Content-Type'] = 'application/json'
  }

  return request
}

const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`
  }

  return request
}

const includePerscomId = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers['X-Perscom-Id'] = bundle.authData.perscomId
  }

  return request
}

const includeZapierHeaders = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers['X-Perscom-Zapier'] = true
  }

  return request
}

const test = (z, bundle) => z.request({ url: 'https://' + process.env.API_URL + '/v1/me' })

module.exports = {
  config: {
    type: 'oauth2',
    oauth2Config: {
      authorizeUrl: {
        url: 'https://{{bundle.inputData.dashboardUrl}}/oauth/authorize',
        params: {
          client_id: '{{bundle.inputData.clientId}}',
          state: '{{bundle.inputData.state}}',
          redirect_uri: '{{bundle.inputData.redirect_uri}}',
          response_type: 'code'
        }
      },
      getAccessToken,
      refreshAccessToken,
      autoRefresh: true,
      scope: 'view:user create:user update:user delete:user'
    },
    fields: [
      {
        key: 'dashboardUrl',
        type: 'string',
        required: true,
        default: 'demo.perscom.io',
        helpText: 'Please enter your dashboard URL. Do not include the https or any trailing paths.'
      },
      { key: 'perscomId', type: 'integer', required: true, default: '1', label: 'PERSCOM ID', helpText: 'Please enter your PERSCOM ID.' },
      { key: 'clientId', type: 'string', required: true, helpText: 'Please enter the Client ID from the Zapier application you created.' },
      {
        key: 'clientSecret',
        type: 'password',
        required: true,
        helpText: 'Please enter the Client Secret from the Zapier application you created.'
      }
    ],
    test,
    connectionLabel: 'PERSCOM Personnel Management System'
  },
  befores: [includeHeaders, includeBearerToken, includePerscomId, includeZapierHeaders],
  afters: []
}
