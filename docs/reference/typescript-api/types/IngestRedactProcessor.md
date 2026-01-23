# IngestRedactProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field to be redacted |
| `patterns` | `GrokPattern[]` | A list of grok expressions to match and redact named captures with |
| `pattern_definitions?` | `Record<string, string>` | - |
| `prefix?` | `string` | Start a redacted section with this token |
| `suffix?` | `string` | End a redacted section with this token |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `skip_if_unlicensed?` | `boolean` | If `true` and the current license does not support running redact processors, then the processor quietly exits without modifying the document |
| `trace_redact?` | `boolean` | If `true` then ingest metadata `_ingest._redact._is_redacted` is set to `true` if the document has been redacted |

## See Also

- [All Types](./)
- [API Methods](../index.md)
