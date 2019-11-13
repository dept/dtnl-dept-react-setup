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
const providers = [AuthContextProvider, ModalContextProvider].reverse()

export const ContextProvider: React.FC = ({ children }) => (
  <>
    {providers.reduce((children, provider) => {
      return provider({ children })
    }, children)}
  </>
)
