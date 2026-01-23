# AnalysisStopTokenFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'stop'` | - |
| `ignore_case?` | `boolean` | If `true`, stop word matching is case insensitive. For example, if `true`, a stop word of the matches and removes `The`, `THE`, or `the`. Defaults to `false`. |
| `remove_trailing?` | `boolean` | If `true`, the last token of a stream is removed if it’s a stop word. Defaults to `true`. |
| `stopwords?` | [`AnalysisStopWords`](AnalysisStopWords.md) | Language value, such as `_arabic_` or `_thai_`. Defaults to `_english_`. |
| `stopwords_path?` | `string` | Path to a file that contains a list of stop words to remove.
This path must be absolute or relative to the `config` location, and the file must be UTF-8 encoded. Each stop word in the file must be separated by a line break. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
