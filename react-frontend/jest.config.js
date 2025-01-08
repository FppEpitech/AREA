module.exports = {
    // Specify the root directory of your source files
    roots: ['<rootDir>/src'],

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Map module paths for resolution
    moduleNameMapper: {
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
    },

    // Transform files using Babel or ts-jest
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"],

    // Configure the test environment
    testEnvironment: 'jsdom',

    // Path to ignore during tests
    testPathIgnorePatterns: ['/node_modules/'],

    // Additional setup files, if needed
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
