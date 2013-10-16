# Log Generator

Simple generator used to push events into ES. Uses the JS client, and serves as a "simple" type test to make sure it's sort of efficient.

Uses the Bulk API to communicate push docs into `logstash-YYYY.MM.DD` style indices which are easyily consumed by Kibana.

Documents look like this:

```
{
  "_index": "logstash-2013.10.20",
  "_type": "apache",
  "_id": "42",
  "_score": 1,
  "_source": {
    "index": "logstash-2013.10.20",
    "@timestamp": "2013-10-20T10:50:22.980Z",
    "ip": "193.224.70.190",
    "extension": "html",
    "response": "404",
    "country": "JO",
    "point": [
      43.73331611,
      -103.6176947
    ],
    "@tags": [
      "success",
      "security"
    ],
    "utc_time": "2013-10-20T10:50:22.980Z",
    "referer": "http://twitter.com/success/wendy-lawrence",
    "agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)",
    "clientip": "193.224.70.190",
    "bytes": 4409.774264320731,
    "request": "/pyotr-kolodin.html",
    "memory": 0,
    "@message": "193.224.70.190 - - ..." // apache error log
  }
}
```

## to run

from the project root, call:

```
node scripts/generate/logs # use --help to see usage
```
