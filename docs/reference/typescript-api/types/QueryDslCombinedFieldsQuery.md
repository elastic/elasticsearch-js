# QueryDslCombinedFieldsQuery

## Interface

### Extends

- [`QueryDslQueryBase`](QueryDslQueryBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `fields` | [`Field`](Field.md)[] | List of fields to search. Field wildcard patterns are allowed. Only `text` fields are supported, and they must all have the same search `analyzer`. |
| `query` | `string` | Text to search for in the provided `fields`.
The `combined_fields` query analyzes the provided text before performing a search. |
| `auto_generate_synonyms_phrase_query?` | `boolean` | If true, match phrase queries are automatically created for multi-term synonyms. |
| `operator?` | [`QueryDslCombinedFieldsOperator`](QueryDslCombinedFieldsOperator.md) | Boolean logic used to interpret text in the query value. |
| `minimum_should_match?` | [`MinimumShouldMatch`](MinimumShouldMatch.md) | Minimum number of clauses that must match for a document to be returned. |
| `zero_terms_query?` | [`QueryDslCombinedFieldsZeroTerms`](QueryDslCombinedFieldsZeroTerms.md) | Indicates whether no documents are returned if the analyzer removes all tokens, such as when using a `stop` filter. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
