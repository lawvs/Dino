module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
    ],
    parserOptions: {
        'ecmaVersion': 2017,
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true,
        },
        'sourceType': 'module',
    },
    plugins: [
        'react',
        'import',
    ],
    parser: 'babel-eslint',
    rules: {
        'semi': ['error', 'never'],
        'indent': ['warn', 4],
        'quotes': ['error', 'single'],
        'linebreak-style': ['error', 'unix'],
        'no-console': ['warn', {'allow': ['warn', 'error']}],
        'no-var': 'error',
        'no-unused-vars': ['warn', {'args': 'none'}],
        'comma-dangle': ['error', 'always-multiline'],
        'no-irregular-whitespace': ['error', {'skipStrings': true, 'skipTemplates': true}],
    },
}