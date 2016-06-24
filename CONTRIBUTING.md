If you have a bugfix or new feature that you would like to contribute to elasticsearch.js please feel free to submit a pull request, or open an issue for discussion. If your change is adding new functionality, you should open an issue ***before*** writing any code.

The process for contributing to any of the Elasticsearch repositories is similar.

### 1. Lint your codes

While developing, be sure to run eslint on the files you modify.

### 2. Write tests

Please write test cases to exercise your changes.

### 3. When you are ready, run the test suite

1. Install dev dependencies.

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
  grunt unit_test
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

Please make sure you have signed the [Contributor License Agreement](https://www.elastic.co/contributor-agreement/). We are not asking you to assign copyright to us, but to give us the right to distribute your code without restriction. We ask this of all contributors in order to assure our users of the origin and continuing existence of the code. You only need to sign the CLA once.

### 6. Grab a beer

There will probably be discussion about the pull request and we will work with you if any changes are needed.

### 7. Know that we greatly appreciate your help!! :D

## Generate

To automatically regenerate elasticsearch-js from elasticsearch master, run the following command:

```sh
npm run generate
```

## Release

Before you attempt to release a new version, make sure you have AWS credentials in the root of this project in the following format:

```json
{
  "key": "YOUR_AWS_ACCESS_KEY_ID",
  "secret": "YOUR_AWS_SECRET_ACCESS_KEY"
}
```

Also, make sure you have been added as a contributor on npm for both [elasticsearch](https://www.npmjs.com/package/elasticsearch) and [elasticsearch-browser](https://www.npmjs.com/package/elasticsearch-browser).

### 1. Bump the package version

```sh
grunt version:12.0.0-rc4
```

After bumping the version, commit and push the changed files.

### 2. Publish both libraries to npm and tag as needed

```sh
npm publish
npm tag elasticsearch@12.0.0-rc4 prerelease
npm tag elasticsearch@11.0.1 latest
cd src/bower_es_js
npm publish
npm tag elasticsearch-browser@12.0.0-rc4 prerelease
npm tag elasticsearch-browser@11.0.1 latest
```

### 3. Release the new builds

```sh
grunt browser_clients:release
```

Voila! You're all finished.
