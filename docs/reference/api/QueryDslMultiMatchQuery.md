# `QueryDslMultiMatchQuery` [interface-QueryDslMultiMatchQuery]

| Name | Type | Description |
| - | - | - |
| `analyzer` | string | Analyzer used to convert the text in the query value into tokens. |
| `auto_generate_synonyms_phrase_query` | boolean | If `true`, match phrase queries are automatically created for multi-term synonyms. |
| `cutoff_frequency` | [double](./double.md) | &nbsp; |
| `fields` | [Fields](./Fields.md) | The fields to be queried. Defaults to the `index.query.default_field` index settings, which in turn defaults to `*`. |
| `fuzziness` | [Fuzziness](./Fuzziness.md) | Maximum edit distance allowed for matching. |
| `fuzzy_rewrite` | [MultiTermQueryRewrite](./MultiTermQueryRewrite.md) | Method used to rewrite the query. |
| `fuzzy_transpositions` | boolean | If `true`, edits for fuzzy matching include transpositions of two adjacent characters (for example, `ab` to `ba`). Can be applied to the term subqueries constructed for all terms but the final term. |
| `lenient` | boolean | If `true`, format-based errors, such as providing a text query value for a numeric field, are ignored. |
| `max_expansions` | [integer](./integer.md) | Maximum number of terms to which the query will expand. |
| `minimum_should_match` | [MinimumShouldMatch](./MinimumShouldMatch.md) | Minimum number of clauses that must match for a document to be returned. |
| `operator` | [QueryDslOperator](./QueryDslOperator.md) | Boolean logic used to interpret text in the query value. |
| `prefix_length` | [integer](./integer.md) | Number of beginning characters left unchanged for fuzzy matching. |
| `query` | string | Text, number, boolean value or date you wish to find in the provided field. |
| `slop` | [integer](./integer.md) | Maximum number of positions allowed between matching tokens. |
| `tie_breaker` | [double](./double.md) | Determines how scores for each per-term blended query and scores across groups are combined. |
| `type` | [QueryDslTextQueryType](./QueryDslTextQueryType.md) | How `the` multi_match query is executed internally. |
| `zero_terms_query` | [QueryDslZeroTermsQuery](./QueryDslZeroTermsQuery.md) | Indicates whether no documents are returned if the `analyzer` removes all tokens, such as when using a `stop` filter. |
