module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testPathIgnorePatterns: ['build'],
  modulePathIgnorePatterns: ['<rootDir>/build'],
  testRegex: '/integrations/',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    APP_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.ts', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
