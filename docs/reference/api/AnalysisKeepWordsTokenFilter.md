# `AnalysisKeepWordsTokenFilter` [interface-AnalysisKeepWordsTokenFilter]

| Name | Type | Description |
| - | - | - |
| `keep_words_case` | boolean | If `true`, lowercase all keep words. Defaults to `false`. |
| `keep_words_path` | string | Path to a file that contains a list of words to keep. Only tokens that match words in this list are included in the output. This path must be absolute or relative to the `config` location, and the file must be UTF-8 encoded. Each word in the file must be separated by a line break. Either this parameter or `keep_words` must be specified. |
| `keep_words` | string[] | List of words to keep. Only tokens that match words in this list are included in the output. Either this parameter or `keep_words_path` must be specified. |
| `type` | 'keep' | &nbsp; |
