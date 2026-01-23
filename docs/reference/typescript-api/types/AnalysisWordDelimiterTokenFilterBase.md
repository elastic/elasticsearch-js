# AnalysisWordDelimiterTokenFilterBase

## Interface

### Extends

- [`AnalysisTokenFilterBase`](AnalysisTokenFilterBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `catenate_all?` | `boolean` | If `true`, the filter produces catenated tokens for chains of alphanumeric characters separated by non-alphabetic delimiters. Defaults to `false`. |
| `catenate_numbers?` | `boolean` | If `true`, the filter produces catenated tokens for chains of numeric characters separated by non-alphabetic delimiters. Defaults to `false`. |
| `catenate_words?` | `boolean` | If `true`, the filter produces catenated tokens for chains of alphabetical characters separated by non-alphabetic delimiters. Defaults to `false`. |
| `generate_number_parts?` | `boolean` | If `true`, the filter includes tokens consisting of only numeric characters in the output. If `false`, the filter excludes these tokens from the output. Defaults to `true`. |
| `generate_word_parts?` | `boolean` | If `true`, the filter includes tokens consisting of only alphabetical characters in the output. If `false`, the filter excludes these tokens from the output. Defaults to `true`. |
| `preserve_original?` | [`SpecUtilsStringified`](SpecUtilsStringified.md)<boolean> | If `true`, the filter includes the original version of any split tokens in the output. This original version includes non-alphanumeric delimiters. Defaults to `false`. |
| `protected_words?` | `string[]` | Array of tokens the filter won’t split. |
| `protected_words_path?` | `string` | Path to a file that contains a list of tokens the filter won’t split.
This path must be absolute or relative to the `config` location, and the file must be UTF-8 encoded. Each token in the file must be separated by a line break. |
| `split_on_case_change?` | `boolean` | If `true`, the filter splits tokens at letter case transitions. For example: camelCase -> [ camel, Case ]. Defaults to `true`. |
| `split_on_numerics?` | `boolean` | If `true`, the filter splits tokens at letter-number transitions. For example: j2se -> [ j, 2, se ]. Defaults to `true`. |
| `stem_english_possessive?` | `boolean` | If `true`, the filter removes the English possessive (`'s`) from the end of each token. For example: O'Neil's -> [ O, Neil ]. Defaults to `true`. |
| `type_table?` | `string[]` | Array of custom type mappings for characters. This allows you to map non-alphanumeric characters as numeric or alphanumeric to avoid splitting on those characters. |
| `type_table_path?` | `string` | Path to a file that contains custom type mappings for characters. This allows you to map non-alphanumeric characters as numeric or alphanumeric to avoid splitting on those characters. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
