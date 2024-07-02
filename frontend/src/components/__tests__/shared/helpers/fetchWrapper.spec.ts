import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchWrapper } from '@/helpers/fetchWrapper'
import { useAuthStore } from '@/stores/auth'

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn()
}))

// Helper function to mock fetch responses
const mockFetch = (status: number, data: any) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      text: () => Promise.resolve(JSON.stringify(data))
    } as Response)
  )
}

describe('fetchWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('performs GET request returning data', async () => {
    const responseData = { data: 'test data' }
    mockFetch(200, responseData)

    ;(useAuthStore as any).mockReturnValue({
      user: { token: 'fake-token' }
    })

    const result = await fetchWrapper.get('http://localhost:8000/api/test')
    expect(result).toEqual(responseData)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/test', {
      method: 'GET',
      headers: { Authorization: 'Bearer fake-token' }
    })
  })

  it('performs POST request with body and returns data', async () => {
    const requestData = { key: 'value' }
    const responseData = { data: 'test data' }
    mockFetch(200, responseData)

    ;(useAuthStore as any).mockReturnValue({
      user: { token: 'fake-token' }
    })

    const result = await fetchWrapper.post('http://localhost:8000/api/test', requestData)
    expect(result).toEqual(responseData)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer fake-token' },
      body: JSON.stringify(requestData)
    })
  })

  it('handles unauthorized error and logouts user', async () => {
    const responseData = { message: 'Unauthorized' }
    mockFetch(401, responseData)

    const logoutMock = vi.fn()
    ;(useAuthStore as any).mockReturnValue({
      user: { token: 'fake-token' },
      logout: logoutMock
    })

    await expect(fetchWrapper.get('http://localhost:8000/api/test')).rejects.toEqual('Unauthorized')
    expect(logoutMock).toHaveBeenCalled()
  })

  it('handles forbidden error and logouts user', async () => {
    const responseData = { message: 'Forbidden' }
    mockFetch(403, responseData)

    const logoutMock = vi.fn()
    ;(useAuthStore as any).mockReturnValue({
      user: { token: 'fake-token' },
      logout: logoutMock
    })

    await expect(fetchWrapper.get('http://localhost:8000/api/test')).rejects.toEqual('Forbidden')
    expect(logoutMock).toHaveBeenCalled()
  })
})
