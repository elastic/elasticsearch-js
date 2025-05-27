## Interface `AnalysisHyphenationDecompounderTokenFilter`

| Name | Type | Description |
| - | - | - |
| `hyphenation_patterns_path` | string | Path to an Apache FOP (Formatting Objects Processor) XML hyphenation pattern file. This path must be absolute or relative to the `config` location. Only FOP v1.2 compatible files are supported. |
| `no_overlapping_matches` | boolean | If `true`, do not allow overlapping tokens. Defaults to `false`. |
| `no_sub_matches` | boolean | If `true`, do not match sub tokens in tokens that are in the word list. Defaults to `false`. |
| `type` | 'hyphenation_decompounder' | &nbsp; |
