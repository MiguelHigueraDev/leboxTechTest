import { useAuthStore } from '@/stores/auth'

type method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestBody {
  [key: string]: string
}

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

function request(method: method) {
  return async (url: string, body: RequestBody) => {
    const requestOptions: any = {
      method,
      headers: authHeader(url)
    }

    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }

    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  }
}

function authHeader(url: string) {
  const { user } = useAuthStore()

  const isLoggedIn = !!user?.token
  const isApiUrl = url.startsWith('/api')
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

function handleResponse(response: any) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      const { user, logout } = useAuthStore()
      if ([401, 403].includes(response.status) && user) {
        // Auto logout if token is invalid or expired
        logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
