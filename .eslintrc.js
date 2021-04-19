module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Allow braces around return-only arrow functions, for better readability
    'arrow-body-style': 0,
    // Allow arrow functions without return statements
    'consistent-return': 0,
    // Allow the convention where the non-connected component is exported, and the
    // component using connect is exported as default. This is made to allow mocking Redux.
    'import/no-named-as-default': 0,
    // Allow having a single named export, such as a constants file with a single export
    'import/prefer-default-export': 0,
    'no-debugger': 1,
    'no-nested-ternary': 0,
    'no-plusplus': 0,
    // Allow unused variables if they are prefixed with an underscore
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    // Allow the use of non-template strings when it would be cleaner to do so
    'prefer-template': 0,
    // Allow prop spreading for custom components I.E. <img {...props} />
    'react/jsx-props-no-spreading': 0,
  },
};
