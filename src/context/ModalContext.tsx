import { default as produce } from 'immer'
import React from 'react'

interface ModalOptions {
  isShown?: boolean
  isClosable?: boolean
  title?: any
  content?: any
  callback?: () => void
  callbackLabel?: string
}

interface State {
  [key: string]: ModalOptions
}

type Action =
  | { type: 'show'; key: string; options?: ModalOptions }
  | { type: 'hide'; key: string; options?: ModalOptions }
type Dispatch = (action: Action) => void

const ModalContextState = React.createContext({} as State)
const ModalContextDispatch = React.createContext({} as Dispatch)

function modalReducer(state: State, action: Action) {
  function changeModals(key: string, show: boolean, options?: ModalOptions) {
    return produce(state, nextState => {
      Object.keys(nextState).forEach(modalKey => (nextState[modalKey].isShown = false))
      nextState[key] = { isShown: show, isClosable: true, ...options }
    })
  }

  switch (action.type) {
    case 'show': {
      return changeModals(action.key, true, action.options)
    }
    case 'hide': {
      return changeModals(action.key, false, action.options)
    }
    default: {
      throw new Error(`Unhandled action`)
    }
  }
}

export function useModalState() {
  const state = React.useContext(ModalContextState)

  if (state === undefined) {
    throw new Error('useModalState must be used within a ModalContextProvider')
  }

  const isShown = (key: string) => Boolean(state[key] && state[key].isShown)
  const getModal = (key: string) => state[key]

  return {
    state,
    isShown,
    getModal,
  }
}

export function useModalActions() {
  const dispatch = React.useContext(ModalContextDispatch)
  if (dispatch === undefined) {
    throw new Error('useModalActions must be used within a ModalContextProvider')
  }

  const hide = (key: string) => {
    dispatch({
      type: 'hide',
      key,
    })
  }

  const show = (key: string) => {
    dispatch({
      type: 'show',
      key,
    })
  }

  return {
    dispatch,
    hide,
    show,
  }
}

export const ModalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, {})

  return (
    <ModalContextState.Provider value={state}>
      <ModalContextDispatch.Provider value={dispatch}>{children}</ModalContextDispatch.Provider>
    </ModalContextState.Provider>
  )
}
