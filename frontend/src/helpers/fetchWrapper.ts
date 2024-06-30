import { useAuthStore } from '@/stores/auth'

type method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestBody {
  [key: string]: string
}

/**
 * A wrapper for making HTTP requests with predefined methods.
 */
export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

/**
 * Creates a request function for a specific HTTP method.
 *
 * @param {method} method - The HTTP method for the request.
 * @returns {Function} A function that performs the request.
 */
function request(method: method) {
  /**
   * Performs an HTTP request.
   *
   * @param {string} url - The URL to send the request to.
   * @param {RequestBody} [body] - The request payload.
   * @returns {Promise<any>} A promise that resolves to the response data.
   */
  return async (url: string, body?: RequestBody) => {
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

/**
 * Generates authentication headers for a request.
 *
 * @param {string} url - The URL to send the request to.
 * @returns {Object} An object containing the authorization header if applicable.
 */
function authHeader(url: string) {
  const { user } = useAuthStore()

  const isLoggedIn = !!user?.token
  const isApiUrl = url.startsWith('http://localhost:8000/api')
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

/**
 * Handles the response from an HTTP request.
 *
 * @param {Response} response - The response object from the fetch API.
 * @returns {Promise<any>} A promise that resolves to the parsed response data.
 * This automatically logs out the user if the token is invalid or expired.
 */
function handleResponse(response: Response) {
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