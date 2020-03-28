module.exports = {
  collectCoverageFrom: ['(src|server)/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/test/config/setupEnv.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  roots: ['<rootDir>/src/', '<rootDir>/server/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/test/config/cssTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@static/(.*)$': '<rootDir>/public/static/$1',
    '@test/(.*)$': '<rootDir>/test/$1',
    '@server/(.*)$': '<rootDir>/server/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}
