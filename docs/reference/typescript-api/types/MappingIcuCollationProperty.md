# MappingIcuCollationProperty

## Interface

### Extends

- [`MappingDocValuesPropertyBase`](MappingDocValuesPropertyBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'icu_collation_keyword'` | - |
| `norms?` | `boolean` | - |
| `index_options?` | [`MappingIndexOptions`](MappingIndexOptions.md) | - |
| `index?` | `boolean` | Should the field be searchable? |
| `null_value?` | `string` | Accepts a string value which is substituted for any explicit null values. Defaults to null, which means the field is treated as missing. |
| `rules?` | `string` | - |
| `language?` | `string` | - |
| `country?` | `string` | - |
| `variant?` | `string` | - |
| `strength?` | [`AnalysisIcuCollationStrength`](AnalysisIcuCollationStrength.md) | - |
| `decomposition?` | [`AnalysisIcuCollationDecomposition`](AnalysisIcuCollationDecomposition.md) | - |
| `alternate?` | [`AnalysisIcuCollationAlternate`](AnalysisIcuCollationAlternate.md) | - |
| `case_level?` | `boolean` | - |
| `case_first?` | [`AnalysisIcuCollationCaseFirst`](AnalysisIcuCollationCaseFirst.md) | - |
| `numeric?` | `boolean` | - |
| `variable_top?` | `string` | - |
| `hiragana_quaternary_mode?` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
