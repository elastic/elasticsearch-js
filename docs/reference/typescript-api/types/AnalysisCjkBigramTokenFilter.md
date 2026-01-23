# AnalysisCjkBigramTokenFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'cjk_bigram'` | - |
| `ignored_scripts?` | `AnalysisCjkBigramIgnoredScript[]` | Array of character scripts for which to disable bigrams. |
| `output_unigrams?` | `boolean` | If `true`, emit tokens in both bigram and unigram form. If `false`, a CJK character is output in unigram form when it has no adjacent characters. Defaults to `false`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
