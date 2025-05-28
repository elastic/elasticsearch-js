# `SearchPhraseSuggester` [interface-SearchPhraseSuggester]

| Name | Type | Description |
| - | - | - |
| `collate` | [SearchPhraseSuggestCollate](./SearchPhraseSuggestCollate.md) | Checks each suggestion against the specified query to prune suggestions for which no matching docs exist in the index. |
| `confidence` | [double](./double.md) | Defines a factor applied to the input phrases score, which is used as a threshold for other suggest candidates. Only candidates that score higher than the threshold will be included in the result. |
| `direct_generator` | [SearchDirectGenerator](./SearchDirectGenerator.md)[] | A list of candidate generators that produce a list of possible terms per term in the given text. |
| `force_unigrams` | boolean | &nbsp; |
| `gram_size` | [integer](./integer.md) | Sets max size of the n-grams (shingles) in the field. If the field doesn’t contain n-grams (shingles), this should be omitted or set to `1`. If the field uses a shingle filter, the `gram_size` is set to the `max_shingle_size` if not explicitly set. |
| `highlight` | [SearchPhraseSuggestHighlight](./SearchPhraseSuggestHighlight.md) | Sets up suggestion highlighting. If not provided, no highlighted field is returned. |
| `max_errors` | [double](./double.md) | The maximum percentage of the terms considered to be misspellings in order to form a correction. This method accepts a float value in the range `[0..1)` as a fraction of the actual query terms or a number `>=1` as an absolute number of query terms. |
| `real_word_error_likelihood` | [double](./double.md) | The likelihood of a term being misspelled even if the term exists in the dictionary. |
| `separator` | string | The separator that is used to separate terms in the bigram field. If not set, the whitespace character is used as a separator. |
| `shard_size` | [integer](./integer.md) | Sets the maximum number of suggested terms to be retrieved from each individual shard. |
| `smoothing` | [SearchSmoothingModelContainer](./SearchSmoothingModelContainer.md) | The smoothing model used to balance weight between infrequent grams (grams (shingles) are not existing in the index) and frequent grams (appear at least once in the index). The default model is Stupid Backoff. |
| `text` | string | The text/query to provide suggestions for. |
| `token_limit` | [integer](./integer.md) | &nbsp; |
