# AnalysisSynonymTokenFilterBase

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `expand?` | `boolean` | Expands definitions for equivalent synonym rules. Defaults to `true`. |
| `format?` | [`AnalysisSynonymFormat`](AnalysisSynonymFormat.md) | Sets the synonym rules format. |
| `lenient?` | `boolean` | If `true` ignores errors while parsing the synonym rules. It is important to note that only those synonym rules which cannot get parsed are ignored. Defaults to the value of the `updateable` setting. |
| `synonyms?` | `string`[] | Used to define inline synonyms. |
| `synonyms_path?` | `string` | Used to provide a synonym file. This path must be absolute or relative to the `config` location. |
| `synonyms_set?` | `string` | Provide a synonym set created via Synonyms Management APIs. |
| `tokenizer?` | `string` | Controls the tokenizers that will be used to tokenize the synonym, this parameter is for backwards compatibility for indices that created before 6.0. |
| `updateable?` | `boolean` | If `true` allows reloading search analyzers to pick up changes to synonym files. Only to be used for search analyzers. Defaults to `false`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
