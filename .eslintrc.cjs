/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier', 'prettier/prettier'],
  overrides: [
    {
      files: ['**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-trailing-spaces': 'error',
    eqeqeq: ['error', 'smart'],
    'no-console': 'warn',
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-negated-condition': 'error',
    'prefer-spread': 'error',
    'rest-spread-spacing': ['error', 'never']
  }
};
