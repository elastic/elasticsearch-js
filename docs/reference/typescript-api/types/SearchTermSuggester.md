# SearchTermSuggester

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `lowercase_terms?` | `boolean` | - |
| `max_edits?` | `integer` | The maximum edit distance candidate suggestions can have in order to be considered as a suggestion.
Can only be `1` or `2`. |
| `max_inspections?` | `integer` | A factor that is used to multiply with the shard_size in order to inspect more candidate spelling corrections on the shard level.
Can improve accuracy at the cost of performance. |
| `max_term_freq?` | `float` | The maximum threshold in number of documents in which a suggest text token can exist in order to be included.
Can be a relative percentage number (for example `0.4`) or an absolute number to represent document frequencies.
If a value higher than 1 is specified, then fractional can not be specified. |
| `min_doc_freq?` | `float` | The minimal threshold in number of documents a suggestion should appear in.
This can improve quality by only suggesting high frequency terms.
Can be specified as an absolute number or as a relative percentage of number of documents.
If a value higher than 1 is specified, then the number cannot be fractional. |
| `min_word_length?` | `integer` | The minimum length a suggest text term must have in order to be included. |
| `prefix_length?` | `integer` | The number of minimal prefix characters that must match in order be a candidate for suggestions.
Increasing this number improves spellcheck performance. |
| `shard_size?` | `integer` | Sets the maximum number of suggestions to be retrieved from each individual shard. |
| `sort?` | [`SearchSuggestSort`](SearchSuggestSort.md) | Defines how suggestions should be sorted per suggest text term. |
| `string_distance?` | [`SearchStringDistance`](SearchStringDistance.md) | The string distance implementation to use for comparing how similar suggested terms are. |
| `suggest_mode?` | [`SuggestMode`](SuggestMode.md) | Controls what suggestions are included or controls for what suggest text terms, suggestions should be suggested. |
| `text?` | `string` | The suggest text.
Needs to be set globally or per suggestion. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
