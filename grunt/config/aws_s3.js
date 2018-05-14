module.exports = {
  upload_archives: {
    files: [
      {
        expand: true,
        cwd: '<%= distDir %>/archives',
        src: '*',
        dest: 'elasticsearch/elasticsearch-js/'
      },
    ],
    options: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'download.elasticsearch.org',
      access: 'public-read',
      params: {
        'ContentDisposition': 'attachment'
      }
    }
  }
};
