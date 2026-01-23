# IndicesDataStreamLifecycleWithRollover

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `rollover?` | [`IndicesDataStreamLifecycleRolloverConditions`](IndicesDataStreamLifecycleRolloverConditions.md) | The conditions which will trigger the rollover of a backing index as configured by the cluster setting `cluster.lifecycle.default.rollover`.
This property is an implementation detail and it will only be retrieved when the query param `include_defaults` is set to true.
The contents of this field are subject to change. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
