# MappingDenseVectorIndexOptionsRescoreVector

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `oversample` | `float` | The oversampling factor to use when searching for the nearest neighbor. This is only applicable to the quantized formats: `bbq_*`, `int4_*`, and `int8_*`.
When provided, `oversample * k` vectors will be gathered and then their scores will be re-computed with the original vectors.

valid values are between `1.0` and `10.0` (inclusive), or `0` exactly to disable oversampling. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
