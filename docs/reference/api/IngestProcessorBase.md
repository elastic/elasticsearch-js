# `IngestProcessorBase` [interface-IngestProcessorBase]

| Name | Type | Description |
| - | - | - |
| `description` | string | Description of the processor. Useful for describing the purpose of the processor or its configuration. |
| `if` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | Conditionally execute the processor. |
| `ignore_failure` | boolean | Ignore failures for the processor. |
| `on_failure` | [IngestProcessorContainer](./IngestProcessorContainer.md)[] | Handle failures for the processor. |
| `tag` | string | Identifier for the processor. Useful for debugging and metrics. |
