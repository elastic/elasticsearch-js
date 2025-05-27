## Interface `IngestRedactProcessor`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to be redacted |
| `ignore_missing` | boolean | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `pattern_definitions` | Record<string, string> | &nbsp; |
| `patterns` | [GrokPattern](./GrokPattern.md)[] | A list of grok expressions to match and redact named captures with |
| `prefix` | string | Start a redacted section with this token |
| `skip_if_unlicensed` | boolean | If `true` and the current license does not support running redact processors, then the processor quietly exits without modifying the document |
| `suffix` | string | End a redacted section with this token |
| `trace_redact` | boolean | If `true` then ingest metadata `_ingest._redact._is_redacted` is set to `true` if the document has been redacted |
