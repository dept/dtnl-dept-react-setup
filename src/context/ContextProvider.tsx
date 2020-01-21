import React from 'react'

import { AuthContextProvider } from './AuthContext'
import { ModalContextProvider } from './ModalContext'

/**
 * Add new context providers to the array
 * The order matters.
 * Will create
 *
 * ```jsx
 * <AuthContextProvider>
 *      <ModalContextProvider>{children}</ModalContextProvider>
 * </AuthContextProvider>
 * ```
 */
const providers = [AuthContextProvider, ModalContextProvider]

export const ContextProvider: React.FC = ({ children }) => (
  <>
    {providers.reduceRight((children, provider) => {
      return React.createElement(provider, null, children)
    }, children)}
  </>
)
