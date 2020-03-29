import fetch from 'isomorphic-fetch'

import { HttpClient } from '../Http'

jest.mock('isomorphic-fetch')

const fetchMock = (fetch as unknown) as jest.Mock<typeof fetch>

const defaultConfig = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
  returnType: 'json',
}

const mockRes = {
  ok: true,
  json: () => {
    data: true
  },
  text: () => 'response',
} as never

afterAll(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  jest.resetAllMocks()
})

test('it makes requests', () => {
  fetchMock.mockResolvedValue(mockRes)

  const httpClient = new HttpClient()

  httpClient.get('http://google.com', {
    name: 'Tim',
    job: 'Developer',
  })

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('http://google.com/?name=Tim&job=Developer', defaultConfig)
})

test('the baseurl is configurable', () => {
  fetchMock.mockResolvedValue(mockRes)

  const httpClient = new HttpClient({
    baseUrl: 'http://google.com',
  })

  httpClient.post('/animals', { name: 'Fluffy' })

  expect(fetch).toHaveBeenCalledWith('http://google.com/animals', {
    ...defaultConfig,
    baseUrl: 'http://google.com',
    method: 'POST',
    body: JSON.stringify({ name: 'Fluffy' }),
  })
})
