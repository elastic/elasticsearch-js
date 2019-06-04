module.exports = {
  get '_default'() { return require('./7_1'); },
  get '7.1'() { return require('./7_1'); },
  get '7.0'() { return require('./7_0'); },
  get '6.7'() { return require('./6_7'); },
  get '5.6'() { return require('./5_6'); },
  get '7.2'() { return require('./7_2'); },
  get '6.8'() { return require('./6_8'); },
  get '7.x'() { return require('./7_x'); },
  get 'master'() { return require('./master'); },
};
