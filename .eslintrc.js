module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true

  },
  extends: [
    'standard',
    'plugin:jest/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "quotes": ["error", "single"],
    "space-before-function-paren": ["error", "never"]
  }
}
