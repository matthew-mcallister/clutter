const API_URL = 'http://localhost:5000'

async function request({ method, url, data }) {
  let opts = {
    method: method,
    cache: 'no-cache',
  }
  if (data) {
    opts = {
      ...opts,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'test',
      },
    }
  }
  const response = await fetch(url, opts)
  if (response.status >= 400) {
    throw response
  }
  if (response.headers.get('Content-Type') === 'application/json') {
    return JSON.parse(response.body)
  } else {
    return null
  }
}

function post(url, data) {
  return request({ method: 'POST', url, data })
}

export async function uploadImage(source_url) {
  await post(API_URL + '/images', { source_url })
}
