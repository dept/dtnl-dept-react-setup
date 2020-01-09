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

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.svg' {
  const content: any
  export default content
}
