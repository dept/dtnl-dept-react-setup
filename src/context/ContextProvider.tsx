import { AuthContextProvider } from './AuthContext'
import { ModalContextProvider } from './ModalContext'

export const ContextProvider: React.FC = ({ children }) => (
  <AuthContextProvider>
    <ModalContextProvider>{children}</ModalContextProvider>
  </AuthContextProvider>
)
