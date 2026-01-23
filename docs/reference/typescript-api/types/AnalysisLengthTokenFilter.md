# AnalysisLengthTokenFilter

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'length'` | - |
| `max?` | [`integer`](integer.md) | Maximum character length of a token. Longer tokens are excluded from the output. Defaults to `Integer.MAX_VALUE`, which is `2^31-1` or `2147483647`. |
| `min?` | [`integer`](integer.md) | Minimum character length of a token. Shorter tokens are excluded from the output. Defaults to `0`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
