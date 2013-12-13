module.exports = {
  confirm_release: {
    options: {
      questions: [{
        config: 'confirm.release',
        type: 'confirm',
        message: 'Are you sure you want to overwrite/release version <%= package.version %> of elasticsearch-js',
        default: false
      }]
    }
  }
};