import format from 'date-fns/format'
import produce from 'immer'
import Router, { useRouter } from 'next/router'
import qs from 'qs'
import { useCallback } from 'react'
import yn from 'yn'

type Key = string
type Value = string | undefined
type PossibleValue = boolean | string | Date | number | undefined
type ReturnType<T> = [T, (value: T) => void]
type Options<PT, R> = {
  type?: PT
  defaultValue?: R
}

export enum ParamType {
  String,
  Boolean,
  Number,
  Date,
}

function castValue(value: boolean | string | Date | number): string {
  switch (typeof value) {
    case 'string':
      return value
    case 'number':
      return String(value)
    case 'boolean':
      return value ? '1' : '0'
    default:
      if (value instanceof Date) {
        return format(value, 'yyyy-MM-dd')
      }

      return String(value)
  }
}

export function setQueryParam(key: Key, value: PossibleValue) {
  const { pathname, query, asPath } = Router

  let newValue: Value

  if (value !== undefined) {
    newValue = castValue(value)
  }

  const newQuery = produce(query, draft => {
    draft[key] = newValue
    if (draft[key] === undefined) {
      delete draft[key]
    }
  })

  const params = qs.stringify(newQuery, {
    filter: (key, value) => {
      // filter out dynamic url params
      if (pathname.includes(`[${key}]`)) return
      return value
    },
  })
  const url = asPath.split('?')[0]
  const newAsPath = params ? `${url}?${params}` : url

  Router.push(
    {
      pathname,
      query: newQuery,
    },
    newAsPath,
    {
      shallow: true,
    },
  )
}

export const useSetQueryParam = (key: string) => {
  const callback = useCallback(
    (value: PossibleValue) => {
      return setQueryParam(key, value)
    },
    [key],
  )

  return callback
}

function useQueryParam(
  key: Key,
  options?: Options<ParamType.String, string | undefined>,
): ReturnType<string | undefined>
function useQueryParam(key: Key, options?: Options<ParamType.Boolean, boolean>): ReturnType<boolean>
function useQueryParam(
  key: Key,
  options?: Options<ParamType.Date, Date | undefined>,
): ReturnType<Date | undefined>
function useQueryParam(
  key: Key,
  options?: Options<ParamType.Number, number | undefined>,
): ReturnType<number | undefined>
function useQueryParam(
  key: Key,
  options:
    | Options<ParamType.Boolean, boolean>
    | Options<ParamType.Date, Date | undefined>
    | Options<ParamType.Number, number | undefined>
    | Options<ParamType.String, string | undefined> = {
    type: ParamType.String,
  },
):
  | ReturnType<boolean>
  | ReturnType<Date | undefined>
  | ReturnType<number | undefined>
  | ReturnType<string | undefined> {
  const value = useQueryParamValue(key, options as any)
  const setter = useCallback(
    (value: PossibleValue) => {
      return setQueryParam(key, value)
    },
    [key],
  )

  return [value, setter]
}

function useQueryParamValue(
  key: Key,
  options?: Options<ParamType.String, string | undefined>,
): string | undefined
function useQueryParamValue(key: Key, options?: Options<ParamType.Boolean, boolean>): boolean
function useQueryParamValue(
  key: Key,
  options?: Options<ParamType.Date, Date | undefined>,
): Date | undefined
function useQueryParamValue(
  key: Key,
  options?: Options<ParamType.Number, number | undefined>,
): number | undefined
function useQueryParamValue(
  key: Key,
  options:
    | Options<ParamType.Boolean, boolean>
    | Options<ParamType.Date, Date | undefined>
    | Options<ParamType.Number, number | undefined>
    | Options<ParamType.String, string | undefined>
    | undefined = {
    type: ParamType.String,
  },
): boolean | string | number | Date | undefined {
  const router = useRouter()
  const value = (router.query[key] as unknown) as any

  const { type, defaultValue } = options

  switch (type) {
    case ParamType.Boolean:
      return Boolean(yn(value))
    case ParamType.Number:
      return value ? Number(value) : defaultValue
    case ParamType.Date:
      return value ? new Date(value) : defaultValue
    default:
      return value ? String(value) : defaultValue
  }
}

export { useQueryParam, useQueryParamValue }
