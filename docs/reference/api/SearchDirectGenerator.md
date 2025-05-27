## Interface `SearchDirectGenerator`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to fetch the candidate suggestions from. Needs to be set globally or per suggestion. |
| `max_edits` | [integer](./integer.md) | The maximum edit distance candidate suggestions can have in order to be considered as a suggestion. Can only be `1` or `2`. |
| `max_inspections` | [float](./float.md) | A factor that is used to multiply with the shard_size in order to inspect more candidate spelling corrections on the shard level. Can improve accuracy at the cost of performance. |
| `max_term_freq` | [float](./float.md) | The maximum threshold in number of documents in which a suggest text token can exist in order to be included. This can be used to exclude high frequency terms—which are usually spelled correctly—from being spellchecked. Can be a relative percentage number (for example `0.4`) or an absolute number to represent document frequencies. If a value higher than 1 is specified, then fractional can not be specified. |
| `min_doc_freq` | [float](./float.md) | The minimal threshold in number of documents a suggestion should appear in. This can improve quality by only suggesting high frequency terms. Can be specified as an absolute number or as a relative percentage of number of documents. If a value higher than 1 is specified, the number cannot be fractional. |
| `min_word_length` | [integer](./integer.md) | The minimum length a suggest text term must have in order to be included. |
| `post_filter` | string | A filter (analyzer) that is applied to each of the generated tokens before they are passed to the actual phrase scorer. |
| `pre_filter` | string | A filter (analyzer) that is applied to each of the tokens passed to this candidate generator. This filter is applied to the original token before candidates are generated. |
| `prefix_length` | [integer](./integer.md) | The number of minimal prefix characters that must match in order be a candidate suggestions. Increasing this number improves spellcheck performance. |
| `size` | [integer](./integer.md) | The maximum corrections to be returned per suggest text token. |
| `suggest_mode` | [SuggestMode](./SuggestMode.md) | Controls what suggestions are included on the suggestions generated on each shard. |
