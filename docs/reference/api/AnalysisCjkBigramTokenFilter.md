## Interface `AnalysisCjkBigramTokenFilter`

| Name | Type | Description |
| - | - | - |
| `ignored_scripts` | [AnalysisCjkBigramIgnoredScript](./AnalysisCjkBigramIgnoredScript.md)[] | Array of character scripts for which to disable bigrams. |
| `output_unigrams` | boolean | If `true`, emit tokens in both bigram and unigram form. If `false`, a CJK character is output in unigram form when it has no adjacent characters. Defaults to `false`. |
| `type` | 'cjk_bigram' | &nbsp; |
