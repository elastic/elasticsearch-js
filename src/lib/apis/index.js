module.exports = {
  get '_default'() { return require('./7_4'); },
  get '7.4'() { return require('./7_4'); },
  get '7.3'() { return require('./7_3'); },
  get '7.2'() { return require('./7_2'); },
  get '7.1'() { return require('./7_1'); },
  get '7.0'() { return require('./7_0'); },
  get '6.8'() { return require('./6_8'); },
  get '5.6'() { return require('./5_6'); },
  get '7.5'() { return require('./7_5'); },
  get '7.x'() { return require('./7_x'); },
  get 'master'() { return require('./master'); },
};
