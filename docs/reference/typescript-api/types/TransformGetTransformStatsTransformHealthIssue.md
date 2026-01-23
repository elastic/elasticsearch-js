# TransformGetTransformStatsTransformHealthIssue

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | The type of the issue |
| `issue` | `string` | A description of the issue |
| `details?` | `string` | Details about the issue |
| `count` | [`integer`](integer.md) | Number of times this issue has occurred since it started |
| `first_occurrence?` | [`EpochTime`](EpochTime.md)<UnitMillis> | The timestamp this issue occurred for for the first time |
| `first_occurence_string?` | [`DateTime`](DateTime.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
