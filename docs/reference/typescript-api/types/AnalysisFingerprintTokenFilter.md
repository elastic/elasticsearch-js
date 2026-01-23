# AnalysisFingerprintTokenFilter

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'fingerprint'` | - |
| `max_output_size?` | [`integer`](integer.md) | Maximum character length, including whitespace, of the output token. Defaults to `255`. Concatenated tokens longer than this will result in no token output. |
| `separator?` | `string` | Character to use to concatenate the token stream input. Defaults to a space. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
