# IngestRerouteProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `destination?` | `string` | A static value for the target. Can’t be set when the dataset or namespace option is set. |
| `dataset?` | `string | string[]` | Field references or a static value for the dataset part of the data stream name.
In addition to the criteria for index names, cannot contain - and must be no longer than 100 characters.
Example values are nginx.access and nginx.error.

Supports field references with a mustache-like syntax (denoted as {{double}} or {{{triple}}} curly braces).
When resolving field references, the processor replaces invalid characters with _. Uses the <dataset> part
of the index name as a fallback if all field references resolve to a null, missing, or non-string value.

default {{data_stream.dataset}} |
| `namespace?` | `string | string[]` | Field references or a static value for the namespace part of the data stream name. See the criteria for
index names for allowed characters. Must be no longer than 100 characters.

Supports field references with a mustache-like syntax (denoted as {{double}} or {{{triple}}} curly braces).
When resolving field references, the processor replaces invalid characters with _. Uses the <namespace> part
of the index name as a fallback if all field references resolve to a null, missing, or non-string value.

default {{data_stream.namespace}} |

## See Also

- [All Types](./)
- [API Methods](../index.md)
