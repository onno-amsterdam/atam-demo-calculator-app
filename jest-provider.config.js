/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testTimeout: 10000,
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/test/api-e2e-test/"],
};
