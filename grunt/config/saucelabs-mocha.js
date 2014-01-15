module.exports = {
  options: {
    urls: [
      'http://127.0.0.1:8000/unit.html',
      'http://127.0.0.1:8000/builds.html'
    ],
    build: process.env.TRAVIS_JOB_ID || 'local_' + Date.now(),
    detailedError: true
  },
  chrome: {
    options: {
      browsers: [
        {
          browserName: 'chrome',
          platform: 'Windows 8'
        },
        {
          browserName: 'chrome',
          platform: 'Linux'
        }
      ],
      tags: ['master', 'chrome']
    }
  },
  ie: {
    options: {
      browsers: [
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
        }
      ],
      tags: ['master', 'ie']
    }
  },
  firefox: {
    options: {
      browsers: [
        {
          browserName: 'firefox',
          platform: 'Windows 7'
        },
        {
          browserName: 'firefox',
          platform: 'Linux'
        }
      ],
      tags: ['master', 'firefox']
    }
  }
};