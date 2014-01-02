If you have a bugfix or new feature that you would like to contribute to elasticsearch.js please feel free to submit a pull request, or open an issue for discussion. If your change is adding new functionality, you should open an issue ***before*** writing any code.

The process for contributing to any of the Elasticsearch repositories is similar.

1. Lint your codes

  While developing, be sure to run JSHint on the files you modify. This is simple with most IDE's and the project has .jshintrc files in the proper places, make sure jshint is using them.

2. Write tests

  Please write test cases to exercise your changes.

2. When you're ready to run the tests

  Integration and unit tests can be run by simply calling `npm test` or `grunt test`, but the integration tests require a running instance of elasticsearch and ***WILL WIPE ALL DATA FROM ELASTICSEARCH***. If you only want to run the unit tests, run `grunt unit_test` instead. Travis and Jenkins run the integration tests so your changes can be verified before they are merged.

3. Submit a pull request

  Push your local changes a forked copy of the repository and submit a pull request. In the pull request, describe what your changes do and be sure to link to any conversations regarding this implementation, eg "Closes #123".

4. Sign the CLA

  Please make sure you have signed the [Contributor License Agreement](http://www.elasticsearch.org/contributor-agreement/). We are not asking you to assign copyright to us, but to give us the right to distribute your code without restriction. We ask this of all contributors in order to assure our users of the origin and continuing existence of the code. You only need to sign the CLA once.

5. Grab a beer

  There will probably be discussion about the pull request and we will work with you if any changes are needed.

6. Know that we greatly apreciate your help!! :D
