/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// we import the base configuration from Neostandard (a modern ESLint preset)
// and also its internal plugins
import neostandard, { plugins } from 'neostandard'
import { defineConfig } from 'eslint/config'

// we export the Eslintd configuration
export default defineConfig([
  ...neostandard({
    // enablee support for TypeScript
    ts: true,
    // external dependencies (never lint them)
    ignores: [
      'node_modules/**',
      // generated code (CommonJS build) It regenerates automatically, linting makes no sense
      'lib/**',
      // generated code (ESM build) Same as lib, it is overwritten in each build
      'esm/**',
      // coverage reports (not source code)
      'coverage/**'
    ]
  }),

  // style rules applied to the important project files
  // applies to:
  //  src: source code
  //  test:tests
  //  scripts: internal tools
  {
    files: ['src/**/*.js', 'src/**/*.ts', 'test/**/*.js', 'test/**/*.ts', 'scripts/**/*.js'],
    plugins: {
      // plugin that controls formatting (indentation, spaces, and other syntax rules)
      '@stylistic': plugins['@stylistic']
    },
    rules: {
      // requires a space after comments
      '@stylistic/spaced-comment': ['error', 'always', {
        // allows exceptions like //#region
        exceptions: ['#', '/'],
        markers: ['/']
      }],
      // prohibits the use of semicolon ;
      '@stylistic/semi': ['error', 'never'],
      // force 2-space indentation
      '@stylistic/indent': ['error', 2],
      // forces a new line or line break at the end of the file
      '@stylistic/eol-last': ['error', 'always'],
      // requires space before parentheses in functions () {}
      '@stylistic/space-before-function-paren': ['error', 'always'],
      // disables the requirement for lines between class methods
      '@stylistic/lines-between-class-members': 'off'
    }
  },

  // relaxed rules for code generated inside src
  {
    files: ['src/**/*.ts'],
    // this si code generated as an API client
    rules: {
    // snake_case
      camelcase: 'off',
      // generator uses void expressions
      'no-void': 'off',
      // the generated regexes may seem incorrect but they are not
      'no-useless-escape': 'off',
      // the generated code can use let even though it could be const, to be more permissive
      'prefer-const': 'off',
      // side effects in some expressions
      'no-unused-expressions': 'off',
      // allows use of comma operator in generated code
      'no-sequences': 'off',
      // variables can exist even if they are not being used
      'no-unused-vars': 'off',
      // variables in TS that are not being used
      '@typescript-eslint/no-unused-vars': 'off',
      // allows automatically generated lowercase constructors
      'new-cap': 'off'
    }
  },

  // ci .buildkite, scripts exceptions
  {
    files: ['.buildkite/**/*.mjs'],
    rules: {
      // scripts can have unused variables (args)
      'no-unused-vars': 'off',
      // reegex in scripts may require special escapes
      'no-useless-escape': 'off'
    }
  },

  // rules for the tests
  {
    files: ['test/**/*.js', 'test/**/*.ts', 'test/**/*.mjs'],
    rules: {
      // tests may use snake_case data
      camelcase: 'off',
      // tests often declare unused helpers
      'no-unused-vars': 'off',
      // tests often declare unused helpers or variable of ts
      '@typescript-eslint/no-unused-vars': 'off',
      // regex in tests may seem unnecessary
      'no-useless-escape': 'off'
    }
  }
])
