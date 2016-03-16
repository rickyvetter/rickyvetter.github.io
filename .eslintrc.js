const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],
    'indent': [ERROR, 2],
    'linebreak-style': [ERROR, 'unix'],
    'quotes': [ERROR,'single'],
    'semi': [ERROR, 'always'],
    'react/jsx-uses-react': ERROR,
    'react/jsx-uses-vars': ERROR,
    'react/react-in-jsx-scope': ERROR,
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
