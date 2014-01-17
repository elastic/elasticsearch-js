// I know this is horrible
// I just don't want the keys searchable on github
module.exports = JSON.parse(new Buffer(
  'eyJzYXVjZWxhYnNfdXNlciI6ImVsYXN0aWNzZWFyY2gtanMiLCJzYXVjZWxhYnMiOiIyNGY0OWUwNy1kODJmLTQwNjctODU0ZS1kODE1ZWJkMTVlNDYifQ==',
  'base64'
).toString('utf8'));