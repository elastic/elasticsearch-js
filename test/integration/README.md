# `elasticsearch-js` integration test suite

> What? A README to explain how the integration test work??

Yes.

## Background
Elasticsearch offers its entire API via HTTP REST endpoints. You can find the whole API specification for every version [here](https://github.com/elastic/elasticsearch/tree/master/rest-api-spec/src/main/resources/rest-api-spec/api).<br/>
To support different languages at the same time, the Elasticsearch team decided to provide a [YAML specification](https://github.com/elastic/elasticsearch/tree/master/rest-api-spec/src/main/resources/rest-api-spec/test) to test every endpoint, body, headers, warning, error and so on.<br/>
This testing suite uses that specification to generate the test for the specified version of Elasticsearch on the fly.

## Run
Run the testing suite is very easy, you just need to run the preconfigured npm script:
```sh
npm run test:integration
```

The first time you run this command, the Elasticsearch repository will be cloned inside the integration test folder, to be able to access the YAML specification, so it might take some time *(luckily, only the first time)*.<br/>
Once the Elasticsearch repository has been cloned, the testing suite will connect to the provided Elasticsearch instance and then checkout the build hash in the repository. Finally, it will start running every test.

The specification does not allow the test to be run in parallel, so it might take a while to run the entire testing suite; on my machine, `MacBookPro15,2 core i7 2.7GHz 16GB of RAM` it takes around four minutes.

### Exit on the first failure
Bu default the suite will run all the test, even if one assertion has failed. If you want to stop the test at the first failure, use the bailout option:
```sh
npm run test:integration -- --bail
```

### Calculate the code coverage
If you want to calculate the code coverage just run the testing suite with the following parameters, once the test ends, it will open a browser window with the results.
```sh
npm run test:integration -- --cov --coverage-report=html
```

## How does this thing work?
At first sight, it might seem complicated, but once you understand what the moving parts are, it's quite easy.
1. Connects to the given Elasticsearch instance
1. Gets the ES version and build hash
1. Checkout to the given hash (and clone the repository if it is not present)
1. Reads the folder list and for each folder the yaml file list
1. Starts running folder by folder every file
  1. Read and parse the yaml files
  1. Creates a subtest structure to have a cleaner output
  1. Runs the assertions
  1. Repeat!

Inside the `index.js` file, you will find the connection, cloning, reading and parsing part of the test, while inside the `test-runner.js` file you will find the function to handle the assertions. Inside `test-runner.js`, we use a [queue](https://github.com/delvedor/workq) to be sure that everything is run in the correct order.

Checkout the [rest-api-spec readme](https://github.com/elastic/elasticsearch/blob/master/rest-api-spec/src/main/resources/rest-api-spec/test/README.asciidoc) if you want to know more about how the assertions work.

#### Why are we running the test with the `--harmony` flag?
Because on Node v6 the regex lookbehinds are not supported.
