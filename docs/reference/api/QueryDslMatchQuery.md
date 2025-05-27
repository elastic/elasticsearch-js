## Interface `QueryDslMatchQuery`

| Name | Type | Description |
| - | - | - |
| `analyzer` | string | Analyzer used to convert the text in the query value into tokens. |
| `auto_generate_synonyms_phrase_query` | boolean | If `true`, match phrase queries are automatically created for multi-term synonyms. |
| `cutoff_frequency` | [double](./double.md) | &nbsp; |
| `fuzziness` | [Fuzziness](./Fuzziness.md) | Maximum edit distance allowed for matching. |
| `fuzzy_rewrite` | [MultiTermQueryRewrite](./MultiTermQueryRewrite.md) | Method used to rewrite the query. |
| `fuzzy_transpositions` | boolean | If `true`, edits for fuzzy matching include transpositions of two adjacent characters (for example, `ab` to `ba`). |
| `lenient` | boolean | If `true`, format-based errors, such as providing a text query value for a numeric field, are ignored. |
| `max_expansions` | [integer](./integer.md) | Maximum number of terms to which the query will expand. |
| `minimum_should_match` | [MinimumShouldMatch](./MinimumShouldMatch.md) | Minimum number of clauses that must match for a document to be returned. |
| `operator` | [QueryDslOperator](./QueryDslOperator.md) | Boolean logic used to interpret text in the query value. |
| `prefix_length` | [integer](./integer.md) | Number of beginning characters left unchanged for fuzzy matching. |
| `query` | string | [float](./float.md) | boolean | Text, number, boolean value or date you wish to find in the provided field. |
| `zero_terms_query` | [QueryDslZeroTermsQuery](./QueryDslZeroTermsQuery.md) | Indicates whether no documents are returned if the `analyzer` removes all tokens, such as when using a `stop` filter. |
