# MlModelPlotConfig

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `annotations_enabled?` | `boolean` | If true, enables calculation and storage of the model change annotations for each entity that is being analyzed. |
| `enabled?` | `boolean` | If true, enables calculation and storage of the model bounds for each entity that is being analyzed. |
| `terms?` | [`Field`](Field.md) | Limits data collection to this comma separated list of partition or by field values. If terms are not specified or it is an empty string, no filtering is applied. Wildcards are not supported. Only the specified terms can be viewed when using the Single Metric Viewer. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
