# AnalysisCompoundWordTokenFilterBase

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `max_subword_size?` | [`integer`](integer.md) | Maximum subword character length. Longer subword tokens are excluded from the output. Defaults to `15`. |
| `min_subword_size?` | [`integer`](integer.md) | Minimum subword character length. Shorter subword tokens are excluded from the output. Defaults to `2`. |
| `min_word_size?` | [`integer`](integer.md) | Minimum word character length. Shorter word tokens are excluded from the output. Defaults to `5`. |
| `only_longest_match?` | `boolean` | If `true`, only include the longest matching subword. Defaults to `false`. |
| `word_list?` | `string[]` | A list of subwords to look for in the token stream. If found, the subword is included in the token output.
Either this parameter or `word_list_path` must be specified. |
| `word_list_path?` | `string` | Path to a file that contains a list of subwords to find in the token stream. If found, the subword is included in the token output.
This path must be absolute or relative to the config location, and the file must be UTF-8 encoded. Each token in the file must be separated by a line break.
Either this parameter or `word_list` must be specified. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
