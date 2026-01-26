# InferenceInferenceChunkingSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `max_chunk_size?` | [`integer`](integer.md) | The maximum size of a chunk in words.
This value cannot be lower than `20` (for `sentence` strategy) or `10` (for `word` strategy).
This value should not exceed the window size for the associated model. |
| `overlap?` | [`integer`](integer.md) | The number of overlapping words for chunks.
It is applicable only to a `word` chunking strategy.
This value cannot be higher than half the `max_chunk_size` value. |
| `sentence_overlap?` | [`integer`](integer.md) | The number of overlapping sentences for chunks.
It is applicable only for a `sentence` chunking strategy.
It can be either `1` or `0`. |
| `separator_group?` | `string` | Only applicable to the `recursive` strategy and required when using it.

Sets a predefined list of separators in the saved chunking settings based on the selected text type.
Values can be `markdown` or `plaintext`.

Using this parameter is an alternative to manually specifying a custom `separators` list. |
| `separators?` | `string`[] | Only applicable to the `recursive` strategy and required when using it.

A list of strings used as possible split points when chunking text.

Each string can be a plain string or a regular expression (regex) pattern.
The system tries each separator in order to split the text, starting from the first item in the list.

After splitting, it attempts to recombine smaller pieces into larger chunks that stay within
the `max_chunk_size` limit, to reduce the total number of chunks generated. |
| `strategy?` | `string` | The chunking strategy: `sentence`, `word`, `none` or `recursive`.

 * If `strategy` is set to `recursive`, you must also specify:

- `max_chunk_size`
- either `separators` or`separator_group`

Learn more about different chunking strategies in the linked documentation. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
