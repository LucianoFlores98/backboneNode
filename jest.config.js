/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  clearMocks: true,
  coveragePathIgnorePatterns: ["node_modules", "mocks.ts"],
  testMatch: ["<rootDir>/__tests__/**/*.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["jest-fetch-mock"],
};
