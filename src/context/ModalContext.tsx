import React, { useContext, useMemo, useState } from 'react'

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

export const ModalContext = React.createContext({} as ModalContextStore)
export const ModalContextConsumer = ModalContext.Consumer
export const useModal = () => useContext(ModalContext)

export const ModalContextProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<ModalsState>({})

  function changeModals(key: string, show: boolean, options?: ModalOptions) {
    // copy current state
    const copy = {
      ...modals,
    }

    // set all modals to false
    Object.keys(copy).forEach(modalKey => (copy[modalKey].isShown = false))
    copy[key] = { isShown: show, isClosable: true, ...options }

    setModals(copy)
  }

  const hide: ModalContextStore['hide'] = key => {
    changeModals(key, false)
  }

  const show: ModalContextStore['show'] = (key, options = {}) => {
    changeModals(key, true, options)
  }

  const isShown: ModalContextStore['isShown'] = key => Boolean(modals[key] && modals[key].isShown)

  const getModal: ModalContextStore['getModal'] = key => modals[key]

  const store: ModalContextStore = useMemo(() => {
    return {
      hide,
      show,
      getModal,
      isShown,
    }
  }, [modals])

  return <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
}
