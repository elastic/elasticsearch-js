# AnalysisFingerprintAnalyzer

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'fingerprint'` | - |
| `version?` | [`VersionString`](VersionString.md) | - |
| `max_output_size?` | [`integer`](integer.md) | The maximum token size to emit. Tokens larger than this size will be discarded.
Defaults to `255` |
| `separator?` | `string` | The character to use to concatenate the terms.
Defaults to a space. |
| `stopwords?` | [`AnalysisStopWords`](AnalysisStopWords.md) | A pre-defined stop words list like `_english_` or an array containing a list of stop words.
Defaults to `_none_`. |
| `stopwords_path?` | `string` | The path to a file containing stop words. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
