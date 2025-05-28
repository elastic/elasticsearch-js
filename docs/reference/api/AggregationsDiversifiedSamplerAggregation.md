# `AggregationsDiversifiedSamplerAggregation` [interface-AggregationsDiversifiedSamplerAggregation]

| Name | Type | Description |
| - | - | - |
| `execution_hint` | [AggregationsSamplerAggregationExecutionHint](./AggregationsSamplerAggregationExecutionHint.md) | The type of value used for de-duplication. |
| `field` | [Field](./Field.md) | The field used to provide values used for de-duplication. |
| `max_docs_per_value` | [integer](./integer.md) | Limits how many documents are permitted per choice of de-duplicating value. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | &nbsp; |
| `shard_size` | [integer](./integer.md) | Limits how many top-scoring documents are collected in the sample processed on each shard. |
