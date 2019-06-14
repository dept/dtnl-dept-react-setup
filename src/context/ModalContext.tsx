import React, { useContext, useMemo, useState } from 'react'

interface ModalStatus {
  isShown?: boolean
}

interface ModalsState {
  [key: string]: ModalStatus
}

export interface ModalContextStore {
  hide: (key: string) => void
  show: (key: string, bool?: boolean) => void
  setContent: (content: any) => void
  isShown: (key: string) => boolean
  content: any
}

export const ModalContext = React.createContext({} as ModalContextStore)
export const ModalContextConsumer = ModalContext.Consumer
export const useModal = () => useContext(ModalContext)

export const ModalContextProvider: React.FC = props => {
  const [modals, setModals] = useState<ModalsState>({})
  const [content, setContent] = useState<any>()

  function hide(key: string) {
    show(key, false)
  }

  function show(key: string, bool: boolean = true) {
    // copy current state
    const copy = {
      ...modals,
    }

    // set all modals to false
    Object.keys(copy).forEach(modalKey => (copy[modalKey].isShown = false))
    copy[key] = { isShown: bool }

    setModals(copy)
  }

  function isShown(key: string) {
    return Boolean(modals[key] && modals[key].isShown)
  }

  const store: ModalContextStore = useMemo(() => {
    return {
      hide,
      show,
      setContent,
      isShown,
      content,
    }
  }, [modals])

  return <ModalContext.Provider {...props} value={store} />
}
