# Contributing to the Elasticsearch Node.js client

The Elasticsearch Node.js client is open source and we love to receive contributions from our community — you!

There are many ways to contribute,
from writing tutorials or blog posts,
improving the documentation,
submitting bug reports and feature requests or writing code.

## Repository structure
The `main` branch is considered unstable, and it's compatible with Elasticsearch main. Unless you are patching an issue, new features should always be sent to the `main` branch, in case of a bugfix, it depends if the bug affects all the release lines.<br/>
There is a branch for every supported release line, such as `7.x` or `6.x`. We release bugfixes as soon as possible, while minor and major releases are published at the same time of the Elastic Stack.

Usually for every release line there will be a *published* version and a *next* version. Eg: the `7.x` branch contains the version published on npm, and bugfixes should be sent there, while `7.2` *(assuming that 7.1.x is released)* contains the next version, and new features should be sent there.

## Code contributions

If you have a bugfix or new feature that you would like to contribute,
please find or open an issue about it first.
Talk about what you would like to do.
It may be that somebody is already working on it,
or that there are particular issues that you should know about before implementing the change.

Note that we strictly follow the [Elastic EOL schedule](https://www.elastic.co/support/eol).

### Submitting your changes

Generally, we require that you test any code you are adding or modifying.
Once your changes are ready to submit for review:

1. Test your changes

    Run the test suite to make sure that nothing is broken.
    Usually running `npm test` is enough; our CI will take care of running the integration tests. If you want to run the integration tests yourself, see [the *Testing* section](#testing) below.

2. Submit a pull request

    Push your local changes to your forked copy of the repository and [submit a pull request](https://help.github.com/articles/using-pull-requests).
    In the pull request,
    choose a title which sums up the changes that you have made,
    and in the body provide more details about what your changes do.
    Also mention the number of the issue where discussion has taken place,
    eg "Closes #123".

3. Sign the Contributor License Agreement

    Please make sure you have signed our [Contributor License Agreement](https://www.elastic.co/contributor-agreement/).
    We are not asking you to assign copyright to us,
    but to give us the right to distribute your code without restriction.
    We ask this of all contributors in order to assure our users of the origin and continuing existence of the code.
    You only need to sign the CLA once.

4. Be patient

    We might not be able to review your code as fast as we would like to,
    but we'll do our best to dedicate it the attention it deserves.
    Your effort is much appreciated!

### Code generation

The entire content of the `src/api/` directory is automatically generated from [the Elasticsearch specification](https://github.com/elastic/elasticsearch-specification), as is the `docs/reference.asciidoc` file.
This code generation is done using a separate repository that is not currently available to the public.

If you find discrepancies between this client's API code and what you see when actually interacting with an Elasticsearch API, you can open a pull request here to fix it.
For API fixes, it's likely a change will need to be made to the specification as well, to ensure your fix is not undone by the code generation process.
We will do our best to make sure this is addressed when reviewing and merging your changes.

PRs to improve the specification are also welcome!
It is implemented in TypeScript, so JavaScript devs should be able to understand it fairly easily.
Spec fixes are particularly helpful, as they will be reflected in ALL official Elasticsearch clients, not just this one.

### Testing

There are a few different test scripts.
Usually during development you only need to run `npm test`, but if you want you can run just a part of the suite:

| Script | Description |
|---|---|
| `npm run test:unit` | Runs the content of the `test/unit` folder. |
| `npm run test:coverage-100` | Runs unit tests enforcing 100% coverage. |
| `npm run test:coverage-report` | Runs unit tests and generates an `lcov` coverage report. |
| `npm run test:coverage-ui` | Runs unit tests and generates an HTML coverage report. |
| `npm run test:integration` | Runs the integration test runner.<br/>**Note: requires a living instance of Elasticsearch.** |
| `npm run lint` | Run the [linter](https://github.com/standard/ts-standard). |
| `npm run lint:fix` | Fixes linter errors. |
| `npm run license-checker` | Checks that all dependencies have acceptable open source licenses. |

| `npm test` | Runs `lint` and `test:unit`. |

#### Integration test

The integration tests are generated on the fly by the runner you will find inside `test/integration`.
Once you execute it, it will clone the Elasticsearch repository and checkout the correct version to grab the [YAML REST test files](https://github.com/elastic/elasticsearch/tree/main/rest-api-spec/src/yamlRestTest/resources/rest-api-spec/test) in the Elasticsearch repo.
These are used to generate the integration tests.

Usually this step is executed by CI since it takes some time, but you can easily run this yourself!
Just follow this steps:
1. Boot a fresh Elasticsearch instance, which can be done in a Docker container by running `STACK_VERSION=8.10.0 DETACH=true .buildkite/run-elasticsearch.sh`, where `STACK_VERSION` and `DETACH` environment variables can be adjusted to your needs. A `TEST_SUITE` env var can also be set to `free` or `platinum`, and defaults to `free`.
1. Run `npm run test:integration` to run the whole suite, or `npm run test:integration -- --bail` to stop after the first failure.
1. Grab a coffee, it will take some time. ;)

This suite is very large, and not all tests will pass.
This is fine.
This suite is mostly used to identify notable changes in success/fail rate over time as we make changes to the client.

### Releasing

If you have access to make releases, the process is as follows:

1. Update the version in `package.json` according to the scale of the change. (major, minor or patch)
1. Commit changes with message `Bumped vx.y.z` where `x.y.z` is the version in `package.json`
1. Create a release via the GitHub UI.
1. Wait for CI to finish running the test.
1. Publish to npm with `npm publish` *(see [publish](https://docs.npmjs.com/cli/publish) and [dist-tag](https://docs.npmjs.com/cli/dist-tag) docs)*
