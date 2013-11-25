If you have a bugfix or new feature that you would like to contribute to elasticsearch.js please feel free to submit a pull request, or open an issue for discussion. If your change is adding new functionality, you should open an issue ***before*** writing any code.

The process for contributing to any of the Elasticsearch repositories is similar.

1. Lint your codes

  While developing, be sure to run JSHint on the files you modify. This is simple with most IDE's and the project has .jshintrc files in the proper places, make sure jshint is using them.

  We use the `"white": true` jshint config option to enforce style, but the

2. Write tests

  Please write test cases to exercise your changes.

2. When you're ready to run the tests

  Call `npm test` which executes `scripts/run_tests.js`.

  ```sh
  $ node scripts/run_tests.js --help

  Runner for the Elasticsearch.js Unit and Integration tests in both node and the browser.
  Specify --no-{{flag}} to negate it.

  Options:
    --server         [true]
    --browser        [true]
    --unit           [true]
    --integration    [false]
    --port           [9200]
    --host           ["localhost"] hostname for elasticsearch instance used in integration tests
    --check-upstream [false]       check for remote updates to the yaml test suite
  ```

3. Submit a pull request

  Push your local changes to your forked copy of the repository and submit a pull request. In the pull request, describe what your changes do and be sure to link to any conversations regarding this implementation, eg "Closes #123".

4. Sign the CLA

  Please make sure you have signed the [Contributor License Agreement](http://www.elasticsearch.org/contributor-agreement/). We are not asking you to assign copyright to us, but to give us the right to distribute your code without restriction. We ask this of all contributors in order to assure our users of the origin and continuing existence of the code. You only need to sign the CLA once.

5. Grab a beer

  There will probably be discussion about the pull request and we will work with you if any changes are needed.

6. Know that we greatly apreciate your help!! :D
