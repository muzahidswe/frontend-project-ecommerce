module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testEnvironment: "jsdom",
    // Other Jest configurations
};