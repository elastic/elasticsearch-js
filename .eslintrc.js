module.exports = {
  extends: ['standard', 'eslint-config-prettier'],
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'error',

    // disable standard style-based rules, that's prettiers job
    'standard/computed-property-even-spacing': 'off',
    'node/no-deprecated-api': 'off',
    'standard/no-callback-literal': 'off',
    'handle-callback-err': 'off',
  },
};
