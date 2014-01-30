var slk = require('../../test/utils/slk');
module.exports = {
  all: {
    options: {
      urls: [
        'http://127.0.0.1:8000/unit.html',
        'http://127.0.0.1:8000/builds.html'
      ],
      testname: 'es.js client tests',
      build: process.env.CI_BUILD_NUMBER,
      concurrency: 10,
      username: slk.user,
      key: slk.key,
      browsers: [
        {
          browserName: 'chrome',
          platform: 'Windows 8'
        },
        {
          browserName: 'chrome',
          platform: 'Linux'
        },
        {
          browserName: 'internet explorer',
          version: '11',
          platform: 'Windows 8.1'
        },
        {
          browserName: 'internet explorer',
          version: '10',
          platform: 'Windows 8'
        },
        {
          browserName: 'internet explorer',
          version: '9',
          platform: 'Windows 7'
        },
        {
          browserName: 'firefox',
          platform: 'Windows 7'
        },
        {
          browserName: 'firefox',
          platform: 'Linux'
        }
      ]
    }
  }
};