var keys = require('../../test/utils/keys');

module.exports = {
  all: {
    options: {
      urls: [
        'http://127.0.0.1:8000/unit.html',
        'http://127.0.0.1:8000/builds.html'
      ],
      testname: process.env.CI_BUILD_NUMBER ? 'build_' + process.env.CI_BUILD_NUMBER : 'local_' + Date.now(),
      username: keys.saucelabs_user,
      key: keys.saucelabs,
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