# AnalysisShingleTokenFilter

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'shingle'` | - |
| `filler_token?` | `string` | String used in shingles as a replacement for empty positions that do not contain a token. This filler token is only used in shingles, not original unigrams. Defaults to an underscore (`_`). |
| `max_shingle_size?` | [`SpecUtilsStringified`](SpecUtilsStringified.md)<integer> | Maximum number of tokens to concatenate when creating shingles. Defaults to `2`. |
| `min_shingle_size?` | [`SpecUtilsStringified`](SpecUtilsStringified.md)<integer> | Minimum number of tokens to concatenate when creating shingles. Defaults to `2`. |
| `output_unigrams?` | `boolean` | If `true`, the output includes the original input tokens. If `false`, the output only includes shingles; the original input tokens are removed. Defaults to `true`. |
| `output_unigrams_if_no_shingles?` | `boolean` | If `true`, the output includes the original input tokens only if no shingles are produced; if shingles are produced, the output only includes shingles. Defaults to `false`. |
| `token_separator?` | `string` | Separator used to concatenate adjacent tokens to form a shingle. Defaults to a space (`" "`). |

## See Also

- [All Types](./)
- [API Methods](../index.md)
