# AggregationsDiversifiedSamplerAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `execution_hint?` | [`AggregationsSamplerAggregationExecutionHint`](AggregationsSamplerAggregationExecutionHint.md) | The type of value used for de-duplication. |
| `max_docs_per_value?` | `integer` | Limits how many documents are permitted per choice of de-duplicating value. |
| `script?` | `Script | ScriptSource` | - |
| `shard_size?` | `integer` | Limits how many top-scoring documents are collected in the sample processed on each shard. |
| `field?` | [`Field`](Field.md) | The field used to provide values used for de-duplication. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
