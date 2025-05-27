## Interface `GraphExploreControls`

| Name | Type | Description |
| - | - | - |
| `sample_diversity` | [GraphSampleDiversity](./GraphSampleDiversity.md) | To avoid the top-matching documents sample being dominated by a single source of results, it is sometimes necessary to request diversity in the sample. You can do this by selecting a single-value field and setting a maximum number of documents per value for that field. |
| `sample_size` | [integer](./integer.md) | Each hop considers a sample of the best-matching documents on each shard. Using samples improves the speed of execution and keeps exploration focused on meaningfully-connected terms. Very small values (less than 50) might not provide sufficient weight-of-evidence to identify significant connections between terms. Very large sample sizes can dilute the quality of the results and increase execution times. |
| `timeout` | [Duration](./Duration.md) | The length of time in milliseconds after which exploration will be halted and the results gathered so far are returned. This timeout is honored on a best-effort basis. Execution might overrun this timeout if, for example, a long pause is encountered while FieldData is loaded for a field. |
| `use_significance` | boolean | Filters associated terms so only those that are significantly associated with your query are included. |
