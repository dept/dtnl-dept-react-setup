import fetch from 'isomorphic-fetch'

import { HttpClient } from '../Http'

jest.mock('isomorphic-fetch')

jest.spyOn(console, 'error')

const fetchMock = (fetch as unknown) as jest.Mock<typeof fetch>

const defaultConfig = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
  returnType: 'json',
}

const mockRes = {
  ok: true,
  json: () => {
    return {
      data: true,
    }
  },
  text: () => 'response',
} as never

const mockFail = {
  ok: false,
  json: () => {
    return {
      data: true,
    }
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

  expect(fetchMock).toHaveBeenCalledTimes(1)
  expect(fetchMock).toHaveBeenCalledWith('http://google.com/?name=Tim&job=Developer', defaultConfig)
})

test('it can make relative requests', async () => {
  fetchMock.mockResolvedValue(mockRes)

  const data = await new HttpClient().get('/')

  expect(data).toEqual({
    data: true,
  })
})

test('the baseurl is configurable', () => {
  fetchMock.mockResolvedValue(mockRes)

  const httpClient = new HttpClient({
    baseUrl: 'http://google.com',
  })

  httpClient.post('/animals', { name: 'Fluffy' })

  expect(fetchMock).toHaveBeenCalledWith('http://google.com/animals', {
    ...defaultConfig,
    baseUrl: 'http://google.com',
    method: 'POST',
    body: JSON.stringify({ name: 'Fluffy' }),
  })
})

test('it should call the onError hook', async () => {
  fetchMock.mockResolvedValue(mockFail)

  const onError = jest.fn(() => {
    /**noop */
  })

  const httpClient = new HttpClient({
    onError,
  })

  expect(onError).not.toHaveBeenCalled()

  await httpClient.get('/')

  expect(onError).toHaveBeenCalledTimes(1)
})

test('it should call the beforeHook', async () => {
  fetchMock.mockResolvedValue(mockRes)

  const beforeHook = jest.fn(client => {
    client.setToken('token')
  })

  const httpClient = new HttpClient({
    beforeHook,
  })

  expect(beforeHook).not.toHaveBeenCalled()

  await httpClient.get('/')

  expect(beforeHook).toHaveBeenCalledTimes(1)

  await httpClient.get('/')

  expect(beforeHook).toHaveBeenCalledTimes(2)
})
