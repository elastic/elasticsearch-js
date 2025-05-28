# `QueryDslCombinedFieldsQuery` [interface-QueryDslCombinedFieldsQuery]

| Name | Type | Description |
| - | - | - |
| `auto_generate_synonyms_phrase_query` | boolean | If true, match phrase queries are automatically created for multi-term synonyms. |
| `fields` | [Field](./Field.md)[] | List of fields to search. Field wildcard patterns are allowed. Only `text` fields are supported, and they must all have the same search `analyzer`. |
| `minimum_should_match` | [MinimumShouldMatch](./MinimumShouldMatch.md) | Minimum number of clauses that must match for a document to be returned. |
| `operator` | [QueryDslCombinedFieldsOperator](./QueryDslCombinedFieldsOperator.md) | Boolean logic used to interpret text in the query value. |
| `query` | string | Text to search for in the provided `fields`. The `combined_fields` query analyzes the provided text before performing a search. |
| `zero_terms_query` | [QueryDslCombinedFieldsZeroTerms](./QueryDslCombinedFieldsZeroTerms.md) | Indicates whether no documents are returned if the analyzer removes all tokens, such as when using a `stop` filter. |
