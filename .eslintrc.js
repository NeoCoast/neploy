module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: 0,
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-restricted-syntax': 0,
  },
};
