module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    // Disable or relax specific rules
    "no-restricted-globals": "off", // Allow usage of `name` and `length`
    "prefer-arrow-callback": "warn", // Warn instead of error for non-arrow callbacks
    "quotes": ["warn", "double", { allowTemplateLiterals: true }], // Allow both double and template literals

    // Additional relaxed rules
    "max-len": ["off", { code: 120 }], // Allow longer lines, up to 120 characters
    "indent": ["off", 2], // Warn for inconsistent indentation, but don't enforce strict errors
    "comma-dangle": ["off", "never"], // Don't enforce trailing commas
    "require-jsdoc": "off", // Turn off Google style JSDoc requirement
    "linebreak-style": "off", // Ignore linebreak differences between Unix/Windows
    "no-console": "off", // Allow console.log and other console methods
    "object-curly-spacing": "off",
    "eol-last": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
