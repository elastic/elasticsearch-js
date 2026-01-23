# AnalysisPatternAnalyzer

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'pattern'` | - |
| `version?` | [`VersionString`](VersionString.md) | - |
| `flags?` | `string` | Java regular expression flags. Flags should be pipe-separated, eg "CASE_INSENSITIVE|COMMENTS". |
| `lowercase?` | `boolean` | Should terms be lowercased or not.
Defaults to `true`. |
| `pattern?` | `string` | A Java regular expression.
Defaults to `\W+`. |
| `stopwords?` | [`AnalysisStopWords`](AnalysisStopWords.md) | A pre-defined stop words list like `_english_` or an array containing a list of stop words.
Defaults to `_none_`. |
| `stopwords_path?` | `string` | The path to a file containing stop words. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
