// I know this is horrible
// I just don't want the keys searchable on github
module.exports = JSON.parse(new Buffer(
  'eyJ1c2VyIjoiZWxhc3RpY3NlYXJjaC1qcyIsImtleSI6IjI0ZjQ5ZTA3LWQ4MmYtNDA2Ny04NTRlLWQ4MTVlYmQxNWU0NiJ9',
  'base64'
).toString('utf8'));