## Interface `AnalysisStandardAnalyzer`

| Name | Type | Description |
| - | - | - |
| `max_token_length` | [integer](./integer.md) | The maximum token length. If a token is seen that exceeds this length then it is split at `max_token_length` intervals. Defaults to `255`. |
| `stopwords_path` | string | The path to a file containing stop words. |
| `stopwords` | [AnalysisStopWords](./AnalysisStopWords.md) | A pre-defined stop words list like `_english_` or an array containing a list of stop words. Defaults to `_none_`. |
| `type` | 'standard' | &nbsp; |
