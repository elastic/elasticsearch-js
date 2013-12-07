module.exports = {
  browser_client: {
    files: {
      '<%= distDir %>/elasticsearch.js': 'src/elasticsearch.js'
    },
    options: {
      standalone: 'elasticsearch',
      ignore: [
        'src/lib/connectors/jquery.js',
        'src/lib/connectors/angular.js'
      ]
    }
  },
  angular_client: {
    files: {
      '<%= distDir %>/elasticsearch.angular.js': ['src/elasticsearch.angular.js']
    },
    options: {
      ignore: [
        'src/lib/connectors/jquery.js',
        'src/lib/connectors/xhr.js',
        'when'
      ]
    }
  },
  jquery_client: {
    files: {
      '<%= distDir %>/elasticsearch.jquery.js': ['src/elasticsearch.jquery.js']
    },
    options: {
      ignore: [
        'src/lib/connectors/angular.js',
        'src/lib/connectors/xhr.js',
        'when'
      ]
    }
  }
};