# QueryDslFuzzyQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `max_expansions?` | `integer` | Maximum number of variations created. |
| `prefix_length?` | `integer` | Number of beginning characters left unchanged when creating expansions. |
| `rewrite?` | [`MultiTermQueryRewrite`](MultiTermQueryRewrite.md) | Number of beginning characters left unchanged when creating expansions. |
| `transpositions?` | `boolean` | Indicates whether edits include transpositions of two adjacent characters (for example `ab` to `ba`). |
| `fuzziness?` | [`Fuzziness`](Fuzziness.md) | Maximum edit distance allowed for matching. |
| `value` | `string | double | boolean` | Term you wish to find in the provided field. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
