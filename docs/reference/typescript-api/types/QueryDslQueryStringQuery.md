# QueryDslQueryStringQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `allow_leading_wildcard?` | `boolean` | If `true`, the wildcard characters `*` and `?` are allowed as the first character of the query string. |
| `analyzer?` | `string` | Analyzer used to convert text in the query string into tokens. |
| `analyze_wildcard?` | `boolean` | If `true`, the query attempts to analyze wildcard terms in the query string. |
| `auto_generate_synonyms_phrase_query?` | `boolean` | If `true`, match phrase queries are automatically created for multi-term synonyms. |
| `default_field?` | [`Field`](Field.md) | Default field to search if no field is provided in the query string.
Supports wildcards (`*`).
Defaults to the `index.query.default_field` index setting, which has a default value of `*`. |
| `default_operator?` | [`QueryDslOperator`](QueryDslOperator.md) | Default boolean logic used to interpret text in the query string if no operators are specified. |
| `enable_position_increments?` | `boolean` | If `true`, enable position increments in queries constructed from a `query_string` search. |
| `escape?` | `boolean` | - |
| `fields?` | `Field[]` | Array of fields to search. Supports wildcards (`*`). |
| `fuzziness?` | [`Fuzziness`](Fuzziness.md) | Maximum edit distance allowed for fuzzy matching. |
| `fuzzy_max_expansions?` | `integer` | Maximum number of terms to which the query expands for fuzzy matching. |
| `fuzzy_prefix_length?` | `integer` | Number of beginning characters left unchanged for fuzzy matching. |
| `fuzzy_rewrite?` | [`MultiTermQueryRewrite`](MultiTermQueryRewrite.md) | Method used to rewrite the query. |
| `fuzzy_transpositions?` | `boolean` | If `true`, edits for fuzzy matching include transpositions of two adjacent characters (for example, `ab` to `ba`). |
| `lenient?` | `boolean` | If `true`, format-based errors, such as providing a text value for a numeric field, are ignored. |
| `max_determinized_states?` | `integer` | Maximum number of automaton states required for the query. |
| `minimum_should_match?` | [`MinimumShouldMatch`](MinimumShouldMatch.md) | Minimum number of clauses that must match for a document to be returned. |
| `phrase_slop?` | `double` | Maximum number of positions allowed between matching tokens for phrases. |
| `query` | `string` | Query string you wish to parse and use for search. |
| `quote_analyzer?` | `string` | Analyzer used to convert quoted text in the query string into tokens.
For quoted text, this parameter overrides the analyzer specified in the `analyzer` parameter. |
| `quote_field_suffix?` | `string` | Suffix appended to quoted text in the query string.
You can use this suffix to use a different analysis method for exact matches. |
| `rewrite?` | [`MultiTermQueryRewrite`](MultiTermQueryRewrite.md) | Method used to rewrite the query. |
| `tie_breaker?` | `double` | How to combine the queries generated from the individual search terms in the resulting `dis_max` query. |
| `time_zone?` | [`TimeZone`](TimeZone.md) | Coordinated Universal Time (UTC) offset or IANA time zone used to convert date values in the query string to UTC. |
| `type?` | [`QueryDslTextQueryType`](QueryDslTextQueryType.md) | Determines how the query matches and scores documents. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
