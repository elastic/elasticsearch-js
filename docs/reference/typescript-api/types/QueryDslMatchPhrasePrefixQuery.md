# QueryDslMatchPhrasePrefixQuery

## Interface

### Extends

- [`QueryDslQueryBase`](QueryDslQueryBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analyzer?` | `string` | Analyzer used to convert text in the query value into tokens. |
| `max_expansions?` | [`integer`](integer.md) | Maximum number of terms to which the last provided term of the query value will expand. |
| `query` | `string` | Text you wish to find in the provided field. |
| `slop?` | [`integer`](integer.md) | Maximum number of positions allowed between matching tokens. |
| `zero_terms_query?` | [`QueryDslZeroTermsQuery`](QueryDslZeroTermsQuery.md) | Indicates whether no documents are returned if the analyzer removes all tokens, such as when using a `stop` filter. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
