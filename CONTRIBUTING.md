# Contributing to the Elasticsearch Node.js client

The Elasticsearch Node.js client is open source and we love to receive contributions from our community — you!

There are many ways to contribute,
from writing tutorials or blog posts,
improving the documentation,
submitting bug reports and feature requests or writing code.

## Repository structure
The `master` branch is considered unstable, and it's compatible with Elasticsearch master. Unless you are patching an issue, new features should always be sent to the `master` branch, in case of a bugfix, it depends if the bug affects all the release lines.<br/>
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
    Usually run `npm test` is enough, our CI will take care of running the integration test. If you want to run the integration test yourself, see the *Testing* section below.

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

The entire content of the API folder is generated as well as the `docs/reference.asciidoc` file.<br/>
If you want to run the code generation you should run the following command:
```sh
node scripts/generate --tag <tag name>
# or
node scripts/generate --branch <branch name>
```
Then you should copy the content of `api/generated.d.ts` into the `index.d.ts` file *(automate this step would be a nice pr!)*.

### Testing
There are different test scripts, usually during development you only need to run `npm test`, but if you want you can run just a part of the suite, following you will find all the testing scripts and what they do.

| Script | Description |
|---|---|
| `npm run test:unit` | Runs the content of the `test/unit` folder. |
| `npm run test:behavior` | Runs the content of the `test/behavior` folder. |
| `npm run test:types` | Runs the content of the `test/types` folder. |
| `npm run test:unit -- --cov --coverage-report=html` | Runs the content of the `test/unit` folder and calculates the code coverage. |
| `npm run test:integration` | Runs the integration test runner.<br/>*Note: it requires a living instance of Elasticsearch.* |
| `npm run lint` | Run the [linter](https://standardjs.com/). |
| `npm run lint:fix` | Fixes the lint errors. |
| `npm test` | Runs lint, unit, behavior, and types test. |

#### Integration test
The integration test are generated on the fly by the runner you will find inside `test/integration`, once you execute it, it will clone the Elasticsearch repository and checkout the correct version to grab the [OSS yaml files](https://github.com/elastic/elasticsearch/tree/master/rest-api-spec/src/main/resources/rest-api-spec/test) and the [Elastic licensed yaml files](https://github.com/elastic/elasticsearch/tree/master/x-pack/plugin/src/test/resources/rest-api-spec/test) that will be used for generating the test.

Usually this step is executed by CI since it takes some time, but you can easily run this yourself! Just follow this steps:
1. Boot an Elasticsearch instance, you can do that by running `./scripts/es-docker.sh` or `./scripts/es-docker-platinum.sh`, the first one will work only with the OSS APIs, while the second will work also with the Elastic licensed APIs;
1. If you are running the OSS test, you should use `npm run test:integration`, otherwise use `TEST_ES_SERVER=https://elastic:changeme@localhost:9200 npm run test:integration`. You can also pass a `-b` parameter if you want the test to bail out at the first failure: `npm run test:integration -- -b`;
1. Grab a coffee, it will take some time ;)

### Releasing

If you have access to make releases, the process is as follows:

1. Update the version in `package.json` according to the scale of the change. (major, minor or patch)
1. Commit changes with message `Bumped vx.y.z` where `x.y.z` is the version in `package.json`
1. Create a release via the GitHub UI.
1. Wait for CI to finish running the test.
1. Publish to npm with `npm publish` *(see [publish](https://docs.npmjs.com/cli/publish) and [dist-tag](https://docs.npmjs.com/cli/dist-tag) docs)*
