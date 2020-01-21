import { default as produce } from 'immer'
import React, { useContext, useState } from 'react'

interface ModalOptions {
  isShown?: boolean
  isClosable?: boolean
  title?: any
  content?: any
  callback?: () => void
  callbackLabel?: string
}

interface ModalsState {
  [key: string]: ModalOptions
}

export interface ModalContextStore {
  hide: (key: string) => void
  show: (key: string, options?: ModalOptions) => void
  isShown: (key: string) => boolean
  getModal: (key: string) => ModalOptions
}

const ModalContext = React.createContext({} as ModalContextStore)

export const useModal = () => useContext(ModalContext)

export const ModalContextConsumer = ModalContext.Consumer

export const ModalContextProvider: React.FC = ({ children }) => {
  const [modals, setState] = useState<ModalsState>({})

  function changeModals(key: string, show: boolean, options?: ModalOptions) {
    setState(
      produce(modals, nextState => {
        Object.keys(nextState).forEach(modalKey => (nextState[modalKey].isShown = false))
        nextState[key] = { isShown: show, isClosable: true, ...options }
      }),
    )
  }

  const hide: ModalContextStore['hide'] = key => changeModals(key, false)
  const show: ModalContextStore['show'] = (key, options = {}) => changeModals(key, true, options)
  const isShown: ModalContextStore['isShown'] = key => Boolean(modals[key] && modals[key].isShown)
  const getModal: ModalContextStore['getModal'] = key => modals[key]

  const store: ModalContextStore = {
    hide,
    show,
    getModal,
    isShown,
  }

  return <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
}
