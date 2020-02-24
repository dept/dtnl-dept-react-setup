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

const ModalContextState = React.createContext({} as ReturnType<typeof createState>)
const ModalContextDispatch = React.createContext({} as ReturnType<typeof createActions>)

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

  return state
}

export function useModalActions() {
  const actions = React.useContext(ModalContextDispatch)

  if (actions === undefined) {
    throw new Error('useModalActions must be used within a ModalContextProvider')
  }

  return actions
}

function createActions(dispatch: Dispatch) {
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
    hide,
    show,
  }
}

function createState(state: State) {
  const isShown = (key: string) => Boolean(state[key] && state[key].isShown)
  const getModal = (key: string) => state[key]

  return {
    state,
    isShown,
    getModal,
  }
}

export const ModalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, {})

  const actions = React.useMemo(() => createActions(dispatch), [dispatch])
  const store = createState(state)

  return (
    <ModalContextState.Provider value={store}>
      <ModalContextDispatch.Provider value={actions}>{children}</ModalContextDispatch.Provider>
    </ModalContextState.Provider>
  )
}
