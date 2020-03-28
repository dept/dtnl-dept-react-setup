module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupEnv.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@static/(.*)$': '<rootDir>/public/static/$1',
    '@server/(.*)$': '<rootDir>/server/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}
