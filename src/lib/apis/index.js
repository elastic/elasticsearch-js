module.exports = {
  get '_default'() { return require('./5_3'); },
  get '5.3'() { return require('./5_3'); },
  get '5.2'() { return require('./5_2'); },
  get '5.1'() { return require('./5_1'); },
  get '5.0'() { return require('./5_0'); },
  get '2.4'() { return require('./2_4'); },
  get '1.7'() { return require('./1_7'); },
  get '0.90'() { return require('./0_90'); },
  get '5.x'() { return require('./5_x'); },
  get '5.4'() { return require('./5_4'); },
  get 'master'() { return require('./master'); },
};
