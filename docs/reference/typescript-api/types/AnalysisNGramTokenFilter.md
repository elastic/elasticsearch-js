# AnalysisNGramTokenFilter

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'ngram'` | - |
| `max_gram?` | [`integer`](integer.md) | Maximum length of characters in a gram. Defaults to `2`. |
| `min_gram?` | [`integer`](integer.md) | Minimum length of characters in a gram. Defaults to `1`. |
| `preserve_original?` | [`SpecUtilsStringified`](SpecUtilsStringified.md)<boolean> | Emits original token when set to `true`. Defaults to `false`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
