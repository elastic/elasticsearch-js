# SpecUtilsCommonQueryParameters

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `error_trace?` | `boolean` | When set to `true` Elasticsearch will include the full stack trace of errors
when they occur. |
| `filter_path?` | `string | string`[] | Comma-separated list of filters in dot notation which reduce the response
returned by Elasticsearch. |
| `human?` | `boolean` | When set to `true` will return statistics in a format suitable for humans.
For example `"exists_time": "1h"` for humans and
`"exists_time_in_millis": 3600000` for computers. When disabled the human
readable values will be omitted. This makes sense for responses being consumed
only by machines. |
| `pretty?` | `boolean` | If set to `true` the returned JSON will be "pretty-formatted". Only use
this option for debugging only. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
