module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testEnvironment: 'jest-environment-jsdom',
    // Other Jest configurations
};