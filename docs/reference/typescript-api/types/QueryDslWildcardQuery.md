# QueryDslWildcardQuery

## Interface

### Extends

- [`QueryDslQueryBase`](QueryDslQueryBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `case_insensitive?` | `boolean` | Allows case insensitive matching of the pattern with the indexed field values when set to true. Default is false which means the case sensitivity of matching depends on the underlying field’s mapping. |
| `rewrite?` | [`MultiTermQueryRewrite`](MultiTermQueryRewrite.md) | Method used to rewrite the query. |
| `value?` | `string` | Wildcard pattern for terms you wish to find in the provided field. Required, when wildcard is not set. |
| `wildcard?` | `string` | Wildcard pattern for terms you wish to find in the provided field. Required, when value is not set. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
