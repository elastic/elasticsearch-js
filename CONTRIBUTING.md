If you have a bugfix or new feature that you would like to contribute to elasticsearch.js please feel free to submit a pull request, or open an issue for discussion. If your change is adding new functionality, you should open an issue ***before*** writing any code.

The process for contributing to any of the Elasticsearch repositories is similar.

### 1. Lint your codes

While developing, be sure to run eslint on the files you modify.

### 2. Write tests

Please write test cases to exercise your changes.

### 3. When you are ready, run the test suite

1. Install dependencies.

  ```sh
  yarn
  ```

2. Run the unit tests.

  ```sh
  yarn grunt test
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

### 2. Publish to npm and tag as needed

```sh
npm publish [--tag prerelease]
```

### 3. Release the new builds

```sh
grunt browser_clients:release
```

If this is a prerelease, you will need to modify the `elasticsearch-browser` npm tags

```sh
npm dist-tag add elasticsearch-browser@11.0.1 latest
npm dist-tag add elasticsearch-browser@12.0.0-rc4 prerelease
```

Voila! You're all finished.
