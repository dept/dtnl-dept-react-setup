declare namespace NodeJS {
  interface Global {
    fetch: any
    console: any
  }
  interface Process {
    browser: boolean
  }
}

declare module 'console' {
  export = typeof import('console')
}

declare module '@reach/dialog' {
  interface DialogProps {
    isOpen: boolean
    onDismiss?: () => void
    children: React.ReactNode
  }

  export const Dialog: React.SFC<IDialogProps>
  export const DialogOverlay: React.SFC<IDialogOverlayProps>
  export const DialogContent: React.SFC<IDialogContentProps>
}

declare module 'styled-is'

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.svg' {
  const content: any
  export default content
}
