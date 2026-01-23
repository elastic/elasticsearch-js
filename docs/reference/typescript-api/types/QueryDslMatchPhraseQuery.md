# QueryDslMatchPhraseQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to convert the text in the query value into tokens. |
| `query` | `string` | Query terms that are analyzed and turned into a phrase query. |
| `slop?` | `integer` | Maximum number of positions allowed between matching tokens. |
| `zero_terms_query?` | [`QueryDslZeroTermsQuery`](QueryDslZeroTermsQuery.md) | Indicates whether no documents are returned if the `analyzer` removes all tokens, such as when using a `stop` filter. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
