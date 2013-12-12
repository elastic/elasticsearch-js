module.exports = {
  unit: {
    src: ['test/unit/test_*.js'],
    reporter: 'XUnit',
    dest: './test-output-phantom-unit.xml',
    run: true
  }
};