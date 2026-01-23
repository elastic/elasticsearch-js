# IngestProcessorBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `description?` | `string` | Description of the processor.
Useful for describing the purpose of the processor or its configuration. |
| `if?` | `Script | ScriptSource` | Conditionally execute the processor. |
| `ignore_failure?` | `boolean` | Ignore failures for the processor. |
| `on_failure?` | `IngestProcessorContainer[]` | Handle failures for the processor. |
| `tag?` | `string` | Identifier for the processor.
Useful for debugging and metrics. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
