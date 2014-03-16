If you have a bugfix or new feature that you would like to contribute to elasticsearch.js please feel free to submit a pull request, or open an issue for discussion. If your change is adding new functionality, you should open an issue ***before*** writing any code.

The process for contributing to any of the Elasticsearch repositories is similar.

### 1. Lint your codes

While developing, be sure to run JSHint on the files you modify. This is simple with most IDE's and the project has [.jshintrc files](http://www.jshint.com/docs/) in the proper places, make sure jshint is using them.

### 2. Write tests

Please write test cases to exercise your changes.

### 3. When you are ready, run the test suite

1. Install dev dependenies.

  ```sh
  npm install
  ```

2. Install Grunt.

  ```sh
  npm install -g grunt-cli
  ```

3. Run the tests. Testing the code will lint the project, run the unit tests, install local versions of elasticsearch, and run the integration tests using those installations.

  ```sh
  grunt test
  ```

  Or to skip the integration tests:

  ```sh
  grunt test_unit
  ```
4. Optionally, run the browser tests. While this step is automated and simple, it can take several minutes for the tests to complete. Unless you are making changes to browser specific portions of the code you can probably let Travis run the browser tests for you.

  Quick Option: Run them locally in your browser
  ```sh
  grunt browser_clients:build
  node ./test/utils/server
  # open http://127.0.0.1:8000/unit.html
  # open http://127.0.0.1:8000/builds.html
  ```

  Run them on Sauce Labs across several browsers, operating systems, and browser versions
  ```sh
  grunt browser_clients:test
  ```


### 4. Submit a pull request

Push your local changes a forked copy of the repository and submit a pull request. In the pull request, describe what your changes do and be sure to link to any conversations regarding this implementation, eg "Closes #123".

### 5. Sign the CLA

Please make sure you have signed the [Contributor License Agreement](http://www.elasticsearch.org/contributor-agreement/). We are not asking you to assign copyright to us, but to give us the right to distribute your code without restriction. We ask this of all contributors in order to assure our users of the origin and continuing existence of the code. You only need to sign the CLA once.

### 6. Grab a beer

There will probably be discussion about the pull request and we will work with you if any changes are needed.

### 7. Know that we greatly apreciate your help!! :D
