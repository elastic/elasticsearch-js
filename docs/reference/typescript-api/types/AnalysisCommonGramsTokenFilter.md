# AnalysisCommonGramsTokenFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'common_grams'` | - |
| `common_words?` | `string[]` | A list of tokens. The filter generates bigrams for these tokens.
Either this or the `common_words_path` parameter is required. |
| `common_words_path?` | `string` | Path to a file containing a list of tokens. The filter generates bigrams for these tokens.
This path must be absolute or relative to the `config` location. The file must be UTF-8 encoded. Each token in the file must be separated by a line break.
Either this or the `common_words` parameter is required. |
| `ignore_case?` | `boolean` | If `true`, matches for common words matching are case-insensitive. Defaults to `false`. |
| `query_mode?` | `boolean` | If `true`, the filter excludes the following tokens from the output:
- Unigrams for common words
- Unigrams for terms followed by common words
Defaults to `false`. We recommend enabling this parameter for search analyzers. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
