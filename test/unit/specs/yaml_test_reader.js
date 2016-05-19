describe('Yaml Test Reader', function () {
  var YamlDoc = require('../../integration/yaml_suite/yaml_doc');
  var compare = YamlDoc.compareRangeToVersion;
  var expect = require('expect.js');

  describe('version range comparison', function () {
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
