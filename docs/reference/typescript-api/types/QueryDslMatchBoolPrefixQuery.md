# QueryDslMatchBoolPrefixQuery

## Interface

### Extends

- [`QueryDslQueryBase`](QueryDslQueryBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to convert the text in the query value into tokens. |
| `fuzziness?` | [`Fuzziness`](Fuzziness.md) | Maximum edit distance allowed for matching.
Can be applied to the term subqueries constructed for all terms but the final term. |
| `fuzzy_rewrite?` | [`MultiTermQueryRewrite`](MultiTermQueryRewrite.md) | Method used to rewrite the query.
Can be applied to the term subqueries constructed for all terms but the final term. |
| `fuzzy_transpositions?` | `boolean` | If `true`, edits for fuzzy matching include transpositions of two adjacent characters (for example, `ab` to `ba`).
Can be applied to the term subqueries constructed for all terms but the final term. |
| `max_expansions?` | [`integer`](integer.md) | Maximum number of terms to which the query will expand.
Can be applied to the term subqueries constructed for all terms but the final term. |
| `minimum_should_match?` | [`MinimumShouldMatch`](MinimumShouldMatch.md) | Minimum number of clauses that must match for a document to be returned.
Applied to the constructed bool query. |
| `operator?` | [`QueryDslOperator`](QueryDslOperator.md) | Boolean logic used to interpret text in the query value.
Applied to the constructed bool query. |
| `prefix_length?` | [`integer`](integer.md) | Number of beginning characters left unchanged for fuzzy matching.
Can be applied to the term subqueries constructed for all terms but the final term. |
| `query` | `string` | Terms you wish to find in the provided field.
The last term is used in a prefix query. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
