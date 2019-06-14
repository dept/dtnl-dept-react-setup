import qs from 'qs'
import { Dispatch, SetStateAction, useState } from 'react'
import useUpdateEffect from 'react-use/lib/useUpdateEffect'

function getParams() {
  const search = location.search.replace('?', '')
  const params = qs.parse(search)

  return params
}

export function useQueryParam(
  key: string,
  defaultValue?: string,
): [string | undefined, (Dispatch<SetStateAction<string | undefined>>)] {
  const params = getParams()
  const [state, setState] = useState<string | undefined>(params[key] || defaultValue)

  useUpdateEffect(() => {
    if (window.history.replaceState) {
      const currentParams = getParams()
      let url = location.origin + location.pathname

      if (state) {
        currentParams[key] = state
      } else {
        delete currentParams[key]
      }

      const queryString = qs.stringify(currentParams)
      if (queryString) {
        url = url + '?' + queryString
      }

      window.history.replaceState(window.history.state, document.title, url)
    }
  }, [state])

  return [state, setState]
}
