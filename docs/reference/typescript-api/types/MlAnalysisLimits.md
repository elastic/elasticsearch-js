# MlAnalysisLimits

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `categorization_examples_limit?` | `long` | The maximum number of examples stored per category in memory and in the results data store. If you increase this value, more examples are available, however it requires that you have more storage available. If you set this value to 0, no examples are stored. NOTE: The `categorization_examples_limit` applies only to analysis that uses categorization. |
| `model_memory_limit?` | [`ByteSize`](ByteSize.md) | The approximate maximum amount of memory resources that are required for analytical processing. Once this limit is approached, data pruning becomes more aggressive. Upon exceeding this limit, new entities are not modeled. If the `xpack.ml.max_model_memory_limit` setting has a value greater than 0 and less than 1024mb, that value is used instead of the default. The default value is relatively small to ensure that high resource usage is a conscious decision. If you have jobs that are expected to analyze high cardinality fields, you will likely need to use a higher value. If you specify a number instead of a string, the units are assumed to be MiB. Specifying a string is recommended for clarity. If you specify a byte size unit of `b` or `kb` and the number does not equate to a discrete number of megabytes, it is rounded down to the closest MiB. The minimum valid value is 1 MiB. If you specify a value less than 1 MiB, an error occurs. If you specify a value for the `xpack.ml.max_model_memory_limit` setting, an error occurs when you try to create jobs that have `model_memory_limit` values greater than that setting value. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
