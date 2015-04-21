describe('Yaml Test Reader', function () {
  var YamlDoc = require('../../integration/yaml_suite/yaml_doc');
  var compare = YamlDoc.compareRangeToVersion;
  var expect = require('expect.js');

  describe('version range comparison', function () {
    // console.assert(rangeMatchesCurrentVersion(" - "));
    // console.assert(rangeMatchesCurrentVersion("0.4 - 1.3") === false, '1.4.4 is outside of 0.4 - 1.3');
    // console.assert(rangeMatchesCurrentVersion("0 - ") === true, '1.4.4 is less than infinity');
    // console.assert(rangeMatchesCurrentVersion(" - 1.4") === false, '1.4.4 is greater than 1.4');
    // console.assert(rangeMatchesCurrentVersion(" - 1.4.5") === true, '1.4.4 is less than 1.4.5');

    it('supports unbounded ranges', function () {
      expect(compare(' - ', '999999999999999999')).to.be(true);
      expect(compare('0 - ', '999999999999999999')).to.be(true);
      expect(compare(' - 1', '999999999999999999')).to.be(false);
    });

    it('supports bound ranges', function () {
      expect(compare('1.4 - 1.5', '1.4.4')).to.be(true);
      expect(compare('1.4.4 - 1.5', '1.4.4')).to.be(true);
      expect(compare('1.4 - 1.4.4', '1.4.4')).to.be(true);
      expect(compare('1.4 - 1.4.3', '1.4.4')).to.be(false);
      expect(compare('0.90 - 1.2', '1.0')).to.be(true);
      expect(compare('0.90 - 1.2', '1.4')).to.be(false);
    });
  });
});