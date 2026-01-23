# QueryDslSpanNotQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `dist?` | `integer` | The number of tokens from within the include span that can’t have overlap with the exclude span.
Equivalent to setting both `pre` and `post`. |
| `exclude` | [`QueryDslSpanQuery`](QueryDslSpanQuery.md) | Span query whose matches must not overlap those returned. |
| `include` | [`QueryDslSpanQuery`](QueryDslSpanQuery.md) | Span query whose matches are filtered. |
| `post?` | `integer` | The number of tokens after the include span that can’t have overlap with the exclude span. |
| `pre?` | `integer` | The number of tokens before the include span that can’t have overlap with the exclude span. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
