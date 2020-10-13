import React from 'react';

import { AuthContextProvider } from './AuthContext';

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
const providers = [AuthContextProvider];

export const ContextProvider: React.FC = ({ children }) => (
  <>
    {providers.reduceRight((children, provider) => {
      return React.createElement(provider, null, children);
    }, children)}
  </>
);
