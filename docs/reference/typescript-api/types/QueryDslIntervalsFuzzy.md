# QueryDslIntervalsFuzzy

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to normalize the term. |
| `fuzziness?` | [`Fuzziness`](Fuzziness.md) | Maximum edit distance allowed for matching. |
| `prefix_length?` | `integer` | Number of beginning characters left unchanged when creating expansions. |
| `term` | `string` | The term to match. |
| `transpositions?` | `boolean` | Indicates whether edits include transpositions of two adjacent characters (for example, `ab` to `ba`). |
| `use_field?` | [`Field`](Field.md) | If specified, match intervals from this field rather than the top-level field.
The `term` is normalized using the search analyzer from this field, unless `analyzer` is specified separately. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
