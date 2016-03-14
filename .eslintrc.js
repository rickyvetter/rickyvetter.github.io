module.exports = {
  parser: 'babel-eslint',
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'indent': [2, 2, {SwitchCase: 1}],
    'linebreak-style': [2, 'unix'],
    'quotes': [2,'single'],
    'semi': [2, 'always'],
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  ecmaFeatures: {
    destructuring: true,
    experimentalObjectRestSpread: true,
    jsx: true,
    modules: true,
  },
  globals: {
    __DEV__: false,
  },
};
