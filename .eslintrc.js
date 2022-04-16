module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest/globals': true
  },
  'extends': ['eslint:recommended', 'prettier'],
  'plugins': ['prettier', 'jest'],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'no-var': 'warn',
    'prettier/prettier': 'warn'
  },
};
